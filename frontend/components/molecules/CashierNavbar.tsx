import React from 'react';
import { navbarStyles } from '../tokens';
import { ButtonSecondary } from '@/components';
import { useTranslations } from 'next-intl';

export function CashierNavbar() {
    const t = useTranslations('CashierNavbar');

    return (
        <div>
            <nav className={`${navbarStyles}`}>
                <div className='flex gap-4'>
                    <div>
                        <p><strong>Pepito Pérez</strong></p>
                        <span>{t('cashier')}</span>
                    </div>
                    <p><strong>{t('store')}:</strong> MegaFruver</p>
                    <p><strong>{t('registerCode')}:</strong> 024128</p>
                </div>
                <div>
                    <ButtonSecondary text={t('buttonText')} />
                </div>
            </nav>
        </div>
    );
}
