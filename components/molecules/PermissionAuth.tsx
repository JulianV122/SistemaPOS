"use client"; // Se ejecuta solo en el cliente

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUserSession } from "@/store/userSession"; 

type PermissionAuthProps = {
    children: React.ReactNode;
    requiredPermission: string; 
};

export function PermissionAuth({ children, requiredPermission }: PermissionAuthProps) {
    const router = useRouter();
    const { user } = useUserSession();

    useEffect(() => {
        if (!user) {
            router.replace('/login'); 
        } else if (!user.permissions.includes(requiredPermission)) {
            router.replace('/dashboard '); 
        }
    }, [user, requiredPermission, router]);

    return <>{children}</>;
}
