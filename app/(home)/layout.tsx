import { HomeNavbar, HomeFooter } from "@/components";
export default function HomeLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="w-screen h-screen bg-white">
            <HomeNavbar />
            {children}  
            <HomeFooter />
        </div>
    );
}