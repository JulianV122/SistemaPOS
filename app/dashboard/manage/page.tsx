import { Metadata } from "next";
import { EmployeesTable } from "@/components";
import { ButtonSecondary } from "@/components";
import { PermissionAuth } from "@/components"; 

export const metadata: Metadata = {
    title: "Manage the employees",
    description: "Manage the employees in your store.",
}

export default function manage() {
    return (
        <PermissionAuth requiredPermission="GESTIONAR_EMPLEADOS"> 
        <div className="p-4">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-3xl font-bold text-black">Gestionar empleados</h1>
                <ButtonSecondary text="Agregar Empleado"></ButtonSecondary>
            </div>
            <br/>
            <div className="overflow-x-auto">
                <EmployeesTable />
            </div>
            <div className="flex justify-between items-center mt-4">
                <span className="text-black">Mostrando registros del 1 al 8 de un total de 10 registros</span>
                <div>
                    <button className="bg-gray-300 text-gray-700 px-3 py-1 rounded-l hover:bg-gray-400">Anterior</button>
                    <button className="bg-gray-300 text-gray-700 px-3 py-1 rounded-r hover:bg-gray-400">Siguiente</button>
                </div>
            </div>
        </div>
        </PermissionAuth>
    );
}