from sqlmodel import SQLModel, Field, Relationship
from typing import Optional, List

class CategoryBase(SQLModel):
    name: str = Field(max_length=100)
    description: str = Field(max_length=255)

class Category(CategoryBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    products: List["Product"] = Relationship(back_populates="category")

class CategoryCreate(CategoryBase):
    pass

class CategoryRead(CategoryBase):
    id: int

class CategoryUpdate(CategoryBase):
    pass

