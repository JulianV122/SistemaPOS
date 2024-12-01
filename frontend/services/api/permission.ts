import api from '../config/api';

export interface Permission {
    id: number;
    name: string;
    description: string;
}

export interface PermissionCreate {
    name: string;
    description: string;
}

export const permissionService = {
    async getAll(skip: number = 0, limit: number = 100) {
        const response = await api.get(`/permissions?skip=${skip}&limit=${limit}`);
        return response.data;
    },

    async getById(id: number) {
        const response = await api.get(`/permissions/${id}`);
        return response.data;
    },

    async create(data: PermissionCreate) {
        const response = await api.post('/permissions', data);
        return response.data;
    },

    async update(id: number, data: Partial<PermissionCreate>) {
        const response = await api.put(`/permissions/${id}`, data);
        return response.data;
    },

    async delete(id: number) {
        const response = await api.delete(`/permissions/${id}`);
        return response.data;
    }
};
