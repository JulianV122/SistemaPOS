import { InputProfile } from "@/components";
import { LabelProfile } from "@/components";
import { buttonTable } from "../tokens";
import { useTranslations } from 'next-intl';

type FormProfileProps = {
    name: string;
    lastname: string;
    telephone: string;
}

export function FormProfile({name, lastname, telephone}: FormProfileProps) {
    const t = useTranslations('FormProfile');

    return (
        <form className="grid grid-cols-1 gap-4 mt-4">
            <div>
                <LabelProfile text={t('name')}></LabelProfile>
                <InputProfile text={name}></InputProfile>
            </div>
            <div>
                <LabelProfile text={t('lastname')}></LabelProfile>
                <InputProfile text={lastname}></InputProfile>
            </div>
            <div>
                <LabelProfile text={t('telephone')}></LabelProfile>
                <InputProfile text={telephone}></InputProfile>
            </div>
            <div className="items-center">
                <button className={`text-white bg-violet-700 hover:bg-violet-800 ${buttonTable}`}>{t('updateButton')}</button>
            </div>
        </form>
    );
}
