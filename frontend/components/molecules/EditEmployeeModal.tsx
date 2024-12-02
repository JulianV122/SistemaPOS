import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { services } from '@/services/api';
import { useEffect } from 'react';
import { showAlert } from '../atoms/Alert';

const employeeUpdateSchema = z.object({
    name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
    email: z.string().email("Email inválido"),
    code: z.string().min(1, "El código es requerido"),
    lastname: z.string().min(2, "El apellido debe tener al menos 2 caracteres"),
    telephone: z.string().min(10, "El teléfono debe tener al menos 10 dígitos"),
    role_id: z.number(),
    is_active: z.boolean()
});

type EmployeeUpdateFormData = z.infer<typeof employeeUpdateSchema>;

interface EditEmployeeModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    employeeId: number;
    initialData?: {
        name: string;
        email: string;
        code: string;
        lastname: string;
        telephone: string;
        role_id: number;
        is_active: boolean;
    };
}

export function EditEmployeeModal({ isOpen, onClose, onSuccess, employeeId, initialData }: EditEmployeeModalProps) {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<EmployeeUpdateFormData>({
        resolver: zodResolver(employeeUpdateSchema),
        defaultValues: initialData
    });

    useEffect(() => {
        if (initialData) {
            reset(initialData);
        }
    }, [initialData, reset]);

    const onSubmit = async (data: EmployeeUpdateFormData) => {
        try {
            await services.employee.update(employeeId, data);
            onSuccess();
            onClose();
            showAlert({
                type: 'success',
                message: 'Empleado actualizado exitosamente'
            });
        } catch (error: any) {
            showAlert({
                type: 'error',
                message: error.response?.data?.detail || 'Error al actualizar empleado'
            });
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center text-black">
            <div className="bg-white p-8 rounded-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4">Editar Empleado</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Nombre</label>
                            <input {...register("name")} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                            {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Apellido</label>
                            <input {...register("lastname")} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                            {errors.lastname && <span className="text-red-500 text-sm">{errors.lastname.message}</span>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <input {...register("email")} type="email" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                            {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Código</label>
                            <input {...register("code")} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                            {errors.code && <span className="text-red-500 text-sm">{errors.code.message}</span>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Teléfono</label>
                            <input {...register("telephone")} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                            {errors.telephone && <span className="text-red-500 text-sm">{errors.telephone.message}</span>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Rol</label>
                            <select {...register("role_id", { valueAsNumber: true })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                                <option value={1}>Administrador</option>
                                <option value={2}>Usuario</option>
                            </select>
                            {errors.role_id && <span className="text-red-500 text-sm">{errors.role_id.message}</span>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Estado</label>
                            <input type="checkbox" {...register("is_active")} className="mt-1 rounded" />
                        </div>
                    </div>

                    <div className="mt-6 flex justify-end space-x-3">
                        <button type="button" onClick={onClose} className="px-4 py-2 border rounded-md text-gray-600">
                            Cancelar
                        </button>
                        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                            Guardar Cambios
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
} 