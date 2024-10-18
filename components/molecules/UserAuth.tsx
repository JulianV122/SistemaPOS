"use client"; // Este componente es solo para el cliente

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUserSession } from "@/store/userSession"; 

export function UserAuth({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const { user } = useUserSession();

    useEffect(() => {
        if (!user) {
            router.replace('/login'); 
        }
    }, [user, router]);

    if (!user) {
        return <p>Loading...</p>;
    }

    return <>{children}</>;
}
