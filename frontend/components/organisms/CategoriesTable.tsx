'use client'
import { Tr, Th, Td } from "@/components";
import { buttonTable } from "@/components/tokens";
import { useTranslations } from "next-intl";
import { services } from "@/services/api";
import { useEffect, useState } from "react";
import { Category } from "@/services/api/category";
import { showAlert } from "@/components/atoms/Alert";
import { DeleteCategoryModal } from "../molecules/DeleteCategoryModal";

interface CategoriesTableProps {
    refreshTrigger?: boolean;
    onCategorySelect?: (categoryId: number) => void;
}

export function CategoriesTable({ refreshTrigger, onCategorySelect }: CategoriesTableProps) {
    const [categories, setCategories] = useState<Category[]>([]);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

    useEffect(() => {
        loadCategories();
    }, [refreshTrigger]);

    const loadCategories = async () => {
        try {
            const data = await services.category.getAll();
            setCategories(data);
        } catch (error) {
            showAlert({
                type: 'error',
                message: 'Error al cargar las categorías'
            });
        }
    };

    const handleDeleteClick = (category: Category) => {
        setSelectedCategory(category);
        setIsDeleteModalOpen(true);
    };

    const handleDeleteConfirm = async () => {
        if (!selectedCategory) return;

        try {
            await services.category.delete(selectedCategory.id);
            showAlert({
                type: 'success',
                message: 'Categoría eliminada exitosamente'
            });
            loadCategories();
            setIsDeleteModalOpen(false);
            setSelectedCategory(null);
        } catch (error: any) {
            showAlert({
                type: 'error',
                message: error.response?.data?.detail || 'Error al eliminar categoría'
            });
        }
    };

    return (
        <>
            <table className="min-w-full bg-white border border-gray-200">
                <thead>
                    <tr className="bg-black">
                        <Th text="Nombre"></Th>
                        <Th text="Descripción"></Th>
                        <Th text="Acciones"></Th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((category) => (
                        <Tr key={category.id}>
                            <Td>
                                <button 
                                    onClick={() => onCategorySelect?.(category.id)}
                                    className="text-blue-600 hover:text-blue-800"
                                >
                                    {category.name}
                                </button>
                            </Td>
                            <Td>{category.description}</Td>
                            <Td>
                                <button
                                    onClick={() => handleDeleteClick(category)}
                                    className={`text-white bg-red-600 hover:bg-red-700 ${buttonTable}`}
                                >
                                    Eliminar
                                </button>
                            </Td>
                        </Tr>
                    ))}
                </tbody>
            </table>

            <DeleteCategoryModal
                isOpen={isDeleteModalOpen}
                onClose={() => {
                    setIsDeleteModalOpen(false);
                    setSelectedCategory(null);
                }}
                onConfirm={handleDeleteConfirm}
                categoryName={selectedCategory?.name || ''}
            />
        </>
    );
} 