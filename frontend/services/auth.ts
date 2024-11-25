import { authService } from './api';

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
        return await authService.getCurrentUser();
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