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
        <div className="flex h-screen bg-white">            
            <NavDashboard/>
            <div className="flex-grow ">
            <HeaderDashboard/>
            <div className="p-4 ">
                {children}
            </div>
            </div>
        </div>
        </UserAuth>
        
    );
}

