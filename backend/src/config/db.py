from sqlmodel import Session, create_engine, select, SQLModel

from src.crud import employee as employee_crud
from src.crud import enterprise as enterprise_crud
from src.crud import role as role_crud
from src.config.settings import settings

# Importar todos los modelos
from src.models import *

engine = create_engine(settings.MYSQL_URI)

def init_db(session: Session) -> None:
    SQLModel.metadata.create_all(engine)
    # Crear empresa inicial si no existe
    enterprise = session.exec(
        select(Enterprise).where(Enterprise.NIT == settings.FIRST_ENTERPRISE_NIT)
    ).first()
    if not enterprise:
        enterprise_in = EnterpriseCreate(
            name=settings.FIRST_ENTERPRISE_NAME,
            NIT=settings.FIRST_ENTERPRISE_NIT,
            email=settings.FIRST_ENTERPRISE_EMAIL,
            phone_number=settings.FIRST_ENTERPRISE_PHONE,
            currency="COP"
        )
        enterprise = enterprise_crud.create(session=session, obj_in=enterprise_in)

    # Crear rol admin si no existe
    admin_role = session.exec(select(Role).where(Role.name == "ADMIN")).first()
    if not admin_role:
        admin_role = role_crud.create(
            session=session,
            obj_in=RoleCreate(
                name="ADMIN",
                description="Administrador del sistema"
            )
        )

    # Crear empleado inicial si no existe
    employee = session.exec(
        select(Employee).where(Employee.email == settings.FIRST_SUPERUSER)
    ).first()
    if not employee:
        employee_in = EmployeeCreate(
            email=settings.FIRST_SUPERUSER,
            password=settings.FIRST_SUPERUSER_PASSWORD,
            name="Admin",
            lastname="System",
            code="ADMIN001",
            telephone="0000000000",
            enterprise_id=enterprise.id,
            role_id=admin_role.id
        )
        employee = employee_crud.create(session=session, obj_in=employee_in)
