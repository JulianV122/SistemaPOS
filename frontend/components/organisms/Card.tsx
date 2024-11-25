import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { primaryColor } from '../tokens';

type CardProps = {
    idCard: string;
};

export function Card({ idCard }: CardProps) {
    const t = useTranslations('Card');

    return (
        <article className={`flex flex-col h-max rounded ${primaryColor}`}>
            <Link href={`/${idCard}`}>
                <Image className='rounded-md' src='/dolphin.webp' alt={t('imageAlt')} width='250' height='250' />
            </Link>

            <p className='font-semibold text-xl'>{t('title')}</p>
        </article>
    );
}
