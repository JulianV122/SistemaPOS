'use client';
import React, { useState } from 'react';
import { navbarStyles } from '@/components/tokens';
import { ButtonSecondary } from '@/components';
import { logo } from '@/public';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';
import { useUserSession } from '@/store/userSession';

export function HomeNavbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();
    const t = useTranslations('HomeNavbar');
    const { user } = useUserSession();

    return (
        <nav className={`${navbarStyles} relative`}>
            <div className="container mx-auto flex justify-between items-center py-4 px-6">
                <div className='flex gap-9'>
                    <div className="">
                        <Image width="100" src={logo} alt="Logo de Posco." />
                    </div>
                    <div className="hidden lg:flex">
                        <ul className="flex gap-8">
                            <li><Link href="/" className="text-white hover:text-neutral-400 hover:border-b-2 hover:border-neutral-400 transition duration-200 ease-in-out">{t('home')}</Link></li>
                            <li><Link href="/about" className="text-white hover:text-neutral-400 hover:border-b-2 hover:border-neutral-400 transition duration-200 ease-in-out">{t('about')}</Link></li>
                            <li><Link href="/contact" className="text-white hover:text-neutral-400 hover:border-b-2 hover:border-neutral-400 transition duration-200 ease-in-out">{t('contact')}</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="hidden lg:flex items-center gap-4">
                    <div className="flex items-center gap-2 p-2 border text-black rounded-full">
                        <span className="text-xl">🌎</span>
                        <div className="flex items-center">
                            <Link href={`/${pathname}`} locale="en" className="text-black hover:underline px-2">EN</Link>
                            <span className="mx-1">|</span>
                            <Link href={`/${pathname}`} locale="es" className="text-black hover:underline px-2">ES</Link>
                        </div>
                    </div>
                    {user === null && (
                        <>
                            <Link href="/login">
                                <ButtonSecondary text={t('login')} customClasses="text-white hover:text-black"/>
                            </Link>
                            <Link href="/register">
                                <ButtonSecondary text={t('register')} customClasses="text-white hover:text-black"/>
                            </Link>
                        </>
                    )}
                    {user !== null && (
                        <Link href="/dashboard">
                            <ButtonSecondary text={t('dashboard')} customClasses="text-white hover:text-black"/>
                        </Link>
                    )}
                </div>
                <button
                    className="lg:hidden flex items-center text-black"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                </button>
            </div>

            {isMenuOpen && (
                <div className="lg:hidden absolute top-16 left-0 w-full bg-cyan-700 z-40 p-6 rounded-lg shadow-lg">
                    <ul className="flex flex-col items-center gap-4">
                        <li><Link href="/" className="text-black hover:text-cyan-800 hover:bg-white px-4 py-2 rounded transition duration-200 ease-in-out">{t('home')}</Link></li>
                        <li><Link href="/about" className="text-black hover:text-cyan-800 hover:bg-white px-4 py-2 rounded transition duration-200 ease-in-out">{t('about')}</Link></li>
                        <li><Link href="/contact" className="text-black hover:text-cyan-800 hover:bg-white px-4 py-2 rounded transition duration-200 ease-in-out">{t('contact')}</Link></li>
                    </ul>
                    <div className="flex flex-col items-center gap-4 mt-4">
                        <div className="flex items-center gap-2 p-2 bg-white text-black rounded-full">
                            <span className="text-xl">🌎</span>
                            <div className="flex items-center">
                                <Link href={`/${pathname}`} locale="en" className="text-black hover:underline px-2">EN</Link>
                                <span className="mx-1">|</span>
                                <Link href={`/${pathname}`} locale="es" className="text-black hover:underline px-2">ES</Link>
                            </div>
                        </div>
                        {user === null && (
                            <>
                                <Link href="/login">
                                    <ButtonSecondary text={t('login')} customClasses="text-white hover:text-black"/>
                                </Link>
                                <Link href="/register">
                                    <ButtonSecondary text={t('register')} customClasses="text-white hover:text-black"/>
                                </Link>
                            </>
                        )}
                        {user !== null && (
                            <Link href="/dashboard">
                                <ButtonSecondary text={t('dashboard')} customClasses="text-white hover:text-black"/>
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}
