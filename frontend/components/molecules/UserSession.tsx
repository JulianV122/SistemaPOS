'use client'

import { useEffect, useState } from 'react';
import { useRouter } from '@/i18n/routing';
import { getCurrentUser } from '@/services/auth';
import { useUserSession } from '@/store/userSession';
import { Loader } from '../atoms/Loader';


export function UserSession({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const { setUser, clear } = useUserSession();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getCurrentUser().then((user) => {
            if (user) {
                console.log('USUARIO LOGEADO');
            } else {
                clear();
            }
            
            setLoading(false);
        });
    }, [router, setUser, clear]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <Loader size="lg" />
            </div>
        );
    }

    return <>{children}</>;
}