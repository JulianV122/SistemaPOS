import { Td } from '@/components'
import { buttonTable } from '../tokens'

export function Tr() {
    return (
        <tr>
            <Td content='000001' />
            <Td content='JUANA MARIA' />
            <Td content='PEREZ' />
            <Td content='pepgitoperez@gmail.com' />
            <Td content='312-691-3142' />
            <Td content={
                <>
                    <button className={`text-white bg-violet-700 hover:bg-violet-800 ${buttonTable}`}>Detalle</button>
                    <button className={`text-white bg-blue-700 hover:bg-blue-800 ${buttonTable}`}>Editar</button>
                    <button className={`text-white bg-red-700 hover:bg-red-800 ${buttonTable}`}>Elimiar</button>
                </>
            } />
        </tr>
    )
}
