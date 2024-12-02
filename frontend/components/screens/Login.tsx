'use client';
import { useTranslations } from 'next-intl';
import React from 'react';
import { ButtonPrimary } from '@/components';
import { useRouter } from '@/i18n/routing';
import { useForm, SubmitHandler } from "react-hook-form";
import { loginUser, getCurrentUser } from '@/services/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '@/validators/loginSchema';
import { useUserSession } from '@/store/userSession';
import { HomeNavbar } from '@/components';
import { backgroundLandingImage } from "@/public";
import Image from 'next/image';

type Inputs = {
    email: string,
    password: string
}

export function Login() {
    const t = useTranslations('Login');
    const { setUser } = useUserSession();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>({
        resolver: zodResolver(loginSchema)
    });

    const router = useRouter();

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        console.log(data);
        await loginUser(data.email, data.password);
        const user = await getCurrentUser();
        console.log(user);

        router.push('/dashboard');
    };

    return (
        <div><HomeNavbar />
            <div className="flex flex-col lg:flex-row h-screen bg-gray-100">

                <div className="flex-1 flex flex-col relative">
                    <Image src={backgroundLandingImage} alt="Background Image" layout="fill" objectFit="cover" className="opacity-50" />
                </div>
                <div className="flex-1 flex flex-col justify-center items-center p-4 sm:p-6 md:p-8">
                    <div className="w-full max-w-md">
                        <form className="bg-white shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4">
                            <h2 className="text-2xl font-bold text-center text-sky-950 mb-6">{t('loginTitle')}</h2>

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                    {t('email')}
                                </label>
                                <input
                                    className={`shadow appearance-none border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition duration-300 ease-in-out`}
                                    id="email"
                                    type="email"
                                    placeholder={t('emailPlaceholder')}
                                    {...register("email", { required: t('emailError') })}
                                />
                                {errors.email && <p className="text-red-500 text-xs italic">{t('emailError')}</p>}
                            </div>

                            <div className="mb-6">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                    {t('password')}
                                </label>
                                <input
                                    className={`shadow appearance-none border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline transition duration-300 ease-in-out`}
                                    id="password"
                                    type="password"
                                    placeholder={t('passwordPlaceholder')}
                                    {...register("password", { required: t('passwordError') })}
                                />
                                {errors.password && <p className="text-red-500 text-xs italic">{t('passwordError')}</p>}
                            </div>

                            <div className="w-full flex justify-center">
                                <ButtonPrimary text={t('submit')} />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
