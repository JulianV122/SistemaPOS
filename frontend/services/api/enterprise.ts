import api from '../config/api';

export interface Enterprise {
    id: number;
    name: string;
    NIT: string;
    address: string;
    phone: string;
    email: string;
}

export interface EnterpriseCreate {
    name: string;
    NIT: string;
    address: string;
    phone: string;
    email: string;
}

export const enterpriseService = {
    async getAll(skip: number = 0, limit: number = 100) {
        const response = await api.get(`/enterprises?skip=${skip}&limit=${limit}`);
        return response.data;
    },

    async getById(id: number) {
        const response = await api.get(`/enterprises/${id}`);
        return response.data;
    },

    async create(data: EnterpriseCreate) {
        const response = await api.post('/enterprises', data);
        return response.data;
    },

    async update(id: number, data: Partial<EnterpriseCreate>) {
        const response = await api.put(`/enterprises/${id}`, data);
        return response.data;
    },

    async delete(id: number) {
        const response = await api.delete(`/enterprises/${id}`);
        return response.data;
    }
};
