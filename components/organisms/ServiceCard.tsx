import React from 'react'
import { ButtonPrimary } from '../atoms/ButtonPrimary'

type ServiceCardProps = {
    title: string,
    description: string,
    price: number
}


export function ServiceCard({title, description, price}: ServiceCardProps) {
    return (
        <article className="max-w-xs rounded overflow-hidden shadow-lg m-4">
            <div className="px-4 py-16 flex flex-col items-center">
                <div className="font-bold text-3xl mb-4">{title}</div>
                <p className="text-gray-700 text-center">{description}</p>
                <div className="flex items-end mt-8 mb-8">
                    <p className="font-light">COP$</p>
                    <h1 className="font-bold text-6xl">{price}</h1>
                    <p className="font-light">/mes</p>
                </div>
                <ButtonPrimary text="Contratar" />
            </div>
        </article>
    )
}
