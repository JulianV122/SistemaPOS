import React from 'react'

import './CashierNavbar.css'

export default function CashierNavbar() {
  return (
    <div>
        <nav className='cashier-navbar'>
            <div className='left-data'>
                <div>
                    <p><strong>Pepito Pérez</strong></p>
                    <span>Cajero</span>
                </div>
                <p><strong>Tienda:</strong> MegaFruver</p>
                <p><strong>Código caja:</strong> 024128</p>
            </div>
            <div>
                <a href="" className='logout-button'>Salir</a>
            </div>  
        </nav>
    </div>
  )
}
