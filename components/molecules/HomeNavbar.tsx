'use client'

import React from 'react';
import { navbarStyles } from '@/components/tokens';
import { ButtonSecondary } from '@/components';
import { logo } from '@/public'; // Assume you have a world icon in your public folder
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';

export function HomeNavbar() {
    const pathname = usePathname();
    const t = useTranslations('HomeNavbar');
    return (
        <nav className={navbarStyles}>
            <div className='flex gap-10 items-center'>
                <div>
                    <Image width='100' src={logo} alt='Logo de Posco.' />
                </div>
                <div>
                    <ul className="flex gap-8">
                        <li><Link href="/" className="text-white">{t('home')}</Link></li>
                        <li><Link href="/about" className="text-white">{t('about')}</Link></li>
                        <li><Link href="/contact" className="text-white">{t('contact')}</Link></li>
                    </ul>
                </div>
            </div>
            <div className='flex gap-4'>
                <div className='flex items-center gap-2 p-2 bg-white text-black rounded-full'>
                    <span className="text-1xl">🌎</span>
                    <Link href={`/${pathname}`} locale="en" className="text-black">EN</Link>
                    <span>|</span>
                    <Link href={`/${pathname}`}  locale="es" className="text-black">ES</Link>
                </div>
                <Link href="/login">
                    <ButtonSecondary text={t('login')} />
                </Link>
                <Link href="/register">
                    <ButtonSecondary text={t('register')} />
                </Link>
            </div>
        </nav>
    );
}
