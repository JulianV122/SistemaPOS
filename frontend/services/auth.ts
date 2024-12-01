import { authService } from './api';
import { useUserSession } from '@/store/userSession';

// Reemplaza las funciones existentes de Firebase
export async function loginUser(email: string, password: string) {
    try {
        return await authService.login({ email, password });
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        throw error;
    }
}

export async function registerUser(email: string, password: string, name: string, lastname: string, telephone: string) {
    try {
        return await authService.register({
            email,
            password,
            name,
            lastname,
            telephone
        });
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        throw error;
    }
}

export async function getCurrentUser() {
    try {
        const user = await authService.getCurrentUser();
        /**
         * 
        
        const user = {
            "id": 1,
            "name": "Admin",
            "lastname": "System",
            "email": "admin@admin.com",
            "code": "ADMIN001",
            "telephone": "0000000000",
            "enterprise_id": 1,
            "is_active": true,
            "role": {
                "id": 1,
                "name": "ADMIN",
                "description": "Administrador del sistema",
                "permissions": [
                    {
                        "id": 1,
                        "name": "GESTIONAR_EMPLEADOS",
                        "description": "Gestionar empleados del sistema"
                    },
                    {
                        "id": 2,
                        "name": "GESTIONAR_INVENTARIO",
                        "description": "Gestionar inventario"
                    },
                    {
                        "id": 3,
                        "name": "GESTIONAR_VENTAS",
                        "description": "Gestionar ventas"
                    },
                    {
                        "id": 4,
                        "name": "VER_REPORTES",
                        "description": "Ver reportes financieros"
                    }
                ]
            },
            "enterprise": {
                "id": 1,
                "name": "POSCO",
                "NIT": "123456789-10"
            }
        }
             */
        
        if (user) {
            const { setUser } = useUserSession.getState();
            setUser({
                id: user.id.toString(),
                email: user.email,
                name: user.name,
                lastname: user.lastname,
                telephone: user.telephone,
                role: user.role.name,
                roleDescription: user.role.description,
                permissions: user.role.permissions.map((p: { name: string }) => p.name),
                enterprise: user.enterprise.name,
                enterprise_nit: user.enterprise.NIT,
                enterprise_id: user.enterprise.id.toString()
            });
            return user;
        }
        return null;
    } catch (error) {
        console.error('Error al obtener usuario actual:', error);
        return null;
    }
}

export async function logoutUser() {
    try {
        await authService.logout();
        return true;
    } catch (error) {
        console.error('Error al cerrar sesión:', error);
        throw error;
    }
}