from typing import Optional, List
from sqlmodel import Session, select
from src.models.product import Product, ProductCreate, ProductUpdate
from .base import CRUDBase

class CRUDProduct(CRUDBase[Product, ProductCreate, ProductUpdate]):
    def get_by_enterprise(
        self, session: Session, *, enterprise_id: int, skip: int = 0, limit: int = 100
    ) -> List[Product]:
        return session.exec(
            select(Product)
            .where(Product.enterprise_id == enterprise_id)
            .offset(skip)
            .limit(limit)
        ).all()

    def get_by_category(
        self, session: Session, *, category_id: int, skip: int = 0, limit: int = 100
    ) -> List[Product]:
        return session.exec(
            select(Product)
            .where(Product.category_id == category_id)
            .offset(skip)
            .limit(limit)
        ).all()

    def get_by_bar_code(self, session: Session, *, bar_code: str) -> Optional[Product]:
        return session.exec(select(Product).where(Product.bar_code == bar_code)).first()

    def update_stock(self, session: Session, *, product_id: int, quantity: int) -> Product:
        product = self.get(session=session, id=product_id)
        if product:
            product.stock += quantity
            session.add(product)
            session.commit()
            session.refresh(product)
        return product

product = CRUDProduct(Product)