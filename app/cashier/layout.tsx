import CashierNavbar from "../components/CashierNavbar"
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