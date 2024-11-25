import { CashierNavbar } from "@/components";
import { UserAuth } from '@/components';
export default function CashierLayout({
    children
}:
{
    children: React.ReactNode
}
) {
    return (
        <>
            <UserAuth>
                <CashierNavbar/>
                {children}
            </UserAuth>
        </>
    )
}