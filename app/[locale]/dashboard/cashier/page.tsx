import { Metadata } from "next";

export const metadata: Metadata= {
    title: "Cash Management",
    description: "Manage the cash in your store.",
}

export default function cash(){
    return (
        <div>This is the cash page</div>
    );
}