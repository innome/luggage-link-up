import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="border-t border-border bg-muted/50 py-12">
    <div className="container grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
      <div>
        <p className="text-lg font-extrabold text-primary">
          Maleta<span className="text-accent">Lista</span>
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          Alquila maletas de calidad sin preocuparte por el espacio.
        </p>
      </div>
      <div>
        <h4 className="mb-3 text-sm font-semibold text-foreground">Producto</h4>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li><Link to="/reservar" className="hover:text-foreground">Alquilar</Link></li>
          <li><Link to="/" className="hover:text-foreground">Cómo funciona</Link></li>
        </ul>
      </div>
      <div>
        <h4 className="mb-3 text-sm font-semibold text-foreground">Cuenta</h4>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li><Link to="/entrar" className="hover:text-foreground">Entrar</Link></li>
          <li><Link to="/registro" className="hover:text-foreground">Registrarse</Link></li>
        </ul>
      </div>
      <div>
        <h4 className="mb-3 text-sm font-semibold text-foreground">Legal</h4>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li><a href="#" className="hover:text-foreground">Privacidad</a></li>
          <li><a href="#" className="hover:text-foreground">Términos</a></li>
        </ul>
      </div>
    </div>
    <div className="container mt-8 border-t border-border pt-6 text-center text-xs text-muted-foreground">
      © {new Date().getFullYear()} MaletaLista. Todos los derechos reservados.
    </div>
  </footer>
);

export default Footer;
