import api from '../config/api';

export interface Product {
    id: number;
    name: string;
    description: string;
    bar_code: string;
    supplier_price: number;
    public_price: number;
    stock: number;
    minimal_safe_stock: number;
    status: boolean;
    thumbnail: string;
    discount: number;
    enterprise_id: number;
    category_id: number;
    supplier_id: number;
}

export interface ProductCreate {
    name: string;
    description: string;
    bar_code: string;
    supplier_price: number;
    public_price: number;
    stock: number;
    minimal_safe_stock: number;
    status: string;
    thumbnail: string;
    discount: number;
    enterprise_id: number;
    category_id: number;
    supplier_id: number;
}

export interface ProductUpdate {
    name?: string;
    description?: string;
    bar_code?: string;
    supplier_price?: number;
    public_price?: number;
    stock?: number;
    minimal_safe_stock?: number;
    status?: boolean;
    thumbnail?: string;
    discount?: number;
    category_id?: number;
    supplier_id?: number;
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

    async getByCategory(categoryId: number, skip: number = 0, limit: number = 100) {
        const response = await api.get(`/products/category/${categoryId}?skip=${skip}&limit=${limit}`);
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
