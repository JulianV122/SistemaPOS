from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import select
from src.crud import category as crud
from src.deps import SessionDep, get_current_active_employee
from src.models.category import Category, CategoryCreate, CategoryRead
from src.models.product import ProductRead
from src.models.employee import Employee
from src.models.utils import Message

router = APIRouter()

@router.get("/", response_model=list[CategoryRead])
def read_categories(
    session: SessionDep,
    skip: int = 0,
    limit: int = 100,
    current_employee: Employee = Depends(get_current_active_employee)
) -> Any:
    """
    Retrieve categories.
    """
    categories = crud.get_multi(session=session, skip=skip, limit=limit)
    return categories

@router.post("/", response_model=CategoryRead)
def create_category(
    *,
    session: SessionDep,
    category_in: CategoryCreate,
    current_employee: Employee = Depends(get_current_active_employee)
) -> Any:
    """
    Create new category.
    """
    # Verificar si ya existe una categoría con el mismo nombre
    category = crud.get_by_name(session=session, name=category_in.name)
    if category:
        raise HTTPException(
            status_code=400,
            detail="A category with this name already exists.",
        )
    
    category = crud.category.create(session=session, obj_in=category_in)
    return category

@router.get("/{category_id}", response_model=CategoryRead)
def read_category(
    *,
    session: SessionDep,
    category_id: int,
    current_employee: Employee = Depends(get_current_active_employee)
) -> Any:
    """
    Get category by ID.
    """
    category = crud.get(session=session, id=category_id)
    if not category:
        raise HTTPException(status_code=404, detail="Category not found")
    return category

@router.get("/{category_id}/products", response_model=List[ProductRead])
def read_category_products(
    *,
    session: SessionDep,
    category_id: int,
    current_employee: Employee = Depends(get_current_active_employee)
) -> Any:
    """
    Get products for a category.
    """
    products = crud.get_products(session=session, category_id=category_id)
    return products

@router.delete("/{category_id}", response_model=Message)
def delete_category(
    *,
    session: SessionDep,
    category_id: int,
    current_employee: Employee = Depends(get_current_active_employee)
) -> Any:
    """
    Delete category.
    """
    category = crud.get(session=session, id=category_id)
    if not category:
        raise HTTPException(status_code=404, detail="Category not found")
    
    # Verificar si la categoría tiene productos
    if category.products:
        raise HTTPException(
            status_code=400,
            detail="Cannot delete category with associated products"
        )
    
    crud.remove(session=session, id=category_id)
    return Message(message="Category deleted successfully")

