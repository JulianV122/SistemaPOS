import React from 'react';
import Image from 'next/image';
import { logoFacebook, logoInstagram, logoTwitter, logoLinkedin } from '@/public';
import { useTranslations } from 'next-intl';

export function HomeFooter() {
    const t = useTranslations('HomeFooter');

    return (
        <footer className='bg-gray-900 w-auto p-4 text-white'>
            <div className='flex justify-around'>
                <div className='mb-4 flex flex-col text-center'>
                    <h2 className='text-lg font-bold mb-3'>{t('contact')}</h2>
                    <p>{t('email')}</p>
                    <p>{t('phone')}</p>
                </div>
                <div className='mb-4 flex flex-col text-center'>
                    <h2 className='text-lg font-bold mb-3'>{t('address')}</h2>
                    <p>{t('addressDetails')}</p>
                </div>
                <div className='mb-4 flex flex-col text-center'>
                    <h2 className='text-lg font-bold mb-3'>{t('followUs')}</h2>
                    <div className='flex gap-6'>
                        <Image src={logoFacebook} alt='Facebook' width={30} height={30}></Image>
                        <Image src={logoInstagram} alt='Instagram' width={30} height={30}></Image>
                        <Image src={logoTwitter} alt='Twitter' width={30} height={30}></Image>
                        <Image src={logoLinkedin} alt='Linkedin' width={30} height={30}></Image>
                    </div>
                </div>
            </div>
            <div className='mt-4 flex flex-col items-center'>
                <Image src='/logo.png' alt='Logo de Posco.' width={100} height={100}></Image>
                <p>{t('rightsReserved')}</p>
            </div>
        </footer>
    );
}
