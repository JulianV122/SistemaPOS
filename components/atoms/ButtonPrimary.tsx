
import { buttonPrimary } from "../tokens"

type ButtonPrimaryProps = {
    text: string
}

export function ButtonPrimary({text}: ButtonPrimaryProps) {
    return (
        <button className={buttonPrimary}>
            {text}
        </button>
    )
}
