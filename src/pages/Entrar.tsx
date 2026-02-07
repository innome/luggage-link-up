import { Link } from "react-router-dom";

const Entrar = () => (
  <div className="container flex min-h-[70vh] items-center justify-center py-16">
    <div className="w-full max-w-md rounded-xl border border-border bg-card p-8 shadow-sm">
      <h1 className="text-2xl font-extrabold">Iniciar sesión</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Accede a tu cuenta de MaletaLista.
      </p>
      <form className="mt-6 space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label className="mb-1 block text-sm font-medium">Email</label>
          <input type="email" className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring" placeholder="correo@ejemplo.com" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Contraseña</label>
          <input type="password" className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring" placeholder="••••••••" />
        </div>
        <button type="submit" className="w-full rounded-lg bg-accent py-2.5 text-sm font-semibold text-accent-foreground transition-colors hover:opacity-90">
          Entrar
        </button>
      </form>
      <p className="mt-4 text-center text-sm text-muted-foreground">
        ¿No tienes cuenta?{" "}
        <Link to="/registro" className="font-medium text-primary hover:underline">Registrarse</Link>
      </p>
    </div>
  </div>
);

export default Entrar;
