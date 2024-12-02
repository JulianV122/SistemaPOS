import api from '../config/api';

export interface Client {
    id: number;
    name: string;
}

export interface ClientCreate {
    name: string;
}

export interface ClientWithSales extends Client {
    sales: any[]; // Puedes definir un tipo más específico para las ventas si lo necesitas
}

export const clientService = {
    async getAll(skip: number = 0, limit: number = 100) {
        const response = await api.get(`/clients?skip=${skip}&limit=${limit}`);
        return response.data;
    },

    async getById(id: number) {
        const response = await api.get(`/clients/${id}`);
        return response.data;
    },

    async create(data: ClientCreate) {
        const response = await api.post('/clients', data);
        return response.data;
    },

    async update(id: number, data: Partial<ClientCreate>) {
        const response = await api.put(`/clients/${id}`, data);
        return response.data;
    },

    async delete(id: number) {
        const response = await api.delete(`/clients/${id}`);
        return response.data;
    },

    async getClientSales(id: number) {
        const response = await api.get(`/clients/${id}/sales`);
        return response.data;
    }
};