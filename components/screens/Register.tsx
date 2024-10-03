'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ButtonPrimary } from '@/components';
import { DevTool } from "@hookform/devtools";
import { useForm, SubmitHandler } from "react-hook-form"
import { registerUser } from '@/services/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from '@/validators/registerSchema';

type Inputs = {
    name: string;
    lastname: string;
    email: string;
    telephone: string;
    password: string;
    repeatPassword: string;
    terms: string;
}

export function Register() {

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        control
    } = useForm<Inputs>({
        resolver: zodResolver(registerSchema)
    })

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        console.log(data);
        registerUser(data.email, data.password, data.name, data.lastname, data.telephone);
        router.push('/login');
    }

    const router = useRouter();

    return (
        <div className="w-full max-w-xl">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                        Nombre
                    </label>
                    <input
                        className={`shadow appearance-none border ${errors.name ? 'border-red-500' : ''} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                        id="name"
                        type="text"
                        placeholder="Nombre"
                        {...register("name", { required: true })}
                    />
                    {errors.name && <p className="text-red-500 text-xs italic"> El campo nombre es invalido </p>}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastname">
                        Apellido
                    </label>
                    <input
                        className={`shadow appearance-none border ${errors.lastname ? 'border-red-500' : ''} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                        id="lastname"
                        type="text"
                        placeholder="Apellido"
                        {...register("lastname", { required: true })}
                    />
                    {errors.lastname && <p className="text-red-500 text-xs italic"> El campo apellido es invalido </p>}
                </div>
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
                            required: "Este campo es requerido"
                        })}
                    />
                    {errors.email && <p className="text-red-500 text-xs italic"> El campo email es invalido </p>}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="telephone">
                        Teléfono
                    </label>
                    <input
                        className={`shadow appearance-none border ${errors.telephone ? 'border-red-500' : ''} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                        id="telephone"
                        type="text"
                        placeholder="Teléfono"
                        {...register("telephone", { required: true })}
                    />
                    {errors.telephone && <p className="text-red-500 text-xs italic"> El campo teléfono es invalido </p>}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Contraseña
                    </label>
                    <input
                        className={`shadow appearance-none border ${errors.password ? 'border-red-500' : ''} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                        id="password"
                        type="password"
                        placeholder="Contraseña"
                        {...register("password", { required: true })}
                    />
                    {errors.password && <p className="text-red-500 text-xs italic"> El campo contraseña es invalido </p>}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="repeat_password">
                        Repetir Contraseña
                    </label>
                    <input
                        className={`shadow appearance-none border ${errors.repeatPassword ? 'border-red-500' : ''} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                        id="repeat_password"
                        type="password"
                        placeholder="Repite la contraseña"
                        {...register("repeatPassword", { required: true })}
                    />
                    {errors.repeatPassword && <p className="text-red-500 text-xs italic"> El campo repetir contraseña es invalido </p>}
                </div>
                <div className="flex-auto mb-6">
                    <label className="block text-gray-500 font-bold text-sm">
                        <input
                            className="mr-2 leading-tight"
                            type="checkbox"
                            {...register("terms", { required: true })}
                        />
                        <span>
                            Acepto los términos y condiciones
                        </span>
                    </label>
                    {errors.terms && <p className="text-red-500 text-xs italic"> Se debe aceptar los terminos y condiciones</p>}
                </div>
                <div className="w-full flex justify-center">
                    <ButtonPrimary text="Registrarse" />
                </div>
                <input type="submit" />
            </form>
            <DevTool control={control} />
        </div>
    );
}
