"use client"; 

import { useEffect } from 'react';
import { useRouter } from '@/i18n/routing';
import { useUserSession } from "@/store/userSession"; 
import { useTranslations } from 'next-intl';

export function AuthRedirect({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const { user } = useUserSession();
    const t = useTranslations('AuthRedirect');

    useEffect(() => {
        if (user ) {
            router.replace('/dashboard');
        }
    }, [user, router]);

    return <>{children}</>;
}