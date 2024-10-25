'use client'
import { useParams } from "next/navigation"
import Link from "next/link"
import { ButtonPrimary } from "@/components";



export default function employee() {
    const { employeeId } = useParams();

    return (
        <div className="text-center">
            <h1 className="text-black  bold text-3xl font-bold m-4">Employee {employeeId}</h1>
            <Link href={'./'}><ButtonPrimary text="Volver"/></Link>
        </div>
    )
}
