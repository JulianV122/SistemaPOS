import api from '../config/api';

export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    bar_code?: string;
    enterprise_id: number;
    category_id?: number;
}

export interface ProductCreate {
    name: string;
    description: string;
    price: number;
    stock: number;
    bar_code?: string;
    enterprise_id: number;
    category_id?: number;
}

export interface ProductUpdate {
    name?: string;
    description?: string;
    price?: number;
    stock?: number;
    bar_code?: string;
    category_id?: number;
}

export const productService = {
    async getAll(skip: number = 0, limit: number = 100) {
        const response = await api.get(`/products?skip=${skip}&limit=${limit}`);
        return response.data;
    },

    async getById(id: number) {
        const response = await api.get(`/products/${id}`);
        return response.data;
    },

    async create(data: ProductCreate) {
        const response = await api.post('/products', data);
        return response.data;
    },

    async update(id: number, data: ProductUpdate) {
        const response = await api.put(`/products/${id}`, data);
        return response.data;
    },

    async delete(id: number) {
        const response = await api.delete(`/products/${id}`);
        return response.data;
    }
};
