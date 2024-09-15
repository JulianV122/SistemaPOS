import { ReactNode } from "react";
import { tdStyle } from "../tokens";

type TdProps = {
    content: ReactNode;
}

export function Td({content}: TdProps) {
    return (
        <td className={tdStyle}>{content}</td>
    )
}