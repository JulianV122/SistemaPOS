import { ReactNode } from "react";
import { tdStyle } from "../tokens";

type TdProps = {
    children: ReactNode;
}

export function Td({children}: TdProps) {
    return (
        <td className={tdStyle}>{children}</td>
    )
}