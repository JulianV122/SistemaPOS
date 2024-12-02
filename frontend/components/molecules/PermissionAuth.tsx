"use client"; // Se ejecuta solo en el cliente

import { useEffect } from 'react';
import { useRouter } from '@/i18n/routing';
import { useUserSession } from "@/store/userSession"; 
import { useTranslations } from 'next-intl';
import { showAlert } from '@/components/atoms/Alert';

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
            router.replace('/login'); 
        } else if (!user.permissions.includes(requiredPermission)) {
            showAlert({
                type: 'error',
                message: t('noPermissionMessage')
            });
            router.replace('/dashboard'); 
        }
    }, [user, requiredPermission, router, t]);

    return <>{children}</>;
}
