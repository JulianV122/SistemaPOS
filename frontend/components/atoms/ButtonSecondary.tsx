import { buttonSecondary } from "../tokens"
interface ButtonSecondaryProps {
    text: string;
    onClick?: () => void;
}

export function ButtonSecondary({ text, onClick }: ButtonSecondaryProps) {
    return (
        <button 
            onClick={onClick}
            className={buttonSecondary}
        >
            {text}
        </button>
    );
} 