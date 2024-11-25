from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import select
from src.crud import supplier as crud
from src.deps import SessionDep, get_current_active_employee
from src.models.supplier import Supplier, SupplierCreate, SupplierRead
from src.models.product import ProductRead
from src.models.employee import Employee
from src.models.utils import Message

router = APIRouter()

@router.get("/", response_model=list[SupplierRead])
def read_suppliers(
    session: SessionDep,
    skip: int = 0,
    limit: int = 100,
    current_employee: Employee = Depends(get_current_active_employee)
) -> Any:
    """
    Retrieve suppliers.
    """
    suppliers = crud.get_multi(session=session, skip=skip, limit=limit)
    return suppliers

@router.post("/", response_model=SupplierRead)
def create_supplier(
    *,
    session: SessionDep,
    supplier_in: SupplierCreate,
    current_employee: Employee = Depends(get_current_active_employee)
) -> Any:
    """
    Create new supplier.
    """
    # Verificar si ya existe un proveedor con el mismo NIT
    supplier = crud.get_by_nit(session=session, nit=supplier_in.NIT)
    if supplier:
        raise HTTPException(
            status_code=400,
            detail="A supplier with this NIT already exists.",
        )
    
    # Verificar si ya existe un proveedor con el mismo email
    supplier = crud.get_by_email(session=session, email=supplier_in.email)
    if supplier:
        raise HTTPException(
            status_code=400,
            detail="A supplier with this email already exists.",
        )
    
    supplier = crud.create(session=session, obj_in=supplier_in)
    return supplier

@router.get("/{supplier_id}", response_model=SupplierRead)
def read_supplier(
    *,
    session: SessionDep,
    supplier_id: int,
    current_employee: Employee = Depends(get_current_active_employee)
) -> Any:
    """
    Get supplier by ID.
    """
    supplier = crud.get(session=session, id=supplier_id)
    if not supplier:
        raise HTTPException(status_code=404, detail="Supplier not found")
    return supplier

@router.get("/{supplier_id}/products", response_model=List[ProductRead])
def read_supplier_products(
    *,
    session: SessionDep,
    supplier_id: int,
    current_employee: Employee = Depends(get_current_active_employee)
) -> Any:
    """
    Get products for a supplier.
    """
    products = crud.get_products(session=session, supplier_id=supplier_id)
    return products

@router.delete("/{supplier_id}", response_model=Message)
def delete_supplier(
    *,
    session: SessionDep,
    supplier_id: int,
    current_employee: Employee = Depends(get_current_active_employee)
) -> Any:
    """
    Delete supplier.
    """
    supplier = crud.get(session=session, id=supplier_id)
    if not supplier:
        raise HTTPException(status_code=404, detail="Supplier not found")
    
    # Verificar si el proveedor tiene productos
    if supplier.products:
        raise HTTPException(
            status_code=400,
            detail="Cannot delete supplier with associated products"
        )
    
    crud.remove(session=session, id=supplier_id)
    return Message(message="Supplier deleted successfully")
