'use client'

import { useEffect, useState } from 'react';
import { useRouter } from '@/i18n/routing';
import { checkAuthState } from '@/services/auth';
import { useUserSession } from '@/store/userSession';

export function UserSession({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const { setUser, clear } = useUserSession();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkAuthState((user) => {
            if (user) {
                // Aquí puedes obtener información adicional del usuario si es necesario
                setUser({
                    id: user.uid,
                    email: user.email ?? '',
                    name: user.name,
                    lastname: user.lastname,
                    telephone: user.telephone,
                    role: user.role.name,
                    roleDescription: user.role.description,
                    permissions: user.role.permissions
                });
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