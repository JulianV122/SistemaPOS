import api from '../config/api';

export interface Employee {
    id: number;
    name: string;
    email: string;
    code: string;
    lastname: string;
    telephone: string;
    enterprise_id: number;
    role_id: number;
    is_active: boolean;
}

export interface EmployeeCreate {
    name: string;
    email: string;
    code: string;
    lastname: string;
    telephone: string;
    password: string;
    enterprise_id: number;
    role_id: number;
}

export interface EmployeeUpdate {
    name?: string;
    email?: string;
    code?: string;
    lastname?: string;
    telephone?: string;
    password?: string;
    is_active?: boolean;
    role_id?: number;
}

export const employeeService = {
    async getAll(skip: number = 0, limit: number = 100) {
        const response = await api.get(`/employees?skip=${skip}&limit=${limit}`);
        return response.data;
    },

    async getById(id: number) {
        const response = await api.get(`/employees/${id}`);
        return response.data;
    },

    async create(data: EmployeeCreate) {
        const response = await api.post('/employees', data);
        return response.data;
    },

    async update(id: number, data: EmployeeUpdate) {
        const response = await api.put(`/employees/${id}`, data);
        return response.data;
    },

    async delete(id: number) {
        const response = await api.delete(`/employees/${id}`);
        return response.data;
    },

    async getMe() {
        const response = await api.get('/employees/me');
        return response.data;
    }
};