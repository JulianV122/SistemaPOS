import { Metadata } from "next";

export const metadata: Metadata= {
    title: "Dashboard Admin",
    description: "Admin manage store",
}

export default function cash(){
    return (
        <div className="text-black">This is the Dashboard page</div>
    );
}