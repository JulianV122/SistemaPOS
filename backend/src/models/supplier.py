from sqlmodel import SQLModel, Field, Relationship
from typing import Optional, List
from pydantic import EmailStr

class SupplierBase(SQLModel):
    email: EmailStr = Field(max_length=255)
    phone_number: str = Field(max_length=45)
    NIT: str = Field(max_length=45)

class Supplier(SupplierBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    products: List["Product"] = Relationship(back_populates="supplier")

class SupplierCreate(SupplierBase):
    pass

class SupplierRead(SupplierBase):
    id: int

class SupplierUpdate(SupplierBase):
    pass