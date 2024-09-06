import { Metadata } from "next";
import "./style.css";

export const metadata: Metadata = {
  title: "Login to Market Management",
  description: "Login to my market management app to get started.",
};

export default function login() {
  return (
    <form>
        <h3 className="title"> Iniciar Sesion</h3>
      <div>
        <label htmlFor="email">Correo electronico</label>
        <input id="email" type="email" />
      </div>
      <div>
        <label htmlFor="password">Contraseña</label>
        <input id="password" type="password" />
      </div>
      <div className="checkbox">
        <input type="checkbox" id="remember" name="remember" value="remember"/>
        <label htmlFor="remember">Recordar contraseña</label>
      </div>
      <div>
        <button className="botonlogin"> Login </button>
      </div>
    </form>
  );
}
