import React from 'react'

import { ButtonPrimary } from '@/components'

export function RegisterForm () {
    return (
    <div className="w-full max-w-xl">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                Nombre Completo
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder=""/>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Correo Electronico
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder=""/>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                    Contraseña
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder=""/>         
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="repeat_password">
                    Repetir Contraseña
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="repeat_password" type="password" placeholder=""/>         
            </div>
            <div className="flex-auto mb-6">
                <label className="block text-gray-500 font-bold text-sm">
                <input className="mr-2 leading-tight" type="checkbox"/>
                <span className="">
                    Acepto los terminos y condiciones
                </span>
                </label>
            </div>
            <div className='w-full flex justify-center '>
                <ButtonPrimary text="Registrarse"></ButtonPrimary>
            </div>
        </form>
    </div>
    )
}