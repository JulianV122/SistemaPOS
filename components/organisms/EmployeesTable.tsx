import { Tr } from "@/components";
import { Th } from "@/components";
export function EmployeesTable(){
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
            <Tr></Tr>
            <Tr></Tr>
        </tbody>
    </table>
    )
}

