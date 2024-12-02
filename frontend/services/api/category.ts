import api from '../config/api';

export interface Category {
    id: number;
    name: string;
    description: string;
}

export interface CategoryCreate {
    name: string;
    description: string;
}

export const categoryService = {
    async getAll(skip: number = 0, limit: number = 100) {
        const response = await api.get(`/categories?skip=${skip}&limit=${limit}`);
        return response.data;
    },

    async getById(id: number) {
        const response = await api.get(`/categories/${id}`);
        return response.data;
    },

    async create(data: CategoryCreate) {
        const response = await api.post('/categories', data);
        return response.data;
    },

    async update(id: number, data: Partial<CategoryCreate>) {
        const response = await api.put(`/categories/${id}`, data);
        return response.data;
    },

    async delete(id: number) {
        const response = await api.delete(`/categories/${id}`);
        return response.data;
    }
};
