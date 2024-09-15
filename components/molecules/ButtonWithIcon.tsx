import { buttonIcon } from "../tokens"

type ButtonWithIconProps = {
    text: string,
    nameIcon: string
}

export function ButtonWithIcon({ text , nameIcon}: ButtonWithIconProps) {
    return (
        <button className={buttonIcon}>
            <span>
                <svg stroke="currentColor" className="size-6">
                    <path  d={`${nameIcon}`} />
                </svg>
            </span>
            {text}
            <span>
                <svg stroke="currentColor" className="size-6">
                    <path  d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z" clip-rule="evenodd" />
                </svg>
            </span>
        </button>
    )
}


