'use client'
import { Tr, Th, Td } from "@/components";
import { buttonTable } from "@/components/tokens";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { services } from "@/services/api";
import { useEffect, useState } from "react";
import { Supplier } from "@/services/api/supplier";
import { showAlert } from "@/components/atoms/Alert";
import { DeleteSupplierModal } from "@/components/molecules/DeleteSupplierModal";

export function SuppliersTable({ refreshTrigger }: { refreshTrigger?: boolean }) {
    const t = useTranslations('SuppliersTable');
    const [suppliers, setSuppliers] = useState<Supplier[]>([]);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);

    useEffect(() => {
        loadSuppliers();
    }, [refreshTrigger]);

    const loadSuppliers = async () => {
        try {
            const data = await services.supplier.getAll();
            setSuppliers(data);
        } catch (error) {
            showAlert({
                type: 'error',
                message: 'Error al cargar los proveedores'
            });
        }
    };

    const handleDeleteClick = (supplier: Supplier) => {
        setSelectedSupplier(supplier);
        setIsDeleteModalOpen(true);
    };

    const handleDeleteConfirm = async () => {
        if (!selectedSupplier) return;

        try {
            await services.supplier.delete(selectedSupplier.id);
            showAlert({
                type: 'success',
                message: 'Proveedor eliminado exitosamente'
            });
            loadSuppliers();
            setIsDeleteModalOpen(false);
            setSelectedSupplier(null);
        } catch (error: any) {
            showAlert({
                type: 'error',
                message: error.response?.data?.detail || 'Error al eliminar proveedor'
            });
        }
    };

    return (
        <>
            <table className="min-w-full bg-white border border-gray-200">
                <thead>
                    <tr className="bg-black">
                        <Th text="NIT"></Th>
                        <Th text="Nombre"></Th>
                        <Th text="Email"></Th>
                        <Th text="Teléfono"></Th>
                        <Th text="Acciones"></Th>
                    </tr>
                </thead>
                <tbody>
                    {suppliers.map((supplier) => (
                        <Tr key={supplier.id}>
                            <Td>{supplier.NIT}</Td>
                            <Td>{supplier.name}</Td>
                            <Td>{supplier.email}</Td>
                            <Td>{supplier.phone_number}</Td>
                            <Td>
                                <button
                                    onClick={() => handleDeleteClick(supplier)}
                                    className={`text-white bg-red-600 hover:bg-red-700 ${buttonTable}`}
                                >
                                    Eliminar
                                </button>
                            </Td>
                        </Tr>
                    ))}
                </tbody>
            </table>

            <DeleteSupplierModal
                isOpen={isDeleteModalOpen}
                onClose={() => {
                    setIsDeleteModalOpen(false);
                    setSelectedSupplier(null);
                }}
                onConfirm={handleDeleteConfirm}
                supplierName={selectedSupplier?.name || ''}
            />
        </>
    );
} 