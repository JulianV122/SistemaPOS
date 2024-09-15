import { buttonTable } from "../tokens"

type ButtonDeleteProps = {
    text: string
}

export function ButtonDelete({text}: ButtonDeleteProps) {
    return (
        <button className={`text-white bg-red-700 hover:bg-red-800 ${buttonTable}`}>Elimiar</button>
    )
}
