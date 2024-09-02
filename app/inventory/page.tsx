import { Metadata } from "next";

export const metadata: Metadata= {
    title: "Manage the inventory",
    description: "Manage the inventory in your store.",
}


export default function inventory(){
    return (
        <div>This is the inventory page</div>
    );
}