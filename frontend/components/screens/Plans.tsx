'use client';

import React, { useState } from 'react';
import { ServiceCard } from '../organisms/ServiceCard';
import { ButtonPrimary } from '../atoms/ButtonPrimary';
import { useTranslations } from 'next-intl';

export function Plans() {
    const t = useTranslations('Plans');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [paymentSuccess, setPaymentSuccess] = useState(false);

    const handleHireClick = () => {
        setIsModalOpen(true);
    };

    const handleProcessPayment = () => {
        setIsProcessing(true);
        setTimeout(() => {
            setIsProcessing(false);
            setPaymentSuccess(true);
        }, 2000);
    };

    const handleCancelPayment = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="flex flex-col items-center justify-center pb-9">
            <br/>
            <h1 className="text-2xl font-semibold text-center mb-8">{t('choosePlan')}</h1>
            <div className="flex flex-wrap justify-center ">
                <ServiceCard
                    title={t('basicPlan.title')}
                    description={t('basicPlan.description')}
                    price={15900}
                    onHireClick={handleHireClick}
                />
                <ServiceCard
                    title={t('intermediatePlan.title')}
                    description={t('intermediatePlan.description')}
                    price={29900}
                    onHireClick={handleHireClick}
                />
                <ServiceCard
                    title={t('advancedPlan.title')}
                    description={t('advancedPlan.description')}
                    price={49900}
                    onHireClick={handleHireClick}
                />
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                        <h3 className="text-xl font-semibold mb-4">{t('paymentDetails')}</h3>

                        {isProcessing ? (
                            <div className="text-center">
                                <p>{t('processingPayment')}</p>
                                <div className="mt-4 animate-pulse">...</div>
                            </div>
                        ) : paymentSuccess ? (
                            <div className="text-center">
                                <p className="text-green-600">{t('paymentSuccess')}</p>
                                <ButtonPrimary text={t('close')} onClick={handleCancelPayment} />
                            </div>
                        ) : (
                            <>
                                <form>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="cardNumber">
                                            {t('cardNumber')}
                                        </label>
                                        <input
                                            type="text"
                                            id="cardNumber"
                                            className="border-gray-300 rounded w-full py-2 px-3 text-gray-700"
                                            placeholder={t('cardNumberPlaceholder')}
                                            required
                                        />
                                    </div>

                                    <div className="mb-6">
                                        <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="expiryDate">
                                            {t('expiryDate')}
                                        </label>
                                        <input
                                            type="text"
                                            id="expiryDate"
                                            className="border-gray-300 rounded w-full py-2 px-3 text-gray-700"
                                            placeholder={t('expiryDatePlaceholder')}
                                            required
                                        />
                                    </div>

                                    <div className="flex justify-between">
                                        <ButtonPrimary text={t('payNow')} onClick={handleProcessPayment} />
                                        <button
                                            type="button"
                                            className="text-red-500"
                                            onClick={handleCancelPayment}
                                        >
                                            {t('cancel')}
                                        </button>
                                    </div>
                                </form>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
