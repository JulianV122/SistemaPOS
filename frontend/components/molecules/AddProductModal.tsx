'use client'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { services } from '@/services/api';
import { useUserSession } from '@/store/userSession';
import { showAlert } from '@/components/atoms/Alert';
import { useEffect, useState } from 'react';
import { Supplier } from '@/services/api/supplier';
import { Category } from '@/services/api/category';
import { Loader } from '@/components';

const productSchema = z.object({
    name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
    description: z.string().min(5, "La descripción debe tener al menos 5 caracteres"),
    bar_code: z.string().min(1, "El código de barras es requerido"),
    supplier_price: z.string().min(1, "El precio de proveedor es requerido"),
    public_price: z.string().min(1, "El precio público es requerido"),
    stock: z.string().min(1, "El stock es requerido"),
    minimal_safe_stock: z.string().min(1, "El stock mínimo es requerido"),
    supplier_id: z.string().min(1, "El proveedor es requerido"),
    category_id: z.string().min(1, "La categoría es requerida"),
    status: z.boolean(),
    thumbnail: z.string(),
    discount: z.string()
});

type ProductFormData = z.infer<typeof productSchema>;

interface AddProductModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    selectedCategoryId?: number;
}

export function AddProductModal({ isOpen, onClose, onSuccess, selectedCategoryId }: AddProductModalProps) {
    const [suppliers, setSuppliers] = useState<Supplier[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<ProductFormData>({
        resolver: zodResolver(productSchema),
        defaultValues: {
            status: true,
            discount: "0",
            thumbnail: "default.jpg"
        }
    });

    const { user } = useUserSession();

    useEffect(() => {
        if (isOpen) {
            loadSuppliers();
            loadCategories();
            if (selectedCategoryId) {
                setValue('category_id', selectedCategoryId.toString());
            }
        }
    }, [isOpen, selectedCategoryId]);

    const loadSuppliers = async () => {
        try {
            const data = await services.supplier.getAll();
            setSuppliers(data);
        } catch (error) {
            showAlert({
                type: 'error',
                message: 'Error al cargar los proveedores'
            });
        }
    };

    const loadCategories = async () => {
        try {
            const data = await services.category.getAll();
            setCategories(data);
        } catch (error) {
            showAlert({
                type: 'error',
                message: 'Error al cargar las categorías'
            });
        }
    };

    const onSubmit = async (data: ProductFormData) => {
        try {
            setIsLoading(true);
            await services.product.create({
                ...data,
                supplier_price: parseFloat(data.supplier_price),
                public_price: parseFloat(data.public_price),
                stock: parseInt(data.stock),
                minimal_safe_stock: parseInt(data.minimal_safe_stock),
                discount: parseFloat(data.discount),
                supplier_id: parseInt(data.supplier_id),
                category_id: parseInt(data.category_id),
                enterprise_id: user?.enterprise_id ? parseInt(user.enterprise_id) : 0,
                status: 'active'
            });
            reset();
            onSuccess();
            onClose();
            showAlert({
                type: 'success',
                message: 'Producto creado exitosamente'
            });
        } catch (error: any) {
            showAlert({
                type: 'error',
                message: error.response?.data?.detail || 'Error al crear producto'
            });
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center text-black overflow-y-auto">
            <div className="bg-white p-8 rounded-lg w-full max-w-2xl my-8">
                <h2 className="text-2xl font-bold mb-4">Agregar Nuevo Producto</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Nombre</label>
                            <input
                                {...register("name")}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                            />
                            {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Código de Barras</label>
                            <input
                                {...register("bar_code")}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                            />
                            {errors.bar_code && <span className="text-red-500 text-sm">{errors.bar_code.message}</span>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Precio Proveedor</label>
                            <input
                                type="number"
                                {...register("supplier_price")}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                            />
                            {errors.supplier_price && <span className="text-red-500 text-sm">{errors.supplier_price.message}</span>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Precio Público</label>
                            <input
                                type="number"
                                {...register("public_price")}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                            />
                            {errors.public_price && <span className="text-red-500 text-sm">{errors.public_price.message}</span>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Stock</label>
                            <input
                                type="number"
                                {...register("stock")}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                            />
                            {errors.stock && <span className="text-red-500 text-sm">{errors.stock.message}</span>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Stock Mínimo</label>
                            <input
                                type="number"
                                {...register("minimal_safe_stock")}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                            />
                            {errors.minimal_safe_stock && <span className="text-red-500 text-sm">{errors.minimal_safe_stock.message}</span>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Proveedor</label>
                            <select {...register("supplier_id")} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                                <option value="">Seleccionar proveedor</option>
                                {suppliers.map(supplier => (
                                    <option key={supplier.id} value={supplier.id}>
                                        {supplier.name}
                                    </option>
                                ))}
                            </select>
                            {errors.supplier_id && <span className="text-red-500 text-sm">{errors.supplier_id.message}</span>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Categoría</label>
                            <select {...register("category_id")} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                                <option value="">Seleccionar categoría</option>
                                {categories.map(category => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                            {errors.category_id && <span className="text-red-500 text-sm">{errors.category_id.message}</span>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Descuento (%)</label>
                            <input
                                type="number"
                                {...register("discount")}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                            />
                            {errors.discount && <span className="text-red-500 text-sm">{errors.discount.message}</span>}
                        </div>

                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                {...register("status")}
                                className="h-4 w-4 text-blue-600 rounded border-gray-300"
                            />
                            <label className="ml-2 block text-sm text-gray-900">Activo</label>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Descripción</label>
                        <textarea
                            {...register("description")}
                            rows={3}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                        />
                        {errors.description && <span className="text-red-500 text-sm">{errors.description.message}</span>}
                    </div>

                    <div className="mt-6 flex justify-end space-x-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 border rounded-md text-gray-600"
                            disabled={isLoading}
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <Loader size="sm" color="text-white" />
                                    <span className="ml-2">Guardando...</span>
                                </>
                            ) : (
                                'Guardar'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
} 