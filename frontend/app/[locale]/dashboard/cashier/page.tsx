import { Metadata } from "next";
import Image from "next/image";
import { factura } from "@/public";
import { ButtonPrimary, ButtonSecondary } from "@/components";
import { buttonPrimary } from '../../../../components/tokens';

export const metadata: Metadata = {
    title: "Cash Management",
    description: "Manage the cash in your store.",
};

export default function Cash() {
    const products = [
        { id: 1, name: "Producto 1", price: "$10", image: "/path-to-image1.jpg" },
        { id: 2, name: "Producto 2", price: "$15", image: "/path-to-image2.jpg" },
        { id: 3, name: "Producto 3", price: "$20", image: "/path-to-image3.jpg" },
        { id: 4, name: "Producto 4", price: "$25", image: "/path-to-image4.jpg" },
        { id: 5, name: "Producto 5", price: "$30", image: "/path-to-image5.jpg" },
        { id: 6, name: "Producto 6", price: "$35", image: "/path-to-image6.jpg" },
        { id: 7, name: "Producto 7", price: "$40", image: "/path-to-image7.jpg" },
        { id: 8, name: "Producto 8", price: "$45", image: "/path-to-image8.jpg" },
        { id: 9, name: "Producto 9", price: "$50", image: "/path-to-image9.jpg" },
        { id: 10, name: "Producto 10", price: "$55", image: "/path-to-image10.jpg" },
        { id: 11, name: "Producto 11", price: "$60", image: "/path-to-image11.jpg" },
        { id: 12, name: "Producto 12", price: "$65", image: "/path-to-image12.jpg" },
        { id: 13, name: "Producto 13", price: "$70", image: "/path-to-image13.jpg" },
        { id: 14, name: "Producto 14", price: "$75", image: "/path-to-image14.jpg" },
        { id: 15, name: "Producto 15", price: "$80", image: "/path-to-image15.jpg" },
        { id: 16, name: "Producto 16", price: "$85", image: "/path-to-image16.jpg" },
        { id: 17, name: "Producto 17", price: "$90", image: "/path-to-image17.jpg" },
        { id: 18, name: "Producto 18", price: "$95", image: "/path-to-image18.jpg" },
        { id: 19, name: "Producto 19", price: "$100", image: "/path-to-image19.jpg" },
        { id: 20, name: "Producto 20", price: "$105", image: "/path-to-image20.jpg" },
    ];

    return (
        <div className="w-full h-screen flex p-4">
            <div className="flex-grow grid grid-cols-4 gap-4 overflow-y-auto h-4/5 bg-cyan-800 p-6 rounded-md">
                {products.map((product) => (
                    <div key={product.id} className="border p-4 flex flex-col items-center bg-white rounded shadow-md">
                        <Image
                            src={factura}
                            alt="Factura"
                            className="w-16 h-16"
                        />
                        <h2 className="mt-2 text-lg text-black font-bold">{product.name}</h2>
                        <p className="text-gray-600 m-1">{product.price}</p>
                        <ButtonPrimary text="Añadir Producto" />
                    </div>
                ))}
            </div>

            <div className="flex flex-col space-y-4 ml-4 w-1/6 mt-5 justify-start">
                <ButtonSecondary text="Buscar por nombre" />
                <ButtonSecondary text="Buscar por categoria" />
                <ButtonSecondary text="Resumen venta" />
                <ButtonSecondary text="Eliminar producto" />
                <ButtonSecondary text="Pagar" />
            </div>
        </div>
    );
}
