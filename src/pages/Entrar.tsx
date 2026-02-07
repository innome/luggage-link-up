import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/auth-context";

const Entrar = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const err = login(email, password);
    if (err) {
      setError(err);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="container flex min-h-[70vh] items-center justify-center py-16">
      <div className="w-full max-w-md rounded-xl border border-border bg-card p-8 shadow-sm">
        <h1 className="text-2xl font-extrabold">Iniciar sesión</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Accede a tu cuenta de Maleta Lista.
        </p>
        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          {error && (
            <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {error}
            </p>
          )}
          <div>
            <label className="mb-1 block text-sm font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
              placeholder="correo@ejemplo.com"
              required
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
              placeholder="••••••••"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-lg bg-accent py-2.5 text-sm font-semibold text-accent-foreground transition-colors hover:opacity-90"
          >
            Entrar
          </button>
        </form>
        <div className="mt-4 rounded-lg bg-muted p-3 text-xs text-muted-foreground">
          <p className="font-semibold mb-1">Usuarios de prueba:</p>
          <p>usuario1@maletaista.com / 123456</p>
          <p>usuario2@maletaista.com / 123456</p>
        </div>
        <p className="mt-4 text-center text-sm text-muted-foreground">
          ¿No tienes cuenta?{" "}
          <Link to="/registro" className="font-medium text-primary hover:underline">Registrarse</Link>
        </p>
      </div>
    </div>
  );
};

export default Entrar;
