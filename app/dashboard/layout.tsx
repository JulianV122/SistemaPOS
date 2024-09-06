
export default function DashboardLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen">
            <aside className="w-64 bg-cyan-800 text-white flex flex-col">
                <div className="flex-grow p-4">
                    <div className="mb-8">
                        <h2 className="text-xl font-bold mb-4">Gestionar empleados</h2>
                        <ul>
                            <li className="mb-4">
                                <button className="flex items-center w-full text-left p-2 hover:bg-teal-600">
                                    <span className="mr-2">*</span> Gestionar empleados
                                </button>
                            </li>
                            <li className="mb-4">
                                <button className="flex items-center w-full text-left p-2 hover:bg-teal-600">
                                    <span className="mr-2">*</span> Gestionar inventario
                                </button>
                            </li>
                            <li>
                                <button className="flex items-center w-full text-left p-2 hover:bg-teal-600">
                                    <span className="mr-2">*</span> Reportes financieros
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="p-4">
                    <button className="bg-gray-800 text-white w-full py-2 rounded">Cerrar sesión</button>
                </div>
            </aside>

            <div className="flex-grow bg-gray-100">
                
                <header className="bg-gray-300 p-4 flex justify-between items-center">
                    <span className='text-black'>Juan Pérez</span>
                    <div className="h-10 w-10 rounded-full bg-blue-200 flex items-center justify-center">
                        <span>👤</span>
                    </div>
                </header>

                <div className="p-4">
                    {children}
                </div>
            </div>
        </div>
    );
}
