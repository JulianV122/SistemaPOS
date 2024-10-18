'use client'
import { NavDashboard } from "@/components";
import { HeaderDashboard } from "@/components";
import { UserAuth } from '@/components'; 

export default function DashboardLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <UserAuth>
        <div className="flex h-screen">            
            <NavDashboard/>
            <div className="flex-grow bg-gray-100">
                <HeaderDashboard/>
                <div className="p-4">
                    {children}
                </div>
            </div>
        </div>
        </UserAuth>
    );
}

