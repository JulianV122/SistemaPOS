import { buttonPrimary } from "../tokens"

type ButtonPrimaryProps = {
    text: string;
    onClick?: () => void;
    disabled?: boolean;
}

export function ButtonPrimary({text, onClick, disabled}: ButtonPrimaryProps) {
    return (
        <button className={buttonPrimary} onClick={onClick} disabled={disabled}>
            {text}
        </button>
    )
}
