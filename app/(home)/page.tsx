import { Metadata } from "next";

import { backgroundLandingImage, empresa1, empresa2, empresa3 } from "@/public";
import { ServiceCard } from "@/components";
import Image from "next/image";

export const metadata: Metadata = {
    title: "Home of My Market Management",
    description: "Welcome to my market management app",
}



export default function LandingPage() {
    return (
        <div className="container mx-auto p-4 text-black">
            <header className="relative text-center my-8">
                <Image src={backgroundLandingImage} alt="Background Image" className="w-full h-96 rounded-2xl object-cover opacity-50" />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <h1 className="text-4xl font-bold text-black">POSCO</h1>
                    <p className="text-xl mt-2 text-black">Sistemas POS para todo tipo de supermercados y tiendas</p>
                </div>
            </header>

            <section className="my-8 text-center">
                <h2 className="text-2xl font-semibold">Sobre Nosotros</h2>
                <p className="mt-2 max-w-2xl mx-auto">POSCO se especializa en la venta de sistemas POS (Point of Sale). Ofrecemos un servicio SASS con diferentes planes adaptados a las necesidades de supermercados y tiendas de todos los tamaños.</p>
            </section>

            <section className="my-8">
                <h2 className="text-2xl font-semibold text-center">Planes de Servicio</h2>
                <div className="flex flex-wrap justify-center mt-4">
                    <ServiceCard title="Plan Básico" description="Ideal para pequeñas tiendas." price={15900} />
                    <ServiceCard title="Plan Intermedio" description="Perfecto para supermercados medianos." price={29900} />
                    <ServiceCard title="Plan Avanzado" description="Diseñado para grandes cadenas de supermercados." price={49900} />
                </div>
            </section>

            <section className="my-8">
                <h2 className="text-2xl font-semibold text-center">Opiniones de Clientes</h2>
                <div className="flex flex-wrap justify-center mt-4">
                    <div className="max-w-sm rounded overflow-hidden shadow-lg m-4">
                        <div className="px-6 py-4">
                            <p className="text-gray-700 text-base">"POSCO ha transformado la manera en que manejamos nuestras ventas." - Cliente A</p>
                        </div>
                    </div>
                    <div className="max-w-sm rounded overflow-hidden shadow-lg m-4">
                        <div className="px-6 py-4">
                            <p className="text-gray-700 text-base">"El mejor sistema POS que hemos utilizado." - Cliente B</p>
                        </div>
                    </div>
                    <div className="max-w-sm rounded overflow-hidden shadow-lg m-4">
                        <div className="px-6 py-4">
                            <p className="text-gray-700 text-base">"Excelente servicio y soporte." - Cliente C</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="my-8">
                <h2 className="text-2xl font-semibold text-center">Empresas que nos recomiendan</h2>
                <div className="flex flex-wrap justify-center mt-4">
                    <Image src={empresa1} alt="Empresa Fruver Market" className="mx-4" width='128'/>
                    <Image src={empresa2} alt="Empresa Maxi Fruver" className="mx-4" width='128'/>
                    <Image src={empresa3} alt="Empresa Caribe Supermercados" className="mx-4" width='128'/>
                </div>
            </section>
        </div>
    );
}