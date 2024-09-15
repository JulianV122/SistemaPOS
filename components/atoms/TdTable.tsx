import { ReactNode } from "react";

type TdProps = {
    content: ReactNode;
}

export function Td({content}: TdProps) {
    return (
        <td className="px-4 py-2 border-b text-black text-center">{content}</td>
    )
}