import React from 'react'
import { useTranslations } from 'next-intl';
import { aprobado, backgroundLandingImage, empresa1, empresa2, empresa3, equipoTrabajo, factura, recompensa } from "@/public";

import Image from "next/image";

export default function page() {
    const t = useTranslations('About');
    return (
        <div className="container mx-auto p-4 text-black">
             <header className="flex items-center justify-between my-8">
                <div className="flex-1 max-w-lg">
                    <p className="text-3xl font-bold text-blue-500 ">
                        {t('titleBlue')} 
                        <span className="text-black " > {t('title')} </span> 
                    </p>
                    <p className="text-xl mt-8 text-black font-light ">{t('description')}</p>
                    
                </div>
                <div className="flex-1 flex justify-end">
                    <Image
                        src={equipoTrabajo}
                        alt="Equipo de Trabajo image" 
                        className="w-full max-w-xl h-auto rounded-2xl object-cover"
                    />
                </div>
            </header>
            <section className="my-20">
                <div className="flex flex-wrap justify-evenly mt-4 ">
                    <div className="max-w-lg rounded overflow-hidden shadow-lg m-4 sm:motion-safe:hover:scale-110 transition duration-300 hover:shadow-gray-600 hover:shadow-xl ">
                        <div className="px-6 py-4  ">
                            <p className="text-teal-900 text-2xl font-semibold  ">{t('mision')}</p>
                            <p className="text-gray-700 text-base font-normal mt-4">{t('misionDescription')}</p>
                        </div>
                    </div>
                    <div className="max-w-lg rounded overflow-hidden shadow-lg m-4 sm:motion-safe:hover:scale-110 transition duration-300 hover:shadow-gray-600 hover:shadow-xl  ">
                        <div className="px-6 py-4 ">
                            <p className="text-teal-900 text-2xl font-semibold">{t('vision')}</p>
                            <p className="text-gray-700 text-base font-normal mt-4 ">{t('visionDescription')}</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}