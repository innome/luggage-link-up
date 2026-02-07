import { Link, useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import heroImage from "@/assets/hero-suitcases.jpg";
import { useReserva } from "@/context/reserva-context";
import { formatCop } from "@/lib/utils";
import { useEffect } from "react";

const NOMBRES_TIPO = { bodega: "Maleta de bodega", cabina: "Maleta de cabina" } as const;

const Resumen = () => {
  const { maletas, dias } = useReserva();
  const navigate = useNavigate();

  useEffect(() => {
    if (maletas.length === 0) {
      navigate("/reservar/preferencias", { replace: true });
    }
  }, [maletas.length, navigate]);

  if (maletas.length === 0) {
    return null;
  }

  const totalPorDia = maletas.reduce((sum, m) => sum + m.precio, 0);
  const totalReserva = totalPorDia * dias;

  return (
    <div className="container py-12">
      <div className="mx-auto max-w-xl">
        <div className="overflow-hidden rounded-xl border border-border bg-card">
          <img
            src={heroImage}
            alt="Resumen de tu selección"
            className="h-40 w-full object-cover"
          />
          <div className="p-8">
            <CheckCircle className="h-12 w-12 text-primary" />
            <h1 className="mt-4 text-2xl font-extrabold">Resumen de tu reserva</h1>
            <p className="mt-2 text-muted-foreground">
              Revisa los detalles antes de pagar. Reserva para {dias} {dias === 1 ? "día" : "días"}.
            </p>
            <ul className="mt-6 space-y-4 text-left">
              {maletas.map((m, i) => (
                <li
                  key={`${m.tipo}-${i}`}
                  className="rounded-lg border border-border bg-muted/30 p-4"
                >
                  <p className="font-semibold">{NOMBRES_TIPO[m.tipo]}</p>
                  <p className="text-sm text-muted-foreground">{m.caracteristica1}</p>
                  <p className="text-sm text-muted-foreground">{m.caracteristica2}</p>
                  <p className="mt-2 font-bold text-primary">
                    {formatCop(m.precio)}/día × {dias} {dias === 1 ? "día" : "días"} = {formatCop(m.precio * dias)} COP
                  </p>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-right text-lg font-bold">
              Total ({dias} {dias === 1 ? "día" : "días"}): {formatCop(totalReserva)} COP
            </p>
            <Link
              to="/reservar/pago"
              className="mt-8 block w-full rounded-lg bg-accent py-2.5 text-center text-sm font-semibold text-accent-foreground transition-colors hover:opacity-90"
            >
              Pagar mi maleta
            </Link>
            <Link
              to="/reservar/preferencias"
              className="mt-3 block text-center text-sm text-muted-foreground hover:underline"
            >
              Cambiar maleta(s) o días
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resumen;
