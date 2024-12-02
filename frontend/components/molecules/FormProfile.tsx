import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { profileSchema } from '@/validators/profileSchema';
import { services } from '@/services/api';
import { showAlert } from '@/components/atoms/Alert';
import { useUserSession } from '@/store/userSession';
import { getCurrentUser } from '@/services/auth';

type FormProfileProps = {
    name: string;
    lastname: string;
    telephone: string;
}

type ProfileFormData = {
    name: string;
    lastname: string;
    telephone: string;
}

export function FormProfile({ name, lastname, telephone }: FormProfileProps) {
    const t = useTranslations('FormProfile');
    const { setUser } = useUserSession();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ProfileFormData>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            name,
            lastname,
            telephone
        }
    });

    const onSubmit = async (data: ProfileFormData) => {
        try {
            const updatedUser = await services.employee.updateMe(data);
            showAlert({
                type: 'success',
                message: 'Perfil actualizado correctamente'
            });
            await getCurrentUser();
            
        } catch (error: any) {
            showAlert({
                type: 'error',
                message: error.response?.data?.detail || 'Error al actualizar el perfil'
            });
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-4 mt-4 text-black">
            <div>
                <label className="block text-sm font-medium text-gray-700">
                    {t('name')}
                </label>
                <input
                    type="text"
                    {...register("name")}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                )}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">
                    {t('lastname')}
                </label>
                <input
                    type="text"
                    {...register("lastname")}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                {errors.lastname && (
                    <p className="mt-1 text-sm text-red-600">{errors.lastname.message}</p>
                )}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">
                    {t('telephone')}
                </label>
                <input
                    type="text"
                    {...register("telephone")}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                {errors.telephone && (
                    <p className="mt-1 text-sm text-red-600">{errors.telephone.message}</p>
                )}
            </div>

            <div className="flex justify-end">
                <button
                    type="submit"
                    className="px-4 py-2 bg-violet-700 text-white rounded-md hover:bg-violet-800 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2"
                >
                    {t('updateButton')}
                </button>
            </div>
        </form>
    );
}
