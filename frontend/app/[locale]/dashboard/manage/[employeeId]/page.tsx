'use client'
import { useParams } from "next/navigation"
import Link from "next/link"
import { ButtonPrimary, Loader } from "@/components"
import { PermissionAuth } from "@/components"
import { useEffect, useState } from "react"
import { services } from "@/services/api"

export default function Employee() {
    const { employeeId } = useParams();
    const [employee, setEmployee] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const data = await services.employee.getById(Number(employeeId));
                setEmployee(data);
                setLoading(false);
            } catch (error) {
                console.error('Error al obtener empleado:', error);
                setLoading(false);
            }
        };

        fetchEmployee();
    }, [employeeId]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <Loader size="lg" />
            </div>
        );
    }

    if (!employee) {
        return <div className="text-center p-4">Empleado no encontrado</div>;
    }

    return (
        <PermissionAuth requiredPermission="GESTIONAR_EMPLEADOS">
            <div className="max-w-4xl mx-auto p-4 text-black">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-black">Detalles del Empleado</h1>
                    <Link href={'./'}><ButtonPrimary text="Volver"/></Link>
                </div>

                {/* Sección de Información Personal */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Información Personal</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-gray-600">Nombre completo</p>
                            <p className="font-medium">{employee.name} {employee.lastname}</p>
                        </div>
                        <div>
                            <p className="text-gray-600">Código</p>
                            <p className="font-medium">{employee.code}</p>
                        </div>
                        <div>
                            <p className="text-gray-600">Email</p>
                            <p className="font-medium">{employee.email}</p>
                        </div>
                        <div>
                            <p className="text-gray-600">Teléfono</p>
                            <p className="font-medium">{employee.telephone}</p>
                        </div>
                    </div>
                </div>

                {/* Sección de Rol y Permisos */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Rol y Permisos</h2>
                    <div className="mb-4">
                        <p className="text-gray-600">Rol</p>
                        <p className="font-medium">{employee.role.name}</p>
                        <p className="text-sm text-gray-500">{employee.role.description}</p>
                    </div>
                    <div>
                        <p className="text-gray-600 mb-2">Permisos</p>
                        <div className="grid grid-cols-2 gap-2">
                            {employee.role.permissions.map((permission: any) => (
                                <div key={permission.id} className="bg-gray-100 rounded p-2">
                                    <p className="font-medium">{permission.name}</p>
                                    <p className="text-sm text-gray-500">{permission.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Sección de Empresa */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Información de la Empresa</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-gray-600">Nombre de la Empresa</p>
                            <p className="font-medium">{employee.enterprise.name}</p>
                        </div>
                        <div>
                            <p className="text-gray-600">NIT</p>
                            <p className="font-medium">{employee.enterprise.NIT}</p>
                        </div>
                    </div>
                </div>
            </div>
        </PermissionAuth>
    )
}
