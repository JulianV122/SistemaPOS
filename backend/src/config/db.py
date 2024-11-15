from sqlmodel import Session, create_engine, select, SQLModel

from src.crud import user as user_crud
from src.config.settings import settings

# Importar todos los modelos para crear las tablas
from src.models.user import User, UserCreate
from src.models.item import Item

engine = create_engine(settings.MYSQL_URI)


def init_db(session: Session) -> None:
    SQLModel.metadata.create_all(engine)

    user = session.exec(select(User).where(User.email == settings.FIRST_SUPERUSER)).first()
    if not user:
        user_in = UserCreate(
            email=settings.FIRST_SUPERUSER,
            password=settings.FIRST_SUPERUSER_PASSWORD,
            is_superuser=True,
        )
        user = user_crud.create_user(session=session, user_create=user_in)