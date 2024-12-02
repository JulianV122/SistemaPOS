'use client'
import { Tr, Th, Td } from "@/components";
import { buttonTable } from "@/components/tokens";
import { services } from "@/services/api";
import { useEffect, useState } from "react";
import { Product } from "@/services/api/product";
import { showAlert } from "@/components/atoms/Alert";
import { DeleteProductModal } from "../molecules/DeleteProductModal";

interface ProductsTableProps {
    categoryId: number;
    refreshTrigger?: boolean;
}

export function ProductsTable({ categoryId, refreshTrigger }: ProductsTableProps) {
    const [products, setProducts] = useState<Product[]>([]);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (categoryId) {
            loadProducts();
        }
    }, [categoryId, refreshTrigger]);

    const loadProducts = async () => {
        try {
            setIsLoading(true);
            const data = await services.product.getByCategory(categoryId);
            setProducts(data);
        } catch (error) {
            showAlert({
                type: 'error',
                message: 'Error al cargar los productos'
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteClick = (product: Product) => {
        setSelectedProduct(product);
        setIsDeleteModalOpen(true);
    };

    const handleDeleteConfirm = async () => {
        if (!selectedProduct) return;

        try {
            await services.product.delete(selectedProduct.id);
            showAlert({
                type: 'success',
                message: 'Producto eliminado exitosamente'
            });
            loadProducts();
            setIsDeleteModalOpen(false);
            setSelectedProduct(null);
        } catch (error: any) {
            showAlert({
                type: 'error',
                message: error.response?.data?.detail || 'Error al eliminar producto'
            });
        }
    };

    if (isLoading) {
        return <div className="text-center py-4">Cargando productos...</div>;
    }

    if (products.length === 0) {
        return <div className="text-center py-4 text-gray-500">No hay productos en esta categoría</div>;
    }

    return (
        <>
            <table className="min-w-full bg-white border border-gray-200">
                <thead>
                    <tr className="bg-black">
                        <Th text="Código"></Th>
                        <Th text="Nombre"></Th>
                        <Th text="Stock"></Th>
                        <Th text="Precio"></Th>
                        <Th text="Estado"></Th>
                        <Th text="Acciones"></Th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <Tr key={product.id}>
                            <Td>{product.bar_code}</Td>
                            <Td>{product.name}</Td>
                            <Td>{product.stock}</Td>
                            <Td>${product.public_price.toLocaleString()}</Td>
                            <Td>
                                <span className={`px-2 py-1 rounded-full text-xs ${
                                    product.status 
                                        ? 'bg-green-100 text-green-800' 
                                        : 'bg-red-100 text-red-800'
                                }`}>
                                    {product.status ? 'Activo' : 'Inactivo'}
                                </span>
                            </Td>
                            <Td>
                                <button
                                    onClick={() => handleDeleteClick(product)}
                                    className={`text-white bg-red-600 hover:bg-red-700 ${buttonTable}`}
                                >
                                    Eliminar
                                </button>
                            </Td>
                        </Tr>
                    ))}
                </tbody>
            </table>

            <DeleteProductModal
                isOpen={isDeleteModalOpen}
                onClose={() => {
                    setIsDeleteModalOpen(false);
                    setSelectedProduct(null);
                }}
                onConfirm={handleDeleteConfirm}
                productName={selectedProduct?.name || ''}
            />
        </>
    );
} 