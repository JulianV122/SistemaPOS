"use client";

import { Metadata } from "next";
import { useTranslations } from 'next-intl';
import { aprobado, backgroundLandingImage, empresa1, empresa2, empresa3, factura, recompensa } from "@/public";
import { ServiceCard } from "@/components";
import { Link, usePathname } from '@/i18n/routing';
import { ButtonSecondary } from "@/components";
import Image from "next/image";



export default function LandingPage() {
    const t = useTranslations('LandingPage');

    const handleScrollToPlans = () => {
        const plansSection = document.getElementById("servicePlans");
        if (plansSection) {
            plansSection.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <div className="container mx-auto p-4 text-black">
            <header className="flex items-center justify-between my-8">
                <div className="flex-1 max-w-lg">
                    <p className="text-gray-500">Software POS de punto de venta</p>
                    <h2 className="text-4xl font-bold text-black">
                        Identificación, mail y listo! 
                        <span className="text-blue-500"> Tu sistema POS </span> 
                        Fácil y rápido
                    </h2>
                    <p className="text-xl mt-2 text-black font-light">{t('subtitle')}</p>
                    <button
                        onClick={handleScrollToPlans}
                        className="bg-blue-500 text-white py-2 px-4 rounded-md max-w-max mt-4 text-lg hover:bg-blue-600 transition duration-200"
                    >
                        Comienza ya
                    </button>
                </div>
                <div className="flex-1 flex justify-end">
                    <Image
                        src={backgroundLandingImage}
                        alt="Background Image"
                        className="w-full max-w-xl h-auto rounded-2xl object-cover"
                    />
                </div>
            </header>

            <div className="my-24 flex justify-between text-start w-full ml-4  ">
                <div className="w-1/3 m-4">
                    <Image
                        src={factura}
                        alt="Factura"
                        className="w-16 h-16"                    
                    />
                    <h2 className=" font-semibold mt-2 text-xl">Facturas rapidas </h2>
                    <p>Gracias al sistema POS tu negocio generara facturas rapidas y faciles</p>
                </div>
                <div className="w-1/3 m-4">
                    <Image
                        src={recompensa}
                        alt="Recompensa"
                        className="w-16 h-16"                    
                    />
                    <h2 className=" font-semibold mt-2 text-xl">Excelente precio</h2>
                    <p>Con nuestros planes podras adquirir tu sistema POS a buen precio sin importar el tamaño de tu tienda</p>
                </div>
                <div className="w-1/3 m-4">
                    <Image
                        src={aprobado}
                        alt="Aprobado"
                        className="w-16 h-16"                    
                    />
                    <h2 className=" font-semibold mt-2 text-xl">Facil administracion </h2>
                    <p>Es facil aprender a usar el sistema POS aunque sea la primera vez que lo usas </p>
                </div>
                
            </div>

            <section id="servicePlans" className="my-8  ">
                <h2 className="text-4xl font-semibold text-center mb-8">{t('servicePlans')}</h2>
                <div className="flex flex-wrap justify-center mt-4">
                    <ServiceCard title={t('basicPlan.title')} description={t('basicPlan.description')} price={15900} />
                    <ServiceCard title={t('intermediatePlan.title')} description={t('intermediatePlan.description')} price={29900} />
                    <ServiceCard title={t('advancedPlan.title')} description={t('advancedPlan.description')} price={49900} />
                </div>
            </section>

            <section className="my-8">
                <h2 className="text-2xl font-semibold text-center">{t('clientTestimonials')}</h2>
                <div className="flex flex-wrap justify-center mt-4">
                    <div className="max-w-sm rounded overflow-hidden shadow-lg m-4">
                        <div className="px-6 py-4">
                            <p className="text-gray-700 text-base">{t('testimonial1')}</p>
                        </div>
                    </div>
                    <div className="max-w-sm rounded overflow-hidden shadow-lg m-4">
                        <div className="px-6 py-4">
                            <p className="text-gray-700 text-base">{t('testimonial2')}</p>
                        </div>
                    </div>
                    <div className="max-w-sm rounded overflow-hidden shadow-lg m-4">
                        <div className="px-6 py-4">
                            <p className="text-gray-700 text-base">{t('testimonial3')}</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="my-8">
                <h2 className="text-2xl font-semibold text-center">{t('recommendedBy')}</h2>
                <div className="flex flex-wrap justify-center mt-4">
                    <Image src={empresa1} alt="Empresa Fruver Market" className="mx-4" width={128} />
                    <Image src={empresa2} alt="Empresa Maxi Fruver" className="mx-4" width={128} />
                    <Image src={empresa3} alt="Empresa Caribe Supermercados" className="mx-4" width={128} />
                </div>
            </section>
        </div>
    );
}