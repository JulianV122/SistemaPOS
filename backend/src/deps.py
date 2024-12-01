from typing import Annotated, Generator
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
import jwt
from jwt.exceptions import InvalidTokenError
from pydantic import ValidationError
from sqlmodel import Session

from src.config.security import ALGORITHM
from src.config.settings import settings
from src.config.db import engine
from src.models.employee import Employee
from src.crud import employee as employee_crud
from src.models.utils import TokenPayload

reusable_oauth2 = OAuth2PasswordBearer(
    tokenUrl=f"{settings.API_V1_STR}/auth/login"
)

def get_session() -> Generator:
    with Session(engine) as session:
        yield session

SessionDep = Annotated[Session, Depends(get_session)]
CurrentUser = Annotated[Employee, Depends(reusable_oauth2)]

def get_current_employee(
    session: SessionDep,
    token: str = Depends(reusable_oauth2)
) -> Employee:
    try:
        payload = jwt.decode(
            token, settings.SECRET_KEY, algorithms=[ALGORITHM]
        )
        token_data = TokenPayload(**payload)
    except (InvalidTokenError, ValidationError):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Could not validate credentials",
        )
    
    employee = employee_crud.get(session=session, id=token_data.sub)
    if not employee:
        raise HTTPException(
            status_code=404, 
            detail="Employee not found"
        )
    return employee

def get_current_active_employee(
    current_employee: Employee = Depends(get_current_employee),
) -> Employee:
    if not current_employee.is_active:
        raise HTTPException(
            status_code=400, 
            detail="Inactive employee"
        )
    return current_employee

def get_current_active_superuser(
    current_employee: Employee = Depends(get_current_active_employee),
) -> Employee:
    if current_employee.role.name != "ADMIN":
        raise HTTPException(
            status_code=400, 
            detail="The employee doesn't have enough privileges"
        )
    return current_employee