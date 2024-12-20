"use client";

import React from 'react';
import { ButtonWithIcon } from "@/components";
import { buttonSecondary } from '../tokens';
import { Link, useRouter } from '@/i18n/routing';
import { useUserSession } from "@/store/userSession";
import { useTranslations } from 'next-intl';
import { logoutUser } from '@/services/auth';
import { logoBlanco } from '@/public';
import { showAlert } from '@/components/atoms/Alert';
import Image from 'next/image';

export function NavDashboard() {
    const { user, clear } = useUserSession();
    const t = useTranslations('NavDashboard');
    const router = useRouter();

    const logout = async () => {
        clear();
        await logoutUser();
        showAlert({
            type: 'success',
            message: 'Sesión cerrada correctamente'
        });
        router.push('/');
        
    }

    return (
        <aside className="max-w-96 flex flex-col bg-slate-800">
            <div className="flex-grow p-4">
                <div>
                    <div className="flex min-w-full justify-center p-4">
                        <Link href={'/'}><Image width="100" src={logoBlanco} alt="Logo de Posco." /></Link>
                    </div>
                    <ul className='space-y-2'>
                        {user?.permissions.includes('GESTIONAR_EMPLEADOS') && (
                            <li>
                                <Link href={'/dashboard/manage'}>
                                    <ButtonWithIcon text={t('manageEmployees')} nameIcon="M4.5 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM14.25 8.625a3.375 3.375 0 1 1 6.75 0 3.375 3.375 0 0 1-6.75 0ZM1.5 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM17.25 19.128l-.001.144a2.25 2.25 0 0 1-.233.96 10.088 10.088 0 0 0 5.06-1.01.75.75 0 0 0 .42-.643 4.875 4.875 0 0 0-6.957-4.611 8.586 8.586 0 0 1 1.71 5.157v.003Z"></ButtonWithIcon>
                                </Link>
                            </li>
                        )}

                        {user?.permissions.includes('GESTIONAR_INVENTARIO') && (
                            <li>
                                <Link href={'/dashboard/inventory'}>
                                    <ButtonWithIcon text={t('manageInventory')} nameIcon="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"></ButtonWithIcon>
                                </Link>
                            </li>
                        )}

                        {user?.permissions.includes('GESTIONAR_PROVEEDORES') && (
                            <li>
                                <Link href={'/dashboard/suppliers'}>
                                    <ButtonWithIcon text={t('manageSuppliers')} nameIcon="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v7.5m2.25-6.466a9.016 9.016 0 0 0-3.461-.203c-.536.072-.974.478-1.021 1.017a4.559 4.559 0 0 0-.018.402c0 .464.336.844.775.994l2.95 1.012c.44.15.775.53.775.994 0 .136-.006.27-.018.402-.047.539-.485.945-1.021 1.017a9.077 9.077 0 0 1-3.461-.203M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"></ButtonWithIcon>
                                </Link>
                            </li>
                        )}
                        {user?.permissions.includes('GESTIONAR_VENTAS') && (
                            <li>
                                <Link href={'/dashboard/cashier'}>
                                    <ButtonWithIcon text={t('manageCashier')} nameIcon="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z"></ButtonWithIcon>
                                </Link>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
            <div className="p-4">

                <button onClick={logout} className={` w-full text-white hover:bg-gray-700  ${buttonSecondary}`}>{t('logout')}</button>
            </div>
        </aside>
    );
}
