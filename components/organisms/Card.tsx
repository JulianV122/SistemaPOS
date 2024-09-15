import React from 'react'

import Image from 'next/image'
import Link from 'next/link'

import { primaryColor } from '../tokens'

type CardProps = {
    idCard: string
}

export function Card({idCard}: CardProps) {
    return (
        <article className={`flex flex-col h-max rounded ${primaryColor}`}>
            <Link href={`/${idCard}`}>
                <Image className='rounded-md' src='/dolphin.webp' alt='' width='250' height='250' />
            </Link>

            <p className='font-semibold text-xl'>Pepito</p>
        </article>
    )
}