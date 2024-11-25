from typing import Any
from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import select
from src.crud import employee as crud
from src.deps import SessionDep, get_current_active_superuser, get_current_active_employee
from src.models.employee import Employee, EmployeeCreate, EmployeeRead, EmployeeUpdate
from src.models.utils import Message

router = APIRouter()

@router.get("/", response_model=list[EmployeeRead])
def read_employees(
    session: SessionDep,
    skip: int = 0,
    limit: int = 100,
    current_employee: Employee = Depends(get_current_active_employee)
) -> Any:
    """
    Retrieve employees.
    """
    # Si es superusuario, puede ver todos los empleados
    if current_employee.role.name == "ADMIN":
        employees = crud.get_multi(session=session, skip=skip, limit=limit)
    else:
        # Si no es superusuario, solo ve los empleados de su empresa
        employees = crud.get_by_enterprise(
            session=session, 
            enterprise_id=current_employee.enterprise_id,
            skip=skip, 
            limit=limit
        )
    return employees

@router.post("/", response_model=EmployeeRead)
def create_employee(
    *,
    session: SessionDep,
    employee_in: EmployeeCreate,
    current_employee: Employee = Depends(get_current_active_employee)
) -> Any:
    """
    Create new employee.
    """
    # Verificar si el email ya existe
    employee = crud.get_by_email(session=session, email=employee_in.email)
    if employee:
        raise HTTPException(
            status_code=400,
            detail="An employee with this email already exists.",
        )
    
    # Solo un admin puede crear empleados en otras empresas
    if (current_employee.role.name != "ADMIN" and 
        employee_in.enterprise_id != current_employee.enterprise_id):
        raise HTTPException(
            status_code=403,
            detail="Not enough permissions to create employee in another enterprise",
        )
    
    employee = crud.create(session=session, obj_in=employee_in)
    return employee

@router.get("/me", response_model=EmployeeRead)
def read_employee_me(
    current_employee: Employee = Depends(get_current_active_employee)
) -> Any:
    """
    Get current employee.
    """
    return current_employee

@router.get("/{employee_id}", response_model=EmployeeRead)
def read_employee(
    *,
    session: SessionDep,
    employee_id: int,
    current_employee: Employee = Depends(get_current_active_employee)
) -> Any:
    """
    Get employee by ID.
    """
    employee = crud.get(session=session, id=employee_id)
    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")
    return employee
