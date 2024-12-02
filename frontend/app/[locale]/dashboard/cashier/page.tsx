'use client';

import { useState, useEffect } from "react";
import Image from "next/image";
import { factura } from "@/public";
import { ButtonPrimary, ButtonSecondary } from "@/components";
import { PermissionAuth } from "@/components";
import { productService, type Product } from "@/services/api/product";
import { saleService, type SaleCreate } from "@/services/api/sale";
import { showAlert } from "@/components/atoms/Alert";

interface CartProduct extends Product {
    quantity: number;
}

export default function Cash() {
    const [products, setProducts] = useState<Product[]>([]);
    const [cartProducts, setCartProducts] = useState<CartProduct[]>([]);
    const [modalType, setModalType] = useState("");
    const [searchValue, setSearchValue] = useState("");
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [foundProduct, setFoundProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        try {
            setLoading(true);
            const data = await productService.getAll(0, 100);
            setProducts(data);
            setFilteredProducts(data);
        } catch (error) {
            showAlert({ message: "Error al cargar los productos", type: "error" });
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddProduct = (product: Product) => {
        setCartProducts(prev => {
            const existingProduct = prev.find(p => p.id === product.id);
            if (existingProduct) {
                return prev.map(p => 
                    p.id === product.id 
                        ? { ...p, quantity: p.quantity + 1 }
                        : p
                );
            }
            return [...prev, { ...product, quantity: 1 }];
        });
        showAlert({ message: `${product.name} añadido al carrito`, type: "success" });
    };

    const handleModalClose = () => {
        setModalType("");
        setSearchValue("");
        setFilteredProducts(products);
        setFoundProduct(null);
    };

    const handleNameSearch = () => {
        const filtered = products.filter((product) =>
            product.name.toLowerCase().includes(searchValue.toLowerCase())
        );

        if (filtered.length > 0) {
            setFilteredProducts(filtered);
            setModalType("resultadoCategoria");
        } else {
            showAlert({ message: "No se encontraron productos", type: "error" });
        }
    };

    const handleCategorySearch = async () => {
        try {
            setLoading(true);
            // Assuming we have categories loaded somewhere
            // For now, we'll just filter by category name in the products
            const filtered = products.filter((product) =>
                product.description.toLowerCase().includes(searchValue.toLowerCase())
            );

            if (filtered.length > 0) {
                setFilteredProducts(filtered);
                setModalType("resultadoCategoria");
            } else {
                showAlert({ message: "No se encontraron productos en esta categoría", type: "error" });
            }
        } catch (error) {
            showAlert({ message: "Error al buscar productos", type: "error" });
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleCompleteSale = async () => {
        if (cartProducts.length === 0) {
            showAlert({ message: "El carrito está vacío", type: "error" });
            return;
        }

        try {
            setLoading(true);
            const saleData: SaleCreate = {
                products: cartProducts.map(product => ({
                    product_id: product.id,
                    quantity: product.quantity,
                    price: product.public_price
                }))
            };

            await saleService.create(saleData);
            showAlert({ message: "Venta realizada con éxito", type: "success" });
            setCartProducts([]);
            handleModalClose();
        } catch (error) {
            showAlert({ message: "Error al procesar la venta", type: "error" });
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const calculateTotal = () => {
        return cartProducts.reduce((total, product) => 
            total + (product.public_price * product.quantity), 0
        );
    };

    return (
        <PermissionAuth requiredPermission="GESTIONAR_VENTAS">
            <div className="w-full h-screen flex p-4">
                {/* Contenedor de productos */}
                <div className="flex-grow grid grid-cols-4 gap-4 overflow-y-auto h-4/5 bg-cyan-800 p-6 rounded-md">
                    {loading ? (
                        <div className="col-span-4 flex justify-center items-center">
                            <p className="text-white">Cargando productos...</p>
                        </div>
                    ) : (
                        products.map((product) => (
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
                                <p className="text-gray-600">${product.public_price}</p>
                                <p className="text-gray-500">Stock: {product.stock}</p>
                                <ButtonPrimary
                                    text="Añadir Producto"
                                    onClick={() => handleAddProduct(product)}
                                    disabled={product.stock <= 0}
                                />
                            </div>
                        ))
                    )}
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
                        disabled={cartProducts.length === 0}
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

                            {/* Modal de resultados de búsqueda */}
                            {modalType === "resultadoCategoria" && (
                                <>
                                    <h2 className="text-lg text-black font-bold mb-4">
                                        Productos Encontrados
                                    </h2>
                                    <div className="max-h-96 overflow-y-auto">
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
                                                        <p>${product.public_price}</p>
                                                        <p>Stock: {product.stock}</p>
                                                    </div>
                                                    <ButtonPrimary
                                                        text="Añadir"
                                                        onClick={() =>
                                                            handleAddProduct(product)
                                                        }
                                                        disabled={product.stock <= 0}
                                                    />
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
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
                                    <div className="max-h-96 overflow-y-auto">
                                        <ul className="space-y-2">
                                            {cartProducts.map((product) => (
                                                <li
                                                    key={product.id}
                                                    className="flex justify-between border-b py-2 text-black"
                                                >
                                                    <div>
                                                        <p className="font-bold">
                                                            {product.name}
                                                        </p>
                                                        <p>${product.public_price} x {product.quantity}</p>
                                                        <p className="font-semibold">
                                                            Total: ${product.public_price * product.quantity}
                                                        </p>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="mt-4 border-t pt-4">
                                        <p className="text-xl font-bold text-black">
                                            Total: ${calculateTotal()}
                                        </p>
                                    </div>
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
                                        Confirmar Pago
                                    </h2>
                                    <p className="text-black mb-4">
                                        Total a pagar: ${calculateTotal()}
                                    </p>
                                    <div className="flex flex-col space-y-4">
                                        <ButtonPrimary 
                                            text="Confirmar Venta" 
                                            onClick={handleCompleteSale}
                                            disabled={loading}
                                        />
                                    </div>
                                    <div className="flex justify-end mt-4">
                                        <ButtonSecondary
                                            text="Cancelar"
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
