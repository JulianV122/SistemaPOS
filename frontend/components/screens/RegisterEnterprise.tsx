'use client';

import React from 'react';
import { ButtonPrimary } from '@/components';
import { useRouter } from '@/i18n/routing';
import { useForm, SubmitHandler } from "react-hook-form";
import { registerUser } from '@/services/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerEnterpriseSchema } from '@/validators/registerEnterpriseSchema';
import { useTranslations } from 'next-intl';

type Inputs = {
    nit: string;
    name: string;
    email: string;
    number: string;
    city: string;

}

type RegisterEnterpriseProps = {
    handleNext: () => void;
}
export function RegisterEnterprise({ handleNext }: RegisterEnterpriseProps) {
    const t = useTranslations('RegisterEnterprise');


    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>({
        resolver: zodResolver(registerEnterpriseSchema),
    });

    const router = useRouter();

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        console.log(data);
        handleNext();
    };

    return (
        <div className="w-full max-w-4xl mx-auto p-2 bg-slate-50">
            <h1 className="text-2xl font-semibold text-center mb-8">{t('registerEnterpriseTitle')}</h1>
            <form className="bg-slate-50 p-8" onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="nit">
                            {t('nit')}
                        </label>
                        <input
                            className={`shadow-sm appearance-none border ${errors.nit ? 'border-red-500' : 'border-gray-300'} rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
                            id="nit"
                            type="text"
                            placeholder={t('nitPlaceholder')}
                            {...register("nit", { required: true })}
                        />
                        {errors.nit && <p className="text-red-500 text-xs italic">{t('nitError')}</p>}
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="name">
                            {t('name')}
                        </label>
                        <input
                            className={`shadow-sm appearance-none border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
                            id="name"
                            type="text"
                            placeholder={t('namePlaceholder')}
                            {...register("name", { required: true })}
                        />
                        {errors.name && <p className="text-red-500 text-xs italic">{t('nameError')}</p>}
                    </div>
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6'>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="email">
                            {t('email')}
                        </label>
                        <input
                            className={`shadow-sm appearance-none border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
                            id="email"
                            type="email"
                            placeholder={t('emailPlaceholder')}
                            {...register("email", { required: t('emailRequired') })}
                        />
                        {errors.email && <p className="text-red-500 text-xs italic">{t('emailError')}</p>}
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="number">
                            {t('number')}
                        </label>
                        <input
                            className={`shadow-sm appearance-none border ${errors.number ? 'border-red-500' : 'border-gray-300'} rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
                            id="number"
                            type="text"
                            placeholder={t('numberPlaceholder')}
                            {...register("number", { required: true })}
                        />
                        {errors.number && <p className="text-red-500 text-xs italic">{t('numberError')}</p>}
                    </div>
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6'>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="city">
                            {t('city')}
                        </label>
                        <input
                            className={`shadow-sm appearance-none border ${errors.city ? 'border-red-500' : 'border-gray-300'} rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
                            id="city"
                            type="text"
                            placeholder={t('cityPlaceholder')}
                            {...register("city", { required: true })}
                        />
                        {errors.city && <p className="text-red-500 text-xs italic">{t('cityError')}</p>}
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="city">
                            {t('city')}
                        </label>
                        <input
                            className={`shadow-sm appearance-none border ${errors.city ? 'border-red-500' : 'border-gray-300'} rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
                            id="city"
                            type="text"
                            placeholder={t('cityPlaceholder')}
                            {...register("city", { required: true })}
                        />
                        {errors.city && <p className="text-red-500 text-xs italic">{t('cityError')}</p>}
                    </div>
                </div>


                <div className="w-full mb-6 flex justify-center">
                    <ButtonPrimary text={t('registerButton')} />
                </div>

                <input type="submit" hidden />
            </form>
        </div>
    );
}
