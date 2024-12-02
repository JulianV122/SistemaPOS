import api from '../config/api';

export interface Sale {
    id: number;
    date: string;
    total: number;
    client_id?: number;
    employee_id: number;
}

export interface SaleCreate {
    client_id?: number;
    products: {
        product_id: number;
        quantity: number;
        price: number;
    }[];
}

export const saleService = {
    async getAll(skip: number = 0, limit: number = 100) {
        const response = await api.get(`/sales?skip=${skip}&limit=${limit}`);
        return response.data;
    },

    async create(data: SaleCreate) {
        const response = await api.post('/sales', data);
        return response.data;
    },

    async getByDateRange(startDate: string, endDate: string) {
        const response = await api.get(`/sales/by-date-range?start_date=${startDate}&end_date=${endDate}`);
        return response.data;
    }
};
