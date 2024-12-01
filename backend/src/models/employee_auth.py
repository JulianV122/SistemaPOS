from typing import List, Optional
from sqlmodel import SQLModel
from pydantic import EmailStr

class PermissionInfo(SQLModel):
    id: int
    name: str
    description: str

class RoleInfo(SQLModel):
    id: int
    name: str
    description: str
    permissions: List[PermissionInfo]

class EmployeeAuth(SQLModel):
    id: int
    name: str
    lastname: str
    email: EmailStr
    code: str
    telephone: str
    enterprise_id: int
    is_active: bool
    role: RoleInfo

class EmployeeAuthResponse(SQLModel):
    access_token: str
    token_type: str = "bearer"
    employee: EmployeeAuth