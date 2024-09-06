import "./layout.css";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="auth">
        <div className="header">
            <h1 className="logo">Logo</h1>
            <nav>
                <a href="/home">Home</a>
                <a href="#">Preguntas</a>
                <a href="#">Ascociados</a>
            </nav>
            <a href="/login">
              <button className="blogin">Iniciar sesion</button>
            </a>
            <a href="/register">
            <button className="bregister">Registrarse</button>
            </a>
        </div>
        <div className="title">
          <h2></h2>
        </div>
        <section className="form">
            {children}
        </section>
    </main>
  );
}
