import { buttonSecondary } from "../tokens"
interface ButtonSecondaryProps {
    text: string;
    onClick?: () => void;
    customClasses?: string;
}

export function ButtonSecondary({ text, onClick, customClasses = "" }: ButtonSecondaryProps) {
    return (
        <button 
            onClick={onClick}
            className={`${buttonSecondary} ${customClasses}`}
        >
            {text}
        </button>
    );
} 