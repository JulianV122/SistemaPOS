import { buttonSecondary } from "../tokens"

type ButtonSecondaryProps = {
    text: string
}

export function ButtonSecondary({text}: ButtonSecondaryProps) {
    return (
        <button className={buttonSecondary}>
            {text}
        </button>
    )
}

