'use client';

import { useState } from "react";
import Image from "next/image";
import { factura } from "@/public";
import { ButtonPrimary, ButtonSecondary } from "@/components";
import { PermissionAuth } from "@/components";


export default function Cash() {
    const products = [
        { id: 1, name: "Producto 1", price: "$10", category: "Electrónica" },
        { id: 2, name: "Producto 2", price: "$15", category: "Hogar" },
        { id: 3, name: "Producto 3", price: "$20", category: "Electrónica" },
        { id: 4, name: "Producto 4", price: "$25", category: "Ropa" },
        { id: 5, name: "Producto 5", price: "$30", category: "Hogar" },
        { id: 6, name: "Producto 6", price: "$35", category: "Electrónica" },
        { id: 7, name: "Producto 7", price: "$40", category: "Ropa" },
        { id: 8, name: "Producto 8", price: "$45", category: "Hogar" },
        { id: 9, name: "Producto 9", price: "$50", category: "Electrónica" },
        { id: 10, name: "Producto 10", price: "$55", category: "Ropa" },
        { id: 11, name: "Producto 11", price: "$60", category: "Hogar" },
        { id: 12, name: "Producto 12", price: "$65", category: "Electrónica" },
    ];

    const [addedProducts, setAddedProducts] = useState<
        { id: number; name: string; price: string; category: string }[]
    >([]);
    const [modalType, setModalType] = useState("");
    const [searchValue, setSearchValue] = useState("");
    const [filteredProducts, setFilteredProducts] = useState(products);
    const [foundProduct, setFoundProduct] = useState<
        { id: number; name: string; price: string; category: string } | null
    >(null);

    const handleAddProduct = (product: { id: number; name: string; price: string; category: string }) => {
        setAddedProducts([...addedProducts, product]);
    };

    const handleModalClose = () => {
        setModalType("");
        setSearchValue("");
        setFilteredProducts(products);
        setFoundProduct(null);
    };

    const handleNameSearch = () => {
        const filtered = products.find((product) =>
            product.name.toLowerCase() === searchValue.toLowerCase()
        );

        if (filtered) {
            setFoundProduct(filtered);
            setModalType("resultadoBusqueda"); // Cambia al modal de resultado
        } else {
            alert("Producto no encontrado");
        }
    };

    const handleCategorySearch = () => {
        const filtered = products.filter((product) =>
            product.category.toLowerCase().includes(searchValue.toLowerCase())
        );

        if (filtered.length > 0) {
            setFilteredProducts(filtered);
            setModalType("resultadoCategoria");
        } else {
            alert("No se encontraron productos en esta categoría");
        }
    };

    return (
        <PermissionAuth requiredPermission="GESTIONAR_VENTAS">
            <div className="w-full h-screen flex p-4">
                {/* Contenedor de productos */}
                <div className="flex-grow grid grid-cols-4 gap-4 overflow-y-auto h-4/5 bg-cyan-800 p-6 rounded-md">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="border p-4 flex flex-col items-center bg-white rounded shadow-md"
                        >
                            <Image
                                src={factura}
                                alt="Factura"
                                className="w-16 h-16"
                            />
                            <h2 className="mt-2 text-lg text-black font-bold">
                                {product.name}
                            </h2>
                            <p className="text-gray-600">{product.price}</p>
                            <p className="text-gray-500">{product.category}</p>
                            <ButtonPrimary
                                text="Añadir Producto"
                                onClick={() => handleAddProduct(product)}
                            />
                        </div>
                    ))}
                </div>
                {/* Contenedor de botones */}
                <div className="flex flex-col space-y-4 ml-4 w-1/6 mt-5 justify-start">
                    <ButtonSecondary
                        text="Buscar por nombre"
                        onClick={() => setModalType("buscarNombre")}
                    />
                    <ButtonSecondary
                        text="Buscar por categoría"
                        onClick={() => setModalType("buscarCategoria")}
                    />
                    <ButtonSecondary
                        text="Resumen venta"
                        onClick={() => setModalType("resumenVenta")}
                    />
                    <ButtonSecondary
                        text="Pagar"
                        onClick={() => setModalType("pagar")}
                    />
                </div>

                {/* Modal */}
                {modalType && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                            {/* Modal de buscar por nombre */}
                            {modalType === "buscarNombre" && (
                                <>
                                    <h2 className="text-lg text-black font-bold mb-4">
                                        Buscar por Nombre
                                    </h2>
                                    <input
                                        type="text"
                                        placeholder="Ingresa un nombre"
                                        className="border rounded w-full p-2 mb-4 text-black"
                                        value={searchValue}
                                        onChange={(e) =>
                                            setSearchValue(e.target.value)
                                        }
                                    />
                                    <div className="flex justify-end space-x-4">
                                        <ButtonSecondary
                                            text="Salir"
                                            onClick={handleModalClose}
                                        />
                                        <ButtonPrimary
                                            text="Buscar"
                                            onClick={handleNameSearch}
                                        />
                                    </div>
                                </>
                            )}

                            {/* Modal de buscar por categoría */}
                            {modalType === "buscarCategoria" && (
                                <>
                                    <h2 className="text-lg text-black font-bold mb-4">
                                        Buscar por Categoría
                                    </h2>
                                    <input
                                        type="text"
                                        placeholder="Ingresa una categoría"
                                        className="border rounded w-full p-2 mb-4 text-black"
                                        value={searchValue}
                                        onChange={(e) =>
                                            setSearchValue(e.target.value)
                                        }
                                    />
                                    <div className="flex justify-end space-x-4">
                                        <ButtonSecondary
                                            text="Salir"
                                            onClick={handleModalClose}
                                        />
                                        <ButtonPrimary
                                            text="Buscar"
                                            onClick={handleCategorySearch}
                                        />
                                    </div>
                                </>
                            )}

                            {/* Modal de resultado de búsqueda por nombre */}
                            {modalType === "resultadoBusqueda" && foundProduct && (
                                <>
                                    <h2 className="text-lg text-black font-bold mb-4">
                                        Producto Encontrado
                                    </h2>
                                    <div className="border p-4 flex flex-col items-center bg-gray-100 rounded shadow-md">
                                        <Image
                                            src={factura}
                                            alt="Factura"
                                            className="w-16 h-16"
                                        />
                                        <h2 className="mt-2 text-lg text-black font-bold">
                                            {foundProduct.name}
                                        </h2>
                                        <p className="text-gray-600">
                                            {foundProduct.price}
                                        </p>
                                        <p className="text-gray-500">
                                            {foundProduct.category}
                                        </p>
                                        <ButtonPrimary
                                            text="Añadir Producto"
                                            onClick={() => handleAddProduct(foundProduct)}
                                        />
                                    </div>
                                    <div className="flex justify-end mt-4">
                                        <ButtonSecondary
                                            text="Cerrar"
                                            onClick={handleModalClose}
                                        />
                                    </div>
                                </>
                            )}

                            {/* Modal de resultados por categoría */}
                            {modalType === "resultadoCategoria" && (
                                <>
                                    <h2 className="text-lg text-black font-bold mb-4">
                                        Productos por Categoría
                                    </h2>
                                    <ul className="space-y-2">
                                        {filteredProducts.map((product) => (
                                            <li
                                                key={product.id}
                                                className="flex justify-between items-center border-b py-2 text-black"
                                            >
                                                <div>
                                                    <p className="font-bold">
                                                        {product.name}
                                                    </p>
                                                    <p>{product.price}</p>
                                                </div>
                                                <ButtonPrimary
                                                    text="Añadir"
                                                    onClick={() =>
                                                        handleAddProduct(product)
                                                    }
                                                />
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="flex justify-end mt-4">
                                        <ButtonSecondary
                                            text="Cerrar"
                                            onClick={handleModalClose}
                                        />
                                    </div>
                                </>
                            )}

                            {/* Modal de resumen de venta */}
                            {modalType === "resumenVenta" && (
                                <>
                                    <h2 className="text-lg text-black font-bold mb-4">
                                        Resumen de Venta
                                    </h2>
                                    <ul className="space-y-2">
                                        {addedProducts.map((product, index) => (
                                            <li
                                                key={index}
                                                className="flex justify-between border-b py-2 text-black"
                                            >
                                                <div>
                                                    <p className="font-bold">
                                                        {product.name}
                                                    </p>
                                                    <p>{product.price}</p>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="flex justify-end mt-4">
                                        <ButtonSecondary
                                            text="Cerrar"
                                            onClick={handleModalClose}
                                        />
                                    </div>
                                </>
                            )}

                            {/* Modal de pagar */}
                            {modalType === "pagar" && (
                                <>
                                    <h2 className="text-lg text-black font-bold mb-4">
                                        Opciones de Pago
                                    </h2>
                                    <div className="flex flex-col space-y-4">
                                        <ButtonPrimary text="Efectivo" />
                                        <ButtonPrimary text="Pago con Tarjeta" />
                                    </div>
                                    <div className="flex justify-end mt-4">
                                        <ButtonSecondary
                                            text="Cerrar"
                                            onClick={handleModalClose}
                                        />
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </PermissionAuth>
    );
}
