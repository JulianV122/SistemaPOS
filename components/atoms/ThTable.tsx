import { thStyle } from "../tokens"
type TdProps = {
    text: string;
}

export function Th({text}: TdProps) {
    return (
        <th className={thStyle}>{text}</th>
    )
}