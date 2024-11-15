'use client'
import { Link } from '@/i18n/routing';
import { useUserSession } from "@/store/userSession"
import { useTranslations } from 'next-intl';

export function HeaderDashboard() {
    const { user } = useUserSession();
    const t = useTranslations('HeaderDashboard');

    return (
        <header className="bg-gray-300 p-4 flex justify-between items-center">
            <span className='text-black'>{user?.name} {user?.lastname}</span>
            <div className="h-10 w-10 rounded-full bg-blue-200 flex items-center justify-center">
                <Link href={'/dashboard/profile'}>{t('profileIcon')}</Link>
            </div>
        </header>
    )
}
