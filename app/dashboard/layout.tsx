import { Dashboard } from "@/components";

export default function DashboardLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen">
            
            <Dashboard></Dashboard>
                        
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

