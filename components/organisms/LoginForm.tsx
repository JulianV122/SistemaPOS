'use client';

import React, { useState } from 'react';
import { ButtonPrimary } from '@/components';
import Link from 'next/link';

export function LoginForm() {
    interface Errors {
        email: string;
        password: string;
    }

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [errors, setErrors] = useState<Errors>({ email: '', password: '' });

    // Validar si el campo está vacío
    const validateEmptyFields = () => {
        let errors: Errors = { email: '', password: '' };
        let isValid = true;

        if (email.trim() === '') {
            errors.email = 'El campo de correo electrónico no puede estar vacío.';
            isValid = false;
        }

        if (password.trim() === '') {
            errors.password = 'El campo de contraseña no puede estar vacío.';
            isValid = false;
        }

        setErrors(errors);
        return isValid;
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const isValid = validateEmptyFields();

        if (isValid) {
            // Lógica de envío del formulario
            console.log('Formulario enviado', { email, password });
        }
    };

    return (
        <div className="w-full max-w-xl">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Correo Electrónico
                    </label>
                    <input
                        className={`shadow appearance-none border ${errors.email ? 'border-red-500' : ''} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                        id="email"
                        type="email"
                        placeholder="Correo electrónico"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {errors.email && <p className="text-red-500 text-xs italic">{errors.email}</p>}
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
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {errors.password && <p className="text-red-500 text-xs italic">{errors.password}</p>}
                </div>
                <div className="w-full flex justify-center">
                    <Link href='/dashboard'><ButtonPrimary text="Ingresar" /></Link>
                </div>
            </form>
        </div>
    );
}
