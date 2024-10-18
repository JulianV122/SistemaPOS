import { Metadata } from "next";
import { PermissionAuth } from "@/components"; 


export const metadata: Metadata= {
    title: "Manage the inventory",
    description: "Manage the inventory in your store.",
}


export default function inventory(){
    return (
        <PermissionAuth requiredPermission="GESTIONAR_INVENTARIO"> 
            <form action="">

            </form>
        </PermissionAuth>
    );
}