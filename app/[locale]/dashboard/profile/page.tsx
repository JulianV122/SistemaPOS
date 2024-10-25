'use client';

import { FormProfile } from "@/components";
import { useUserSession } from "@/store/userSession";
import { useTranslations } from 'next-intl';

export default function Profile() {
    const { user } = useUserSession();
    const t = useTranslations('Profile');

    return (
        <div className="p-4 ">
            <div>
                <h1 className="text-3xl font-bold text-black">{t('myProfile')}</h1>
            </div>
            <br />
            <div className="p-4 bg-gray-300">
                <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-1 bg-white rounded-lg p-4">
                        <div className="flex flex-col items-center">
                            <h4 className="text-xl font-semibold text-black">{t('generalInfo')}</h4>
                            <div className="h-24 w-24 rounded-full bg-blue-200 flex items-center justify-center mb-2">
                                <span className="text-4xl">👤</span>
                            </div>
                            <div className="text-center">
                                <h3 className="text-xl font-semibold text-gray-600">
                                    {t('fullName', { name: user?.name, lastname: user?.lastname })}
                                </h3>
                                <p className="text-gray-600">{t('email', { email: user?.email })}</p>
                                <p className="text-gray-600">{t('telephone', { telephone: user?.telephone })}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-1 ">
                        {user && (
                            <FormProfile name={user?.name} lastname={user?.lastname} telephone={user?.telephone} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
