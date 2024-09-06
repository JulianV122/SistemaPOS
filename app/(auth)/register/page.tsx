import { Metadata } from "next";
import "./style.css";

export const metadata: Metadata = {
  title: "Register to Market Management",
  description: "Register to my market management app to create an account.",
};

export default function register() {
  return (
    <form>
      <h3 className="title"> Registrarse</h3>
      <div>
        <label htmlFor="name">Nombre completo</label>
        <input id="name" type="text" />
      </div>
      <div>
        <label htmlFor="email">Correo electronico</label>
        <input id="email" type="email" />
      </div>
      <div>
        <label htmlFor="password">Contraseña</label>
        <input id="password" type="password" />
      </div>
      <div>
        <label htmlFor="password">Confirmar Contraseña</label>
        <input id="password" type="password" />
      </div>
      <div className="checkbox">
        <input type="checkbox" id="remember" name="remember" value="remember"/>
        <label htmlFor="accept">Aceptar terminos y condiciones</label>
      </div>
      <div>
        <button className="botonregister"> Registrarse </button>
      </div>
    </form>
  )
}
