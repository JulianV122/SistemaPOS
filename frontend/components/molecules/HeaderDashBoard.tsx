'use client'
import { Link } from '@/i18n/routing';
import { useUserSession } from "@/store/userSession"
import { useTranslations } from 'next-intl';

export function HeaderDashboard() {
    const { user } = useUserSession();
    const t = useTranslations('HeaderDashboard');

    return (
        <header className="bg-gray-300 p-4 flex justify-between items-center">
            <div className='flex gap-5'>
                <div className='flex flex-col'>
                    <span className='text-black font-bold'>{user?.name.toUpperCase()} {user?.lastname.toUpperCase(  )}</span>
                    <span className='text-gray-900'>{user?.role}</span>
                </div>
                <div className='flex flex-col border-l-2 pl-5 border-l-black'>
                    <span className='text-black font-bold'>{user?.enterprise}</span>
                    <span className='text-gray-900'>{user?.enterprise_nit}</span>
                </div>
            </div>


            <div className="h-10 w-10 rounded-full bg-blue-200 flex items-center justify-center">
                <Link href={'/dashboard/profile'}>{t('profileIcon')}</Link>
            </div>
        </header>
    )
}
