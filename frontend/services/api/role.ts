import api from '../config/api';

export interface Role {
    id: number;
    name: string;
    description: string;
    permissions: number[];  // IDs de los permisos asociados
}

export interface RoleCreate {
    name: string;
    description: string;
    permissions: number[];
}

export const roleService = {
    async getAll(skip: number = 0, limit: number = 100) {
        const response = await api.get(`/roles?skip=${skip}&limit=${limit}`);
        return response.data;
    },

    async getById(id: number) {
        const response = await api.get(`/roles/${id}`);
        return response.data;
    },

    async create(data: RoleCreate) {
        const response = await api.post('/roles', data);
        return response.data;
    },

    async update(id: number, data: Partial<RoleCreate>) {
        const response = await api.put(`/roles/${id}`, data);
        return response.data;
    },

    async delete(id: number) {
        const response = await api.delete(`/roles/${id}`);
        return response.data;
    }
};
