import { buttonIcon } from "../tokens";
import { useTranslations } from "next-intl";

type ButtonWithIconProps = {
    text: string,
    nameIcon: string
}

export function ButtonWithIcon({ text, nameIcon }: ButtonWithIconProps) {
    const t = useTranslations('ButtonWithIcon');

    return (
        <button className={buttonIcon}>
            <span>
                <svg className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                    <path d={`${nameIcon}`} />
                </svg>
            </span>
            <span className="ms-3">
                {text}
            </span>
        </button>
    );
}
