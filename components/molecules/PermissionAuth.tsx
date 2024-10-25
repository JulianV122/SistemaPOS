"use client"; // Se ejecuta solo en el cliente

import { useEffect } from 'react';
import { useRouter } from '@/i18n/routing';
import { useUserSession } from "@/store/userSession"; 
import { useTranslations } from 'next-intl';

type PermissionAuthProps = {
    children: React.ReactNode;
    requiredPermission: string; 
};

export function PermissionAuth({ children, requiredPermission }: PermissionAuthProps) {
    const router = useRouter();
    const { user } = useUserSession();
    const t = useTranslations('PermissionAuth'); // Hook para traducciones

    useEffect(() => {
        if (!user) {
            alert(t('redirectMessage')); // Mensaje de redirección
            router.replace('/login'); 
        } else if (!user.permissions.includes(requiredPermission)) {
            alert(t('noPermissionMessage')); // Mensaje de permiso denegado
            router.replace('/dashboard'); 
        }
    }, [user, requiredPermission, router, t]);

    return <>{children}</>;
}
