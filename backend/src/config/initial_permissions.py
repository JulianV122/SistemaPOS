from sqlmodel import Session, select
from src.models import Role, Permission, PermissionHasRole

def create_initial_permissions(session: Session) -> None:
    # Crear permisos básicos
    permissions = [
        Permission(name="GESTIONAR_EMPLEADOS", description="Gestionar empleados del sistema"),
        Permission(name="GESTIONAR_INVENTARIO", description="Gestionar inventario"),
        Permission(name="GESTIONAR_VENTAS", description="Gestionar ventas"),
        Permission(name="VER_REPORTES", description="Ver reportes financieros"),
    ]

    # Verificar si ya existen los permisos
    existing_permissions = session.query(Permission).all()
    existing_permission_names = [p.name for p in existing_permissions]

    # Filtrar solo los permisos que no existen
    permissions = [
        p for p in permissions 
        if p.name not in existing_permission_names
    ]

    if not permissions:
        return
    
    for permission in permissions:
        session.add(permission)
    
    session.commit()

def create_initial_roles(session: Session) -> None:
    # Verificar si los roles ya existen
    existing_roles = session.query(Role).all()
    existing_role_names = [r.name for r in existing_roles]

    # Crear roles básicos si no existen
    admin_role = session.exec(select(Role).where(Role.name == "ADMIN")).first()

    # Obtener los permisos ya asignados al rol admin
    existing_permissions = session.query(PermissionHasRole).filter(
        PermissionHasRole.role_id == admin_role.id
    ).all()
    existing_permission_ids = [p.permission_id for p in existing_permissions]

    # Asignar todos los permisos al rol admin
    permissions = session.query(Permission).all()
    for permission in permissions:
        if permission.id not in existing_permission_ids:
            permission_role = PermissionHasRole(
                permission_id=permission.id,
                role_id=admin_role.id
            )
            session.add(permission_role)
    session.commit()

    if "USER" not in existing_role_names:
        user_role = Role(name="USER", description="Usuario del sistema")
        session.add(user_role)
        session.commit()

        permissions = session.query(Permission).filter(Permission.name.in_(["GESTIONAR_VENTAS"])).all()
        for permission in permissions:
            permission_role = PermissionHasRole(
                permission_id=permission.id,
                role_id=user_role.id
            )
            session.add(permission_role)
        session.commit()