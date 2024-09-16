import { Metadata } from "next";

export const metadata: Metadata= {
    title: "Home of My Market Management",
    description: "Welcome to my market management app",
}


export default function home(){
    return (
        <div>This is the home page</div>
    );
}