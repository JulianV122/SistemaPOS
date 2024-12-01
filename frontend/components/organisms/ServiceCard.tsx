import React from 'react';
import { ButtonPrimary } from '../atoms/ButtonPrimary';
import { useTranslations } from 'next-intl';

type ServiceCardProps = {
    title: string,
    description: string,
    price: number
}

export function ServiceCard({ title, description, price }: ServiceCardProps) {
    const t = useTranslations('ServiceCard');

    return (
        <article className="max-w-xs rounded overflow-hidden border-1 border-cyan-700 shadow-cyan-700 shadow-lg m-4">
            <div className="px-4 py-16 flex flex-col items-center">
                <div className="font-bold text-3xl mb-4">{title}</div>
                <p className="text-gray-700 text-center">{description}</p>
                <div className="flex items-end mt-8 mb-8">
                    <p className="font-light">{t('currency')}</p>
                    <h1 className="font-bold text-6xl">{price}</h1>
                    <p className="font-light">{t('perMonth')}</p>
                </div>
                <ButtonPrimary text={t('hire')} />
            </div>
        </article>
    )
}
