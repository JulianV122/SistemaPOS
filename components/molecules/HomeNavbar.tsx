import React from 'react'
import { navbarStyles } from '@/components/tokens'
import { ButtonSecondary } from '@/components'
import { logo } from '@/public'
import Image from 'next/image'
import Link from 'next/link'


export function HomeNavbar() {
    return (
        <nav className={`${navbarStyles}`}>
            <div className='flex gap-10 items-center'>
                <div>
                    <Image width='100' src={logo} alt='Logo de Posco.'></Image>
                </div>
                <div>
                    <ul className="flex gap-8">
                        <li><Link href="/" className="text-white">Home</Link></li>
                        <li><Link href="/about" className="text-white">Sobre nosotros</Link></li>
                        <li><Link href="/contact" className="text-white">Contacto</Link></li>
                    </ul>
                </div>
            </div>

            <div className='flex gap-4'>
                <Link href="/login"><ButtonSecondary text="Login" /></Link>
                <Link href="/register"><ButtonSecondary text="Register" /></Link>
            </div>
        </nav>
    )
}
