'use client';

import React, { useState } from 'react';
import { ButtonPrimary } from '@/components';
import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler } from "react-hook-form"
import { loginUser, getCurrentUser } from '@/services/auth';
import { DevTool } from "@hookform/devtools";
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '@/validators/loginSchema';
import { useUserSession } from '@/store/userSession';

type Inputs = {
    email: string,
    password: string
}


export function Login() {
    const { setUser } = useUserSession();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        control
    } = useForm<Inputs>({
        resolver: zodResolver(loginSchema)
    })

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        console.log(data);
        const response = await loginUser(data.email, data.password);


        if (response.code === 'auth/invalid-credential') {
            alert('Usuario no encontrado');
            return;
        }

        const user = await getCurrentUser();

        if (user) {
            setUser({
                id: user.uid,
                email: user.email ?? '',
                name: user.name,
                lastname: user.lastname,
                telephone: user.telephone,
                role: user.role.name,
                roleDescription: user.role.description,
                permissions: user.role.permissions
            });
        }

        router.push('/dashboard');
    }

    const router = useRouter();

    return (
        <div className="w-full max-w-xl">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Correo Electrónico
                    </label>
                    <input
                        className={`shadow appearance-none border ${errors.email ? 'border-red-500' : ''} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                        id="email"
                        type="email"
                        placeholder="Correo electrónico"
                        {...register("email", {
                            required: "Este campo es requerido",
                        })}
                    />
                    {errors.email && <p className="text-red-500 text-xs italic"> El campo email es invalido </p>}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Contraseña
                    </label>
                    <input
                        className={`shadow appearance-none border ${errors.password ? 'border-red-500' : ''} rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`}
                        id="password"
                        type="password"
                        placeholder="Contraseña"
                        {...register("password", { required: true })}
                    />
                    {errors.password && <p className="text-red-500 text-xs italic"> El campo contraseña es invalido </p>}
                </div>
                <div className="w-full flex justify-center">
                    <ButtonPrimary text="Ingresar" />
                </div>
                <input type="submit" />
            </form>
            <DevTool control={control} />
        </div>
    );
}
