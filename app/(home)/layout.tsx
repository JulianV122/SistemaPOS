export default function HomeLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="w-screen h-screen bg-white">
            {children}
        </div>
    );
}