'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; 
import { ButtonPrimary } from '@/components';

export function RegisterForm() {
    interface Errors {
        name: string;
        email: string;
        password: string;
        repeatPassword: string;
        terms: string;
    }

    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [repeatPassword, setRepeatPassword] = useState<string>('');
    const [termsAccepted, setTermsAccepted] = useState<boolean>(false);
    const [errors, setErrors] = useState<Errors>({
        name: '',
        email: '',
        password: '',
        repeatPassword: '',
        terms: ''
    });

    const router = useRouter(); 

    const validateEmail = (email: string): boolean => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const validateForm = () => {
        let isValid = true;
        let errors: Errors = {
            name: '',
            email: '',
            password: '',
            repeatPassword: '',
            terms: ''
        };

        if (name.trim() === '') {
            errors.name = 'El campo de nombre no puede estar vacío.';
            isValid = false;
        }

        if (email.trim() === '' || !validateEmail(email)) {
            errors.email = 'Por favor, ingresa un correo electrónico válido.';
            isValid = false;
        }

        if (password.trim() === '') {
            errors.password = 'El campo de contraseña no puede estar vacío.';
            isValid = false;
        }

        if (repeatPassword.trim() === '' || password !== repeatPassword) {
            errors.repeatPassword = 'Las contraseñas no coinciden.';
            isValid = false;
        }

        if (!termsAccepted) {
            errors.terms = 'Debes aceptar los términos y condiciones.';
            isValid = false;
        }

        setErrors(errors);
        return isValid;
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const isValid = validateForm();

        if (isValid) {
            console.log('Formulario enviado', { name, email, password, termsAccepted });
            
            router.push('/login');
        }
    };

    return (
        <div className="w-full max-w-xl">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                        Nombre Completo
                    </label>
                    <input
                        className={`shadow appearance-none border ${errors.name ? 'border-red-500' : ''} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                        id="name"
                        type="text"
                        placeholder="Nombre completo"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    {errors.name && <p className="text-red-500 text-xs italic">{errors.name}</p>}
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
                        className={`shadow appearance-none border ${errors.password ? 'border-red-500' : ''} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                        id="password"
                        type="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {errors.password && <p className="text-red-500 text-xs italic">{errors.password}</p>}
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
                        value={repeatPassword}
                        onChange={(e) => setRepeatPassword(e.target.value)}
                    />
                    {errors.repeatPassword && <p className="text-red-500 text-xs italic">{errors.repeatPassword}</p>}
                </div>
                <div className="flex-auto mb-6">
                    <label className="block text-gray-500 font-bold text-sm">
                        <input
                            className="mr-2 leading-tight"
                            type="checkbox"
                            checked={termsAccepted}
                            onChange={() => setTermsAccepted(!termsAccepted)}
                        />
                        <span>
                            Acepto los términos y condiciones
                        </span>
                    </label>
                    {errors.terms && <p className="text-red-500 text-xs italic">{errors.terms}</p>}
                </div>
                <div className="w-full flex justify-center">
                    <ButtonPrimary text="Registrarse" />
                </div>
            </form>
        </div>
    );
}
