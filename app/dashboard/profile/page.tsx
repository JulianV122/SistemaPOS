'use client';

import { Metadata } from "next";
import { FormProfile } from "@/components";
import { getCurrentUser } from "@/services/auth";
import { useEffect, useState } from "react";



export default function profile() {
    const [user, setUser] = useState<any>(null);
    useEffect(() => {
        const getUser = async () => {
            const user = await getCurrentUser();
            setUser(user);
            console.log(user);
        }
        getUser();
    }, []);
    

    return (
        <div className="p-4 ">
            <div className="">
                <h1 className="text-3xl font-bold text-black">Mi Perfil</h1>
            </div>
            <br />
            <div className="p-4 bg-gray-300">
                <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-1  bg-white rounded-lg p-4">
                        <div className="flex flex-col items-center">
                            <h4 className="text-xl font-semibold text-black">Información General</h4>
                            <div className="h-24 w-24 rounded-full bg-blue-200 flex items-center justify-center mb-2">
                                <span className="text-4xl">👤</span>
                            </div>
                            <div className="text-center">
                                <h3 className="text-xl font-semibold text-gray-600">{user?.name} {user?.lastname}</h3>
                                <p className="text-gray-600">{user?.email}</p>
                                <p className="text-gray-600">{user?.telephone}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-1 ">
                        <FormProfile name={user?.name} lastname={user?.lastname} telephone={user?.telephone}/>
                    </div>
                </div>
            </div>
        </div>

    );
}


