import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";

const Resumen = () => (
  <div className="container flex min-h-[60vh] flex-col items-center justify-center py-16 text-center">
    <div className="rounded-xl border border-border bg-card p-10 shadow-sm">
      <CheckCircle className="mx-auto h-12 w-12 text-primary" />
      <h1 className="mt-4 text-2xl font-extrabold">Resumen de tu reserva</h1>
      <p className="mt-2 text-muted-foreground">
        Revisa los detalles antes de confirmar.
      </p>
      <div className="mt-6 space-y-2 text-left text-sm">
        <p><span className="font-medium">Maleta:</span> Cabina Clásica 20″</p>
        <p><span className="font-medium">Precio:</span> $8/día</p>
        <p><span className="font-medium">Entrega:</span> Recogida en punto</p>
      </div>
      <button className="mt-8 w-full rounded-lg bg-accent py-2.5 text-sm font-semibold text-accent-foreground transition-colors hover:opacity-90">
        Confirmar reserva
      </button>
      <Link to="/reservar" className="mt-3 block text-sm text-muted-foreground hover:underline">
        ← Cambiar maleta
      </Link>
    </div>
  </div>
);

export default Resumen;
