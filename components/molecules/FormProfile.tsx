import { InputProfile } from "@/components";
import { LabelProfile } from "@/components";
import { buttonTable } from "../tokens";

type FormProfileProps = {
    name: string;
    lastname: string;
    telephone: string;
}


export function FormProfile({name, lastname, telephone}: FormProfileProps) {
    return (
        <form className="grid grid-cols-1 gap-4 mt-4">
            <div>
                <LabelProfile text="Nombre"></LabelProfile>
                <InputProfile text={name}></InputProfile>
            </div>
            <div>
                <LabelProfile text="Apellido"></LabelProfile>
                <InputProfile text={lastname}></InputProfile>
            </div>
            <div>
                <LabelProfile text="Teléfono"></LabelProfile>
                <InputProfile text={telephone}></InputProfile>
            </div>
            <div className="items-center">
                <button className={`text-white bg-violet-700 hover:bg-violet-800 ${buttonTable}`}>Actualizar</button>
            </div>
        </form>
    )
}