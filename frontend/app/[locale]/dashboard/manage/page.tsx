'use client';
import { useState } from "react";
import { EmployeesTable } from "@/components";
import { ButtonSecondary } from "@/components";
import { PermissionAuth } from "@/components";
import { AddEmployeeModal } from "@/components/molecules/AddEmployeeModal";
import { showAlert } from '@/components/atoms/Alert';

export default function manage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [shouldRefreshTable, setShouldRefreshTable] = useState(false);

    const handleRefreshTable = () => {
        setShouldRefreshTable(prev => !prev);
        showAlert({
            type: 'success',
            message: 'Empleado agregado correctamente'
        });
    };

    return (
        <PermissionAuth requiredPermission="GESTIONAR_EMPLEADOS">
            <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-3xl font-bold text-black">Gestionar empleados</h1>
                    <ButtonSecondary 
                        text="Agregar Empleado" 
                        onClick={() => setIsModalOpen(true)}
                    />
                </div>
                <br />
                <div className="overflow-x-auto">
                    <EmployeesTable refreshTrigger={shouldRefreshTable} />
                </div>
                <AddEmployeeModal 
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSuccess={handleRefreshTable}
                />
            </div>
        </PermissionAuth>
    );
}
