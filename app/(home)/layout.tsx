import { HomeNavbar, HomeFooter } from "@/components";
export default function HomeLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="w-auto min-h-screen bg-white flex flex-col justify-between">
            <HomeNavbar />
            {children}  
            <HomeFooter />
        </div>
    );
}