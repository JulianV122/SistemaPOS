import api from '../config/api';

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterData extends LoginCredentials {
    name: string;
    lastname: string;
    telephone: string;
}

export const authService = {
    async login(credentials: LoginCredentials) {
        const formData = new FormData();
        formData.append('username', credentials.email);
        formData.append('password', credentials.password);
        
        const response = await api.post('/auth/login', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }        
        });
        if (response.data.access_token) {
            localStorage.setItem('token', response.data.access_token);
        }
        return response.data;
    },

    async register(data: RegisterData) {
        const response = await api.post('/employees', data);
        return response.data;
    },

    async getCurrentUser() {
        const response = await api.get('/employees/me');
        return response.data;
    },

    async logout() {
        localStorage.removeItem('token');
    }
};