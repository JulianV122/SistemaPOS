import React from 'react'


import { navbarStyles } from '../tokens'

import { ButtonSecondary } from '@/components'

export function CashierNavbar() {
    return (
        <div>
            <nav className={`${navbarStyles}`}>
                <div className='flex gap-4'>
                    <div>
                        <p><strong>Pepito Pérez</strong></p>
                        <span>Cajero</span>
                    </div>
                    <p><strong>Tienda:</strong> MegaFruver</p>
                    <p><strong>Código caja:</strong> 024128</p>
                </div>
                <div>
                    <ButtonSecondary text='Pepepepepepepe'/>
                </div>
            </nav>
        </div>
    )
}
