'use client'
import { Tr, Th, Td } from "@/components";
import { buttonTable } from "@/components/tokens";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { services } from "@/services/api";
import { useEffect, useState } from "react";
import { Employee } from "@/services/api";
import { EditEmployeeModal } from "../molecules/EditEmployeeModal";
import { DeleteEmployeeModal } from "../molecules/DeleteEmployeeModal";
import { showAlert } from "../atoms/Alert";

interface EmployeesTableProps {
    refreshTrigger?: boolean;
}

export function EmployeesTable({ refreshTrigger }: EmployeesTableProps) {
    const t = useTranslations('EmployeesTable');
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    useEffect(() => {
        loadEmployees();
    }, [refreshTrigger]);

    const loadEmployees = async () => {
        try {
            const data = await services.employee.getAll();
            setEmployees(data);
        } catch (error) {
            showAlert({
                type: 'error',
                message: 'Error al cargar los empleados'
            });
        }
    };

    const handleEdit = (employee: Employee) => {
        setSelectedEmployee(employee);
        setIsEditModalOpen(true);
    };

    const handleDelete = (employee: Employee) => {
        setSelectedEmployee(employee);
        setIsDeleteModalOpen(true);
    };

    const handleEditSuccess = () => {
        loadEmployees();
    };

    const handleDeleteConfirm = async () => {
        if (selectedEmployee) {
            try {
                await services.employee.delete(selectedEmployee.id);
                loadEmployees();
                setIsDeleteModalOpen(false);
                setSelectedEmployee(null);
                showAlert({
                    type: 'success',
                    message: 'Empleado eliminado exitosamente'
                });
            } catch (error: any) {
                showAlert({
                    type: 'error',
                    message: error.response?.data?.detail || 'Error al eliminar empleado'
                });
            }
        }
    };

    return (
        <>
            <table className="min-w-full bg-white border border-gray-200">
                <thead>
                    <tr className="bg-black">
                        <Th text={t('header.code')}></Th>
                        <Th text={t('header.name')}></Th>
                        <Th text={t('header.lastName')}></Th>
                        <Th text={t('header.email')}></Th>
                        <Th text={t('header.phone')}></Th>
                        <Th text={t('header.actions')}></Th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee) => (
                        <Tr key={employee.id}>
                            <Td>{employee.code}</Td>
                            <Td>{employee.name}</Td>
                            <Td>{employee.lastname}</Td>
                            <Td>{employee.email}</Td>
                            <Td>{employee.telephone}</Td>
                            <Td>
                                <Link href={`/dashboard/manage/${employee.id}`} className={`text-white bg-violet-700 hover:bg-violet-800 ${buttonTable}`}>{t('detail')}</Link>
                                <button
                                    onClick={() => handleEdit(employee)}
                                    className={`text-white bg-blue-600 hover:bg-blue-700 ${buttonTable}`}
                                >
                                    Editar
                                </button>
                                <button
                                    onClick={() => handleDelete(employee)}
                                    className={`text-white bg-red-600 hover:bg-red-700 ${buttonTable}`}
                                >
                                    Eliminar
                                </button>
                            </Td>
                        </Tr>
                    ))}
                </tbody>
            </table>

            {selectedEmployee && (
                <>
                    <EditEmployeeModal
                        isOpen={isEditModalOpen}
                        onClose={() => setIsEditModalOpen(false)}
                        onSuccess={handleEditSuccess}
                        employeeId={selectedEmployee.id}
                        initialData={{
                            name: selectedEmployee.name,
                            email: selectedEmployee.email,
                            code: selectedEmployee.code,
                            lastname: selectedEmployee.lastname,
                            telephone: selectedEmployee.telephone,
                            role_id: selectedEmployee.role_id,
                            is_active: selectedEmployee.is_active
                        }}
                    />
                    <DeleteEmployeeModal
                        isOpen={isDeleteModalOpen}
                        onClose={() => {
                            setIsDeleteModalOpen(false);
                            setSelectedEmployee(null);
                        }}
                        onConfirm={handleDeleteConfirm}
                        employeeName={`${selectedEmployee.name} ${selectedEmployee.lastname}`}
                    />
                </>
            )}
        </>
    );
}
