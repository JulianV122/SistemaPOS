'use client'
import Link from "next/link"

import { useUserSession } from "@/store/userSession"

export function HeaderDashboard() {
    const { user } = useUserSession();
    console.log(user)
    return (
        <header className="bg-gray-300 p-4 flex justify-between items-center">
            <span className='text-black'>{user?.name} {user?.lastname}</span>
            <div className="h-10 w-10 rounded-full bg-blue-200 flex items-center justify-center">
                <Link href={'/dashboard/profile'}>👤</Link>
            </div>
        </header>
    )
}


