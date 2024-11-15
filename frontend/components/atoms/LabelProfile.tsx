import { labelStyle } from "../tokens";

type InputProps = {
    text: string;
}

export function LabelProfile({text}: InputProps) {
    return (
        <label className={labelStyle}>{text}</label>
    )
}