import { Tr } from "@/components";
import { Th, Td } from "@/components";
import { buttonTable } from "@/components/tokens";

import Link from "next/link";

const employeesData = [
    {
        id: '000001',
        name: 'JUANA MARIA',
        lastName: 'PEREZ',
        email: 'pepgitoperez@gmail.com',
        phone: '312-691-3142'
    },
    {
        id: '000002',
        name: 'JOSÉ MARIA',
        lastName: 'ARIAS',
        email: 'jose@gmail.com',
        phone: '312-123-1456'
    },
    {
        id: '000003',
        name: 'MARIA',
        lastName: 'GONZALEZ',
        email: 'maria@gmail.com',
        phone: '312-123-1456'
    },
]


export function EmployeesTable() {
    return (
        <table className="min-w-full bg-white border border-gray-200">
            <thead>
                <tr className="bg-black">
                    <Th text="CÓDIGO"></Th>
                    <Th text="NOMBRE"></Th>
                    <Th text="APELLIDO"></Th>
                    <Th text="EMAIL"></Th>
                    <Th text="TELÉFONO"></Th>
                    <Th text="ACCIONES"></Th>
                </tr>
            </thead>
            <tbody>
                {employeesData.map((employee) => (
                    <Tr key={employee.id}>
                        <Td>{employee.id}</Td>
                        <Td>{employee.name}</Td>
                        <Td>{employee.lastName}</Td>
                        <Td>{employee.email}</Td>
                        <Td>{employee.phone}</Td>
                        <Td>
                            <Link href={`/dashboard/manage/${employee.id}`} className={`text-white bg-violet-700 hover:bg-violet-800 ${buttonTable}`}>Detalle</Link>
                            <button className={`text-white bg-blue-700 hover:bg-blue-800 ${buttonTable}`}>Editar</button>
                            <button className={`text-white bg-red-700 hover:bg-red-800 ${buttonTable}`}>Eliminar</button>
                        </Td>
                    </Tr>
                ))}
            </tbody>
        </table>
    )
}

