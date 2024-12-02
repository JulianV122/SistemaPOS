'use client';
import { useState } from "react";
import { ButtonSecondary } from "@/components";
import { PermissionAuth } from "@/components";
import { SuppliersTable } from "@/components/organisms/SuppliersTable";
import { AddSupplierModal } from "@/components/molecules/AddSupplierModal";

export default function SuppliersPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [shouldRefreshTable, setShouldRefreshTable] = useState(false);

    const handleRefreshTable = () => {
        setShouldRefreshTable(prev => !prev);
    };

    return (
        <PermissionAuth requiredPermission="GESTIONAR_INVENTARIO">
            <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-3xl font-bold text-black">Gestionar Proveedores</h1>
                    <ButtonSecondary 
                        text="Agregar Proveedor" 
                        onClick={() => setIsModalOpen(true)}
                    />
                </div>
                <br />
                <div className="overflow-x-auto">
                    <SuppliersTable refreshTrigger={shouldRefreshTable} />
                </div>
                <AddSupplierModal 
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSuccess={handleRefreshTable}
                />
            </div>
        </PermissionAuth>
    );
} 