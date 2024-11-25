from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import select
from src.crud import product as crud
from src.deps import SessionDep, get_current_active_employee
from src.models.product import Product, ProductCreate, ProductRead, ProductUpdate
from src.models.employee import Employee
from src.models.utils import Message

router = APIRouter()

@router.get("/", response_model=list[ProductRead])
def read_products(
    session: SessionDep,
    skip: int = 0,
    limit: int = 100,
    current_employee: Employee = Depends(get_current_active_employee)
) -> Any:
    """
    Retrieve products.
    """
    products = crud.get_by_enterprise(
        session=session,
        enterprise_id=current_employee.enterprise_id,
        skip=skip,
        limit=limit
    )
    return products

@router.post("/", response_model=ProductRead)
def create_product(
    *,
    session: SessionDep,
    product_in: ProductCreate,
    current_employee: Employee = Depends(get_current_active_employee)
) -> Any:
    """
    Create new product.
    """
    # Verificar si el producto pertenece a la empresa del empleado
    if product_in.enterprise_id != current_employee.enterprise_id:
        raise HTTPException(
            status_code=403,
            detail="Cannot create product for another enterprise"
        )
    
    # Verificar si ya existe un producto con el mismo código de barras
    if product_in.bar_code:
        product = crud.get_by_bar_code(session=session, bar_code=product_in.bar_code)
        if product:
            raise HTTPException(
                status_code=400,
                detail="A product with this bar code already exists.",
            )
    
    product = crud.create(session=session, obj_in=product_in)
    return product

@router.get("/{product_id}", response_model=ProductRead)
def read_product(
    *,
    session: SessionDep,
    product_id: int,
    current_employee: Employee = Depends(get_current_active_employee)
) -> Any:
    """
    Get product by ID.
    """
    product = crud.get(session=session, id=product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    # Verificar si el producto pertenece a la empresa del empleado
    if product.enterprise_id != current_employee.enterprise_id:
        raise HTTPException(status_code=403, detail="Not enough permissions")
    
    return product

@router.put("/{product_id}", response_model=ProductRead)
def update_product(
    *,
    session: SessionDep,
    product_id: int,
    product_in: ProductUpdate,
    current_employee: Employee = Depends(get_current_active_employee)
) -> Any:
    """
    Update product.
    """
    product = crud.get(session=session, id=product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    # Verificar si el producto pertenece a la empresa del empleado
    if product.enterprise_id != current_employee.enterprise_id:
        raise HTTPException(status_code=403, detail="Not enough permissions")
    
    product = crud.update(
        session=session,
        db_obj=product,
        obj_in=product_in
    )
    return product

@router.delete("/{product_id}", response_model=Message)
def delete_product(
    *,
    session: SessionDep,
    product_id: int,
    current_employee: Employee = Depends(get_current_active_employee)
) -> Any:
    """
    Delete product.
    """
    product = crud.get(session=session, id=product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    # Verificar si el producto pertenece a la empresa del empleado
    if product.enterprise_id != current_employee.enterprise_id:
        raise HTTPException(status_code=403, detail="Not enough permissions")
    
    crud.remove(session=session, id=product_id)
    return Message(message="Product deleted successfully")
