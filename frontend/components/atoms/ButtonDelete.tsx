import { buttonTable } from "../tokens";
import { useTranslations } from 'next-intl';

export function ButtonDelete() {
    const t = useTranslations('ButtonDelete'); 

    return (
        <button className={`text-white bg-red-700 hover:bg-red-800 ${buttonTable}`}>
            {t('text')} 
        </button>
    );
}
