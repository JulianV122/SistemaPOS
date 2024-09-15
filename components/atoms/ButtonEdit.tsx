import { buttonTable } from "../tokens"

type ButtonEditProps = {
    text: string
}

export function ButtonDelete({text}: ButtonEditProps) {
    return (
        <button className={`text-white bg-blue-700 hover:bg-blue-800 ${buttonTable}`}>Editar</button>
    )
}
