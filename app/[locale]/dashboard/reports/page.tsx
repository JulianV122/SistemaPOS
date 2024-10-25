import { Metadata } from "next";
import { PermissionAuth } from "@/components";

export const metadata: Metadata= {
    title: "Reports Management",
    description: "Manage the reports in your store.",
}


export default function reports(){
    return (
        <PermissionAuth requiredPermission="VER_REPORTES"> 
            
        <div>This is the report page</div>
        </PermissionAuth>
    );
}