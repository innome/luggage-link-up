import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="text-xl font-extrabold tracking-tight text-primary">
          Maleta <span className="text-accent">Lista</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 md:flex">
          <Link to="/reservar" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            Alquilar
          </Link>
          <Link to="/entrar" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            Entrar
          </Link>
          <Link
            to="/registro"
            className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground transition-colors hover:opacity-90"
          >
            Registrarse
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Menú">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile nav */}
      {open && (
        <nav className="flex flex-col gap-3 border-t border-border bg-background px-6 py-4 md:hidden">
          <Link to="/reservar" onClick={() => setOpen(false)} className="text-sm font-medium text-muted-foreground">
            Alquilar
          </Link>
          <Link to="/entrar" onClick={() => setOpen(false)} className="text-sm font-medium text-muted-foreground">
            Entrar
          </Link>
          <Link
            to="/registro"
            onClick={() => setOpen(false)}
            className="rounded-lg bg-accent px-4 py-2 text-center text-sm font-semibold text-accent-foreground"
          >
            Registrarse
          </Link>
        </nav>
      )}
    </header>
  );
};

export default Header;
