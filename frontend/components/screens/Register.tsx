'use client';

import React from 'react';
import { ButtonPrimary } from '@/components';
import { useRouter } from '@/i18n/routing';
import { useForm, SubmitHandler } from "react-hook-form";
import { registerUser } from '@/services/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from '@/validators/registerSchema';
import { useTranslations } from 'next-intl';

type Inputs = {
    name: string;
    lastname: string;
    email: string;
    telephone: string;
    password: string;
    repeatPassword: string;
    terms: boolean;
}

interface RegisterProps {
    handleNext: () => void;
}

export function Register({ handleNext }: RegisterProps) {
    const t = useTranslations('Register');

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>({
        resolver: zodResolver(registerSchema)
    });

    const router = useRouter();

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        console.log(data);
        router.push('/login');
        registerUser(data.email, data.password, data.name, data.lastname, data.telephone);
        handleNext();
    };

    return (
        <div className="w-full max-w-4xl mx-auto p-2  bg-slate-50">
            <form className=" bg-slate-50  p-8" onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                    <div>
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

                    <div>
                        <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="lastname">
                            {t('lastname')}
                        </label>
                        <input
                            className={`shadow-sm appearance-none border ${errors.lastname ? 'border-red-500' : 'border-gray-300'} rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
                            id="lastname"
                            type="text"
                            placeholder={t('lastnamePlaceholder')}
                            {...register("lastname", { required: true })}
                        />
                        {errors.lastname && <p className="text-red-500 text-xs italic">{t('lastnameError')}</p>}
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
                            {...register("email", {
                                required: t('emailRequired')
                            })}
                        />
                        {errors.email && <p className="text-red-500 text-xs italic">{t('emailError')}</p>}
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="telephone">
                            {t('telephone')}
                        </label>
                        <input
                            className={`shadow-sm appearance-none border ${errors.telephone ? 'border-red-500' : 'border-gray-300'} rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
                            id="telephone"
                            type="text"
                            placeholder={t('telephonePlaceholder')}
                            {...register("telephone", { required: true })}
                        />
                        {errors.telephone && <p className="text-red-500 text-xs italic">{t('telephoneError')}</p>}
                    </div>
                </div>

                <div className='grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6'>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="password">
                            {t('password')}
                        </label>
                        <input
                            className={`shadow-sm appearance-none border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
                            id="password"
                            type="password"
                            placeholder={t('passwordPlaceholder')}
                            {...register("password", { required: true })}
                        />
                        {errors.password && <p className="text-red-500 text-xs italic">{t('passwordError')}</p>}
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="repeat_password">
                            {t('repeatPassword')}
                        </label>
                        <input
                            className={`shadow-sm appearance-none border ${errors.repeatPassword ? 'border-red-500' : 'border-gray-300'} rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
                            id="repeat_password"
                            type="password"
                            placeholder={t('repeatPasswordPlaceholder')}
                            {...register("repeatPassword", { required: true })}
                        />
                        {errors.repeatPassword && <p className="text-red-500 text-xs italic">{t('repeatPasswordError')}</p>}
                    </div>
                </div>


                <div className="mb-6">
                    <label className="flex items-center text-gray-700 text-sm font-medium">
                        <input
                            className="mr-2 leading-tight"
                            type="checkbox"
                            {...register("terms", { required: true })}
                        />
                        <span>{t('acceptTerms')}</span>
                    </label>
                    {errors.terms && <p className="text-red-500 text-xs italic">{t('termsError')}</p>}
                </div>

                <div className="w-full mb-6 flex justify-center">
                    <ButtonPrimary text={t('registerButton')} />
                </div>
                <input type="submit" />
            </form>
        </div>
    );
}
