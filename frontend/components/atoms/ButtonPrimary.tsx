
import { buttonPrimary } from "../tokens"

type ButtonPrimaryProps = {
    text: string;
    onClick?: () => void;
}

export function ButtonPrimary({text, onClick}: ButtonPrimaryProps) {
    return (
        <button className={buttonPrimary} onClick={onClick}>
            {text}
        </button>
    )
}
