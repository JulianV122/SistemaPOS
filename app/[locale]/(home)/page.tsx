import { Metadata } from "next";
import { useTranslations } from 'next-intl';
import { backgroundLandingImage, empresa1, empresa2, empresa3 } from "@/public";
import { ServiceCard } from "@/components";
import Image from "next/image";

export const metadata: Metadata = {
    title: "Home of My Market Management",
    description: "Welcome to my market management app",
}



export default function LandingPage() {
    const t = useTranslations('LandingPage');
    return (
        <div className="container mx-auto p-4 text-black">
            <header className="relative text-center my-8">
                <Image src={backgroundLandingImage} alt="Background Image" className="w-full h-96 rounded-2xl object-cover opacity-50" />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <h1 className="text-4xl font-bold text-black">POSCO</h1>
                    <p className="text-xl mt-2 text-black">{t('subtitle')}</p>
                </div>
            </header>
            <section className="my-8 text-center">
                <h2 className="text-2xl font-semibold">{t('welcome')}</h2>
                <p className="mt-2 max-w-2xl mx-auto">{t('description')}</p>
            </section>

            <section className="my-8">
                <h2 className="text-2xl font-semibold text-center">{t('servicePlans')}</h2>
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