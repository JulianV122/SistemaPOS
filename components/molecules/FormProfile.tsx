import { InputProfile } from "@/components";
import { LabelProfile } from "@/components";
import { buttonTable } from "../tokens";

export function FormProfile() {
    return (
        <form className="grid grid-cols-1 gap-4 mt-4">
            <div>
                <LabelProfile text="Nombre"></LabelProfile>
                <InputProfile text="Juan"></InputProfile>
            </div>
            <div>
                <LabelProfile text="Apellido"></LabelProfile>
                <InputProfile text="Pérez"></InputProfile>
            </div>
            <div>
                <LabelProfile text="Teléfono"></LabelProfile>
                <InputProfile text="312-691-3146"></InputProfile>
            </div>
            <div className="items-center">
                <button className={`text-white bg-violet-700 hover:bg-violet-800 ${buttonTable}`}>Actualizar</button>
            </div>
        </form>
    )
}