import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { services } from '@/services/api';
import { useUserSession } from '@/store/userSession';
import { showAlert } from '@/components/atoms/Alert';

const categorySchema = z.object({
    name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
    description: z.string().min(5, "La descripción debe tener al menos 5 caracteres"),
});

type CategoryFormData = z.infer<typeof categorySchema>;

interface AddCategoryModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

export function AddCategoryModal({ isOpen, onClose, onSuccess }: AddCategoryModalProps) {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<CategoryFormData>({
        resolver: zodResolver(categorySchema)
    });

    const { user } = useUserSession();

    const onSubmit = async (data: CategoryFormData) => {
        try {
            await services.category.create({
                ...data,
                enterprise_id: user?.enterprise_id ? parseInt(user.enterprise_id) : 0
            });
            reset();
            onSuccess();
            onClose();
            showAlert({
                type: 'success',
                message: 'Categoría creada exitosamente'
            });
        } catch (error: any) {
            showAlert({
                type: 'error',
                message: error.response?.data?.detail || 'Error al crear categoría'
            });
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center text-black">
            <div className="bg-white p-8 rounded-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4">Agregar Nueva Categoría</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Nombre</label>
                            <input
                                {...register("name")}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                            />
                            {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Descripción</label>
                            <textarea
                                {...register("description")}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                rows={3}
                            />
                            {errors.description && <span className="text-red-500 text-sm">{errors.description.message}</span>}
                        </div>
                    </div>

                    <div className="mt-6 flex justify-end space-x-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 border rounded-md text-gray-600"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                        >
                            Guardar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
} 