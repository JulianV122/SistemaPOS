import React from 'react'
import Image from 'next/image'
import { logoFacebook, logoInstagram, logoTwitter, logoLinkedin } from '@/public'

export function HomeFooter() {
    return (
        <footer className='bg-gray-900 w-auto p-4 text-white'>
            <div className='flex justify-around'>
                <div className='mb-4 flex flex-col text-center'>
                    <h2 className=' text-lg font-bold mb-3'>Contacto</h2>
                    <p>Email: contacto@posco.com</p>
                    <p>Teléfono: +1 234 567 890</p>
                </div>
                <div className='mb-4 flex flex-col text-center'>
                    <h2 className=' text-lg font-bold mb-3'>Dirección</h2>
                    <p>123 Calle Principal, Manizales, Colombia</p>
                </div>
                <div className='mb-4 flex flex-col text-center'>
                    <h2 className=' text-lg font-bold mb-3'>Síguenos</h2>
                    
                    <div className='flex gap-6'>
                        <Image src={logoFacebook} alt='Facebook' width={30} height={30}></Image>
                        <Image src={logoInstagram} alt='Instagram' width={30} height={30}></Image>
                        <Image src={logoTwitter} alt='Twitter' width={30} height={30}></Image>
                        <Image src={logoLinkedin} alt='Linkedin' width={30} height={30}></Image>
                    </div>
                </div>
            </div>
            <div className='mt-4 flex flex-col items-center'>
                <Image src='/logo.png' alt='Logo de Posco.' width={100} height={100}></Image>
                <p className=''>© 2024 Posco. Todos los derechos reservados.</p>
            </div>
        </footer>
    )
}
