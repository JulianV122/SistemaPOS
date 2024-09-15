import { NavDashboard } from "@/components";
import { HeaderDashboard } from "@/components";

export default function DashboardLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen">            
            <NavDashboard/>
            <div className="flex-grow bg-gray-100">
                <HeaderDashboard/>
                <div className="p-4">
                    {children}
                </div>
            </div>
        </div>
    );
}

