'use client';
import { useState } from "react";
import { ButtonSecondary } from "@/components";
import { PermissionAuth } from "@/components";
import { CategoriesTable } from "@/components/organisms/CategoriesTable";
import { ProductsTable } from "@/components/organisms/ProductsTable";
import { AddCategoryModal } from "@/components/molecules/AddCategoryModal";
import { AddProductModal } from "@/components/molecules/AddProductModal";

export default function InventoryPage() {
    const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
    const [isProductModalOpen, setIsProductModalOpen] = useState(false);
    const [shouldRefreshCategories, setShouldRefreshCategories] = useState(false);
    const [shouldRefreshProducts, setShouldRefreshProducts] = useState(false);
    const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);

    const handleRefreshCategories = () => {
        setShouldRefreshCategories(prev => !prev);
    };

    const handleRefreshProducts = () => {
        setShouldRefreshProducts(prev => !prev);
    };

    const handleCategorySelect = (categoryId: number) => {
        setSelectedCategoryId(categoryId);
    };

    return (
        <PermissionAuth requiredPermission="GESTIONAR_INVENTARIO">
            <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-3xl font-bold text-black">Gestionar Inventario</h1>
                    <div className="space-x-2">
                        <ButtonSecondary 
                            text="Agregar Categoría" 
                            onClick={() => setIsCategoryModalOpen(true)}
                        />
                        {selectedCategoryId && (
                            <ButtonSecondary 
                                text="Agregar Producto" 
                                onClick={() => setIsProductModalOpen(true)}
                            />
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Panel de Categorías */}
                    <div className="bg-white p-4 rounded-lg shadow">
                        <h2 className="text-xl font-bold mb-4">Categorías</h2>
                        <div className="overflow-x-auto">
                            <CategoriesTable 
                                refreshTrigger={shouldRefreshCategories}
                                onCategorySelect={handleCategorySelect}
                            />
                        </div>
                    </div>

                    {/* Panel de Productos */}
                    <div className="bg-white p-4 rounded-lg shadow">
                        <h2 className="text-xl font-bold mb-4">Productos</h2>
                        {selectedCategoryId ? (
                            <ProductsTable 
                                categoryId={selectedCategoryId}
                                refreshTrigger={shouldRefreshProducts}
                            />
                        ) : (
                            <p className="text-gray-500 text-center py-4">
                                Selecciona una categoría para ver sus productos
                            </p>
                        )}
                    </div>
                </div>

                <AddCategoryModal 
                    isOpen={isCategoryModalOpen}
                    onClose={() => setIsCategoryModalOpen(false)}
                    onSuccess={handleRefreshCategories}
                />

                <AddProductModal 
                    isOpen={isProductModalOpen}
                    onClose={() => setIsProductModalOpen(false)}
                    onSuccess={handleRefreshProducts}
                    selectedCategoryId={selectedCategoryId || undefined}
                />
            </div>
        </PermissionAuth>
    );
}