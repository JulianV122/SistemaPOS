import { buttonSecondary } from "../tokens"

type ButtonSecondaryProps = {
    text: string,
    customClasses?: string
}

export function ButtonSecondary({text, customClasses = ""}: ButtonSecondaryProps) {
    return (
        <button className={`${buttonSecondary} ${customClasses}`}>
            {text}
        </button>
    )
}
