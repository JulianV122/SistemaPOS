from sqlmodel import SQLModel, Field, Relationship
from typing import Optional, List
from pydantic import EmailStr

class EmployeeBase(SQLModel):
    name: str = Field(max_length=255)
    email: EmailStr = Field(max_length=100)
    code: str = Field(max_length=45)
    lastname: str = Field(max_length=100)

class Employee(EmployeeBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    enterprise_id: Optional[int] = Field(default=None, foreign_key="enterprise.id")
    role_id: Optional[int] = Field(default=None, foreign_key="role.id")
    is_active: bool = Field(default=True)
    hashed_password: str = Field(max_length=255)
    
    enterprise: Optional["Enterprise"] = Relationship(back_populates="employees")
    role: Optional["Role"] = Relationship(back_populates="employees")

class EmployeeCreate(EmployeeBase):
    password: str
    enterprise_id: int
    role_id: int

class EmployeeRead(EmployeeBase):
    id: int
    enterprise_id: int
    role_id: int
    is_active: bool

class EmployeeUpdate(SQLModel):
    name: Optional[str] = None
    email: Optional[EmailStr] = None
    code: Optional[str] = None
    lastname: Optional[str] = None
    password: Optional[str] = None
    is_active: Optional[bool] = None
    role_id: Optional[int] = None