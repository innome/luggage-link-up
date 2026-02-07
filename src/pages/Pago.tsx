import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useReserva } from "@/context/reserva-context";

const NOMBRES_TIPO = { bodega: "Maleta de bodega", cabina: "Maleta de cabina" } as const;

const Pago = () => {
  const { maletas, clearReserva } = useReserva();
  const navigate = useNavigate();
  const [pagado, setPagado] = useState(false);
  const [loading, setLoading] = useState(false);

  const total = maletas.reduce((sum, m) => sum + m.precio, 0);

  const handlePagar = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setPagado(true);
      setLoading(false);
      clearReserva();
    }, 800);
  };

  if (maletas.length === 0 && !pagado) {
    navigate("/reservar/resumen", { replace: true });
    return null;
  }

  if (pagado) {
    return (
      <div className="container flex min-h-[60vh] flex-col items-center justify-center py-16 text-center">
        <div className="rounded-xl border border-border bg-card p-10 shadow-sm">
          <h1 className="text-2xl font-extrabold text-primary">Reserva confirmada</h1>
          <p className="mt-2 text-muted-foreground">
            Tu pago se ha procesado correctamente. La maleta estará disponible 24 h antes del primer día de alquiler.
          </p>
          <Link
            to="/"
            className="mt-8 inline-block rounded-lg bg-accent px-6 py-2.5 text-sm font-semibold text-accent-foreground transition-colors hover:opacity-90"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-12">
      <div className="mx-auto max-w-lg">
        <h1 className="text-2xl font-extrabold">Pagar mi maleta</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Simulación de pago — no se realiza ningún cargo real.
        </p>

        <div className="mt-6 rounded-xl border border-border bg-muted/30 p-4">
          <p className="mb-2 font-semibold">Resumen</p>
          <ul className="space-y-1 text-sm text-muted-foreground">
            {maletas.map((m, i) => (
              <li key={`${m.tipo}-${i}`}>
                {NOMBRES_TIPO[m.tipo]} – {m.precio} €/día
              </li>
            ))}
          </ul>
          <p className="mt-2 font-bold">Total: {total} €/día</p>
        </div>

        <form className="mt-8 space-y-4" onSubmit={handlePagar}>
          <div>
            <label className="mb-1 block text-sm font-medium">Número de tarjeta</label>
            <input
              type="text"
              placeholder="4242 4242 4242 4242"
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
              maxLength={19}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium">Vencimiento</label>
              <input
                type="text"
                placeholder="MM/AA"
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">CVV</label>
              <input
                type="text"
                placeholder="123"
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-accent py-2.5 text-sm font-semibold text-accent-foreground transition-colors hover:opacity-90 disabled:opacity-50"
          >
            {loading ? "Procesando…" : "Pagar"}
          </button>
        </form>

        <Link
          to="/reservar/resumen"
          className="mt-4 block text-center text-sm text-muted-foreground hover:underline"
        >
          ← Volver al resumen
        </Link>
      </div>
    </div>
  );
};

export default Pago;
