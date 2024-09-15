import { inputStyle } from "../tokens";
import { primaryColor } from "../tokens";

type InputProps = {
    text: string;
}

export function InputProfile({text}: InputProps) {
    return (
        <input  type="text" className={`${inputStyle} ${primaryColor}`}value={text} />
    )
}