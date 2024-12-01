import api from '../config/api';

export interface Invoice {
    id: number;
    number: string;
    date: string;
    total: number;
    client_id?: number;
}

export interface InvoiceCreate {
    number: string;
    client_id?: number;
    sales: number[];  // IDs de las ventas a incluir en la factura
}

export const invoiceService = {
    async getAll(skip: number = 0, limit: number = 100) {
        const response = await api.get(`/invoices?skip=${skip}&limit=${limit}`);
        return response.data;
    },

    async getById(id: number) {
        const response = await api.get(`/invoices/${id}`);
        return response.data;
    },

    async create(data: InvoiceCreate) {
        const response = await api.post('/invoices', data);
        return response.data;
    },

    async delete(id: number) {
        const response = await api.delete(`/invoices/${id}`);
        return response.data;
    },

    async getSales(id: number) {
        const response = await api.get(`/invoices/${id}/sales`);
        return response.data;
    }
};
