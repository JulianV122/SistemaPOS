'use client'

import { useEffect, useState } from 'react';
import { useRouter } from '@/i18n/routing';
import { getCurrentUser } from '@/services/auth';
import { useUserSession } from '@/store/userSession';

export function UserSession({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const { setUser, clear } = useUserSession();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getCurrentUser().then((user) => {
            if (user) {
                setUser(user);
            } else {
                clear();
            }
            
            setLoading(false);
        });
    }, [router, setUser, clear]);

    if (loading) {
        return <p>Loading...</p>;
    }

    return <>{children}</>;
}