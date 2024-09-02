import { Metadata } from "next";

export const metadata: Metadata= {
    title: "Manage the employees",
    description: "Manage the employees in your store.",
}

export default function manage(){
    return (
        <div>This is the manage page</div>
    );
}