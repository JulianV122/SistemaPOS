import { Td } from '@/components'
import { buttonTable } from '../tokens'
import Link from 'next/link'

type TrProps = {
    children: React.ReactNode
}


export function Tr({children}: TrProps) {
    return (
        <tr>
            {children}
        </tr>
    )
}
