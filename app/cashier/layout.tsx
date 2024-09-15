import { CashierNavbar } from "@/components";
export default function CashierLayout({
    children
}:
{
    children: React.ReactNode
}
) {
    return (
        <>
            <CashierNavbar/>
            { children }
        </>
    )
}