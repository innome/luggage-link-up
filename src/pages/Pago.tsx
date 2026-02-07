import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useReserva } from "@/context/reserva-context";
import type { MaletaSeleccionada } from "@/context/reserva-context";
import { formatCop } from "@/lib/utils";

const NOMBRES_TIPO = { bodega: "Maleta de bodega", cabina: "Maleta de cabina" } as const;

interface InvoiceData {
  maletas: MaletaSeleccionada[];
  dias: number;
  totalReserva: number;
  referencia: string;
  fecha: string;
}

const Pago = () => {
  const { maletas, dias, clearReserva } = useReserva();
  const navigate = useNavigate();
  const [pagado, setPagado] = useState(false);
  const [loading, setLoading] = useState(false);
  const [invoice, setInvoice] = useState<InvoiceData | null>(null);

  const totalPorDia = maletas.reduce((sum, m) => sum + m.precio, 0);
  const totalReserva = totalPorDia * dias;

  const handlePagar = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setInvoice({
        maletas: [...maletas],
        dias,
        totalReserva,
        referencia: `ML-${Date.now().toString(36).toUpperCase()}`,
        fecha: new Date().toLocaleDateString("es-CO", { dateStyle: "long" }),
      });
      setPagado(true);
      setLoading(false);
      clearReserva();
    }, 800);
  };

  if (maletas.length === 0 && !pagado) {
    navigate("/reservar/resumen", { replace: true });
    return null;
  }

  if (pagado && invoice) {
    return (
      <div className="container py-12">
        <div className="mx-auto max-w-xl">
          <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
            <div className="border-b border-border bg-primary/10 px-6 py-6 text-center">
              <p className="text-2xl font-extrabold tracking-tight text-primary">
                Maleta <span className="text-accent">Lista</span>
              </p>
              <p className="mt-1 text-sm font-medium text-muted-foreground">Comprobante de reserva</p>
            </div>
            <div className="p-6">
              <div className="mb-6 flex justify-between text-sm">
                <div>
                  <p className="font-semibold text-foreground">Referencia</p>
                  <p className="text-muted-foreground">{invoice.referencia}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-foreground">Fecha</p>
                  <p className="text-muted-foreground">{invoice.fecha}</p>
                </div>
              </div>
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-border text-muted-foreground">
                    <th className="pb-2 font-medium">Concepto</th>
                    <th className="pb-2 text-right font-medium">Precio/día</th>
                    <th className="pb-2 text-center font-medium">Días</th>
                    <th className="pb-2 text-right font-medium">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {invoice.maletas.map((m, i) => (
                    <tr key={`${m.tipo}-${i}`} className="border-b border-border/70">
                      <td className="py-3">
                        <p className="font-medium text-foreground">{NOMBRES_TIPO[m.tipo]}</p>
                        <p className="text-xs text-muted-foreground">{m.caracteristica1} · {m.caracteristica2}</p>
                      </td>
                      <td className="py-3 text-right text-muted-foreground">{formatCop(m.precio)}</td>
                      <td className="py-3 text-center text-muted-foreground">{invoice.dias}</td>
                      <td className="py-3 text-right font-medium">{formatCop(m.precio * invoice.dias)} COP</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="mt-4 flex justify-end border-t border-border pt-4">
                <p className="text-lg font-bold">Total: {formatCop(invoice.totalReserva)} COP</p>
              </div>
              <p className="mt-6 rounded-lg bg-primary/5 px-4 py-3 text-sm text-foreground">
                La maleta estará disponible para su recogida 24 horas antes del primer día de alquiler.
              </p>
            </div>
            <div className="border-t border-border bg-muted/30 px-6 py-4 text-center">
              <p className="text-sm font-medium text-muted-foreground">Gracias por reservar con Maleta Lista</p>
              <Link
                to="/"
                className="mt-3 inline-block rounded-lg bg-accent px-6 py-2.5 text-sm font-semibold text-accent-foreground transition-colors hover:opacity-90"
              >
                Volver al inicio
              </Link>
            </div>
          </div>
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
                {NOMBRES_TIPO[m.tipo]} – {formatCop(m.precio)}/día × {dias} {dias === 1 ? "día" : "días"} = {formatCop(m.precio * dias)} COP
              </li>
            ))}
          </ul>
          <p className="mt-2 font-bold">Total ({dias} {dias === 1 ? "día" : "días"}): {formatCop(totalReserva)} COP</p>
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
