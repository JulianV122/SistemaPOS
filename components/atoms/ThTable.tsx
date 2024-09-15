
type TdProps = {
    text: string;
}

export function Th({text}: TdProps) {
    return (
        <th className="px-4 py-2 border-b ">{text}</th>
    )
}