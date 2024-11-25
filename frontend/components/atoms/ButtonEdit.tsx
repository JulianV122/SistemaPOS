import { buttonTable } from "../tokens"
import { useTranslations } from 'next-intl';



export function ButtonEdit() {
    const t = useTranslations('ButtonEdit');
    return (
        <button className={`text-white bg-blue-500 hover:bg-blue-600 ${buttonTable}`}>
            {t('text')}
        </button>
    )
}
