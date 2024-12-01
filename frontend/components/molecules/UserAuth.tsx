"use client"; // Este componente es solo para el cliente

import { useEffect } from 'react';
import { useRouter } from '@/i18n/routing';
import { useUserSession } from "@/store/userSession"; 
import { Loader } from '../atoms/Loader';

export function UserAuth({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const { user } = useUserSession();

    useEffect(() => {
        if (!user) {
            router.replace('/login'); 
        }
    }, [user, router]);

    if (!user) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <Loader size="lg" />
            </div>
        );
    }

    return <>{children}</>;
}
