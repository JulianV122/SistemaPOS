import { buttonTable } from "../tokens"
import { useTranslations } from 'next-intl';



export function ButtonEdit() {
    const t = useTranslations('ButtonEdit');
    return (
        <button className={`text-white bg-red-700 hover:bg-red-800 ${buttonTable}`}>
            {t('text')}
        </button>
    )
}
