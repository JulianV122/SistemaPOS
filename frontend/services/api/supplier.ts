import api from '../config/api';

export interface Supplier {
    id: number;
    name: string;
    NIT: string;
    email: string;
    phone: string;
    address: string;
}

export interface SupplierCreate {
    name: string;
    NIT: string;
    email: string;
    phone: string;
    address: string;
}

export const supplierService = {
    async getAll(skip: number = 0, limit: number = 100) {
        const response = await api.get(`/suppliers?skip=${skip}&limit=${limit}`);
        return response.data;
    },

    async getById(id: number) {
        const response = await api.get(`/suppliers/${id}`);
        return response.data;
    },

    async create(data: SupplierCreate) {
        const response = await api.post('/suppliers', data);
        return response.data;
    },

    async update(id: number, data: Partial<SupplierCreate>) {
        const response = await api.put(`/suppliers/${id}`, data);
        return response.data;
    },

    async delete(id: number) {
        const response = await api.delete(`/suppliers/${id}`);
        return response.data;
    }
};