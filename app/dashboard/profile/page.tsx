import { Metadata } from "next";
import { FormProfile } from "@/components";

export const metadata: Metadata = {
    title: "My Profile",
    description: "The user sees his profile here",
}


export default function profile() {
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
                                <h3 className="text-xl font-semibold text-gray-600">Juan Pérez</h3>
                                <p className="text-gray-600">juan@gmail.com</p>
                                <p className="text-gray-600">312-691-3146</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-1 ">
                        <FormProfile/>
                    </div>
                </div>
            </div>
        </div>

    );
}


