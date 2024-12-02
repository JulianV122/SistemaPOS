import React from 'react'
import { useTranslations } from 'next-intl';
import { apoyoTecnico, aprobado, ayudar, backgroundLandingImage, empresa1, empresa2, empresa3, equipoTrabajo, factura, recompensa, soporteTecnico } from "@/public";
import Image from "next/image";

export default function page() {
  const t = useTranslations('Contact');
  return (
      <div className="container mx-auto p-4 text-black mt-10 mb-32">
          <header className="flex items-center justify-between my-8">
              <div className="flex-1 max-w-xl">
                  <p className="text-3xl font-semibold text-black "> {t('title')} </p>
                  <p className="text-xl mt-8 text-black font-light ">{t('subtitle')}</p>
                  <div className="mt-8 flex items-center">
                    <Image
                      src={apoyoTecnico}
                      alt="Ayudar icon"
                      className="w-16 h-16 mr-4"
                    />
                    <div>
                      <p className="text-lg font-medium text-black">{t('support')}</p>
                      <button className="mt-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition duration-300">
                      {t('call')}
                      </button>
                    </div>
                  </div>
                  <div className="mt-8 flex items-center">
                    <Image
                      src={ayudar}
                      alt="Ayudar icon"
                      className="w-16 h-16 mr-4"
                    />
                    <div>
                      <p className="text-lg font-medium text-black">{t('chat')}</p>
                      <button className="mt-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition duration-300">
                      {t('contactSupport')}
                      </button>
                    </div>
                  </div>
              </div>
              <div className="flex-1 flex justify-end ml-4">
                  <Image
                      src={soporteTecnico}
                      alt="Soporte tecnico image" 
                      className="w-full max-w-2xl h-auto rounded-2xl object-cover"
                  />
              </div>
          </header>
      </div>
      
  )
}
