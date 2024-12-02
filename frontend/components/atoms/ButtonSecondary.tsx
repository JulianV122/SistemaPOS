import { buttonSecondary } from "../tokens"
interface ButtonSecondaryProps {
    text: string;
    onClick?: () => void;
    customClasses?: string;
    disabled?: boolean;
}

export function ButtonSecondary({ text, onClick, customClasses = "", disabled }: ButtonSecondaryProps) {
    return (
        <button 
            className={`${buttonSecondary} ${customClasses}`} 
            onClick={onClick}
            disabled={disabled}
        >
            {text}
        </button>
    );
} 