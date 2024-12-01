import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { services } from '@/services/api';
import { useUserSession } from '@/store/userSession';

const employeeSchema = z.object({
    name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
    email: z.string().email("Email inválido"),
    code: z.string().min(1, "El código es requerido"),
    lastname: z.string().min(2, "El apellido debe tener al menos 2 caracteres"),
    telephone: z.string().min(10, "El teléfono debe tener al menos 10 dígitos"),
    password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
    role_id: z.number()
});

type EmployeeFormData = z.infer<typeof employeeSchema>;

interface AddEmployeeModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

export function AddEmployeeModal({ isOpen, onClose, onSuccess }: AddEmployeeModalProps) {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<EmployeeFormData>({
        resolver: zodResolver(employeeSchema)
    });


    const { user } = useUserSession();
    const onSubmit = async (data: EmployeeFormData) => {
        try {
            await services.employee.create({
                ...data,
                enterprise_id: user?.enterprise_id ? parseInt(user.enterprise_id) : 0
            });
            reset();
            onSuccess();
            onClose();
        } catch (error) {
            console.error('Error al crear empleado:', error);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center text-black">
            <div className="bg-white p-8 rounded-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4">Agregar Nuevo Empleado</h2>
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
                            <label className="block text-sm font-medium text-gray-700">Contraseña</label>
                            <input {...register("password")} type="password" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                            {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Rol</label>
                            <select {...register("role_id", { valueAsNumber: true })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                                <option value={1}>Administrador</option>
                                <option value={2}>Usuario</option>
                            </select>
                            {errors.role_id && <span className="text-red-500 text-sm">{errors.role_id.message}</span>}
                        </div>
                    </div>

                    <div className="mt-6 flex justify-end space-x-3">
                        <button type="button" onClick={onClose} className="px-4 py-2 border rounded-md text-gray-600">
                            Cancelar
                        </button>
                        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                            Guardar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}