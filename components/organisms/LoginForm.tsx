'use client';

import React, { useState } from 'react';
import { ButtonPrimary } from '@/components';
import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler } from "react-hook-form"
import { loginUser } from '@/services/auth';

type Inputs = {
    email: string,
    password: string
}

export function LoginForm() {

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        control
      } = useForm<Inputs>()
    
    const onSubmit: SubmitHandler<Inputs> = (data) => {
        console.log(data);
        loginUser(data.email, data.password);
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
                            pattern: {
                              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                              message: "El formato del correo electrónico no es válido"
                            }
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
                        {...register("password", { required:true })}
                    />
                {errors.password && <p className="text-red-500 text-xs italic"> El campo contraseña es invalido </p>}
                </div>  
                <div className="w-full flex justify-center">
                    <ButtonPrimary text="Ingresar" />
                </div>
                <input type="submit"/>
            </form>
        </div>
    );
}
