import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Manage the employees",
    description: "Manage the employees in your store.",
}

export default function manage() {
    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold text-black">Gestionar empleados</h1>
                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    Agregar Empleado
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                        <tr className="bg-black">
                            <th className="px-4 py-2 border-b">CÓDIGO</th>
                            <th className="px-4 py-2 border-b">NOMBRE</th>
                            <th className="px-4 py-2 border-b">APELLIDO</th>
                            <th className="px-4 py-2 border-b">EMAIL/TELÉFONO</th>
                            <th className="px-4 py-2 border-b">TELÉFONO</th>
                            <th className="px-4 py-2 border-b">ACCIONES</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="px-4 py-2 border-b text-black ">000001</td>
                            <td className="px-4 py-2 border-b text-black">JUANA MARIA</td>
                            <td className="px-4 py-2 border-b text-black">PEREZ</td>
                            <td className="px-4 py-2 border-b text-black">pepgitoperez@gmail.com</td>
                            <td className="px-4 py-2 border-b text-black">312-691-3142</td>
                            <td className="px-4 py-2 border-b text-black">
                                <button className="text-white bg-blue-700  hover:bg-blue-800 rounded-lg text-sm px-5 py-2.5 me-2 mb-2 mr-2">Editar</button>
                                <button className="text-white bg-red-700  hover:bg-red-800 rounded-lg text-sm px-5 py-2.5 me-2 mb-2 mr-2">Eliminar</button>
                            </td>
                        </tr>
                        <tr>
                            <td className="px-4 py-2 border-b text-black ">000001</td>
                            <td className="px-4 py-2 border-b text-black">JUANA MARIA</td>
                            <td className="px-4 py-2 border-b text-black">PEREZ</td>
                            <td className="px-4 py-2 border-b text-black">pepgitoperez@gmail.com</td>
                            <td className="px-4 py-2 border-b text-black">312-691-3142</td>
                            <td className="px-4 py-2 border-b text-black">
                                <button className="text-white bg-blue-700  hover:bg-blue-800 rounded-lg text-sm px-5 py-2.5 me-2 mb-2 mr-2">Editar</button>
                                <button className="text-white bg-red-700  hover:bg-red-800 rounded-lg text-sm px-5 py-2.5 me-2 mb-2 mr-2">Eliminar</button>
                            </td>
                        </tr><tr>
                            <td className="px-4 py-2 border-b text-black ">000001</td>
                            <td className="px-4 py-2 border-b text-black">JUANA MARIA</td>
                            <td className="px-4 py-2 border-b text-black">PEREZ</td>
                            <td className="px-4 py-2 border-b text-black">pepgitoperez@gmail.com</td>
                            <td className="px-4 py-2 border-b text-black">312-691-3142</td>
                            <td className="px-4 py-2 border-b text-black">
                                <button className="text-white bg-blue-700  hover:bg-blue-800 rounded-lg text-sm px-5 py-2.5 me-2 mb-2 mr-2">Editar</button>
                                <button className="text-white bg-red-700  hover:bg-red-800 rounded-lg text-sm px-5 py-2.5 me-2 mb-2 mr-2">Eliminar</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="flex justify-between items-center mt-4">
                <span className="text-black">Mostrando registros del 1 al 8 de un total de 10 registros</span>
                <div>
                    <button className="bg-gray-300 text-gray-700 px-3 py-1 rounded-l hover:bg-gray-400">Anterior</button>
                    <button className="bg-gray-300 text-gray-700 px-3 py-1 rounded-r hover:bg-gray-400">Siguiente</button>
                </div>
            </div>
        </div>


    );
}