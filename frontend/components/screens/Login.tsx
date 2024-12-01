'use client';

import { useTranslations } from 'next-intl';
import React, { useState } from 'react';
import { ButtonPrimary } from '@/components';
import { useRouter } from '@/i18n/routing';
import { useForm, SubmitHandler } from "react-hook-form"
import { loginUser } from '@/services/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '@/validators/loginSchema';
import { useUserSession } from '@/store/userSession';
import { showAlert } from '@/components/atoms/Alert';

type Inputs = {
    email: string,
    password: string
}

export function Login() {
    const t = useTranslations('Login');
    const { setUser } = useUserSession();
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>({
        resolver: zodResolver(loginSchema)
    })

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        try {
            await loginUser(data.email, data.password);
            showAlert({
                type: 'success',
                message: '¡Sesión iniciada correctamente!'
            });
            router.push('/dashboard');
        } catch (error: any) {
            showAlert({
                type: 'error',
                message: error.response?.data?.detail || 'Error al iniciar sesión'
            });
        }
    }

    return (
        <div className="w-full max-w-xl">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        {t('email')}
                    </label>
                    <input
                        className={`shadow appearance-none border ${errors.email ? 'border-red-500' : ''} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                        id="email"
                        type="email"
                        placeholder={t('emailPlaceholder')}
                        {...register("email")}
                    />
                    {errors.email && <p className="text-red-500 text-xs italic">{t('emailError')}</p>}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        {t('password')}
                    </label>
                    <input
                        className={`shadow appearance-none border ${errors.password ? 'border-red-500' : ''} rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`}
                        id="password"
                        type="password"
                        placeholder={t('passwordPlaceholder')}
                        {...register("password")}
                    />
                    {errors.password && <p className="text-red-500 text-xs italic">{t('passwordError')}</p>}
                </div>
                <div className="w-full flex justify-center">
                    <ButtonPrimary text={t('submit')} />
                </div>
            </form>
        </div>
    );
}
