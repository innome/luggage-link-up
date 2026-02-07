import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-suitcases.jpg";
import {
  createMaletaSeleccionada,
  DIAS_MAX,
  DIAS_MIN,
  getCaracteristicasYPrecio,
  useReserva,
  type TipoMaleta,
} from "@/context/reserva-context";
import { cn, formatCop } from "@/lib/utils";

const TIPOS: { tipo: TipoMaleta; label: string }[] = [
  { tipo: "bodega", label: "Maleta de bodega" },
  { tipo: "cabina", label: "Maleta de cabina" },
];

const SelectorMaleta = ({
  seleccionado,
  onSeleccionar,
  titulo,
}: {
  seleccionado: TipoMaleta | null;
  onSeleccionar: (tipo: TipoMaleta) => void;
  titulo: string;
}) => (
  <div className="space-y-3">
    <h3 className="text-sm font-semibold text-foreground">{titulo}</h3>
    <div className="grid gap-4 sm:grid-cols-2">
      {TIPOS.map(({ tipo, label }) => {
        const { caracteristica1, caracteristica2, precio } = getCaracteristicasYPrecio(tipo);
        const activo = seleccionado === tipo;
        return (
          <button
            key={tipo}
            type="button"
            onClick={() => onSeleccionar(tipo)}
            className={cn(
              "rounded-xl border-2 p-5 text-left transition-colors",
              activo
                ? "border-primary bg-primary/10"
                : "border-border bg-card hover:border-primary/50"
            )}
          >
            <p className="font-semibold">{label}</p>
            <p className="mt-1 text-sm text-muted-foreground">{caracteristica1}</p>
            <p className="text-sm text-muted-foreground">{caracteristica2}</p>
            <p className="mt-2 text-lg font-bold text-primary">
              {formatCop(precio)}<span className="text-sm font-normal text-muted-foreground"> COP/día</span>
            </p>
          </button>
        );
      })}
    </div>
  </div>
);

const Preferencias = () => {
  const navigate = useNavigate();
  const { setMaletas, setDias, dias } = useReserva();
  const handleDiasChange = (e: React.ChangeEvent<HTMLInputElement>) => setDias(Number(e.target.value));
  const [selecciones, setSelecciones] = useState<(TipoMaleta | null)[]>([null]);
  const mostrarSegundoBloque = selecciones.length > 1;

  const handleSeleccionar = (index: number, tipo: TipoMaleta) => {
    setSelecciones((prev) => {
      const next = [...prev];
      next[index] = tipo;
      return next;
    });
  };

  const handleAnadirOtra = () => {
    if (selecciones.length >= 2) return;
    setSelecciones((prev) => [...prev, null]);
  };

  const handleContinuar = () => {
    const elegidas = selecciones
      .filter((s): s is TipoMaleta => s !== null)
      .map(createMaletaSeleccionada);
    if (elegidas.length === 0) return;
    setMaletas(elegidas);
    navigate("/reservar/resumen");
  };

  const puedeContinuar = selecciones.some((s) => s !== null);

  return (
    <div className="container py-12">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-extrabold">Elige tu maleta</h1>
        <p className="mt-2 text-muted-foreground">
          Selecciona maleta de bodega o de cabina. Puedes añadir una segunda.
        </p>

        <div className="mt-8 overflow-hidden rounded-xl border border-border bg-card">
          <img
            src={heroImage}
            alt="Maletas bodega y cabina"
            className="h-48 w-full object-cover"
          />
        </div>

        <div className="mt-10 space-y-10">
          <SelectorMaleta
            titulo="Maleta 1"
            seleccionado={selecciones[0] ?? null}
            onSeleccionar={(tipo) => handleSeleccionar(0, tipo)}
          />

          {mostrarSegundoBloque && (
            <SelectorMaleta
              titulo="Maleta 2"
              seleccionado={selecciones[1] ?? null}
              onSeleccionar={(tipo) => handleSeleccionar(1, tipo)}
            />
          )}

          {!mostrarSegundoBloque && (
            <button
              type="button"
              onClick={handleAnadirOtra}
              className="text-sm font-medium text-primary underline hover:no-underline"
            >
              Añadir otra maleta
            </button>
          )}

          <div className="space-y-2 pt-4">
            <label htmlFor="dias" className="block text-sm font-semibold text-foreground">
              ¿Cuántos días quieres reservar?
            </label>
            <input
              id="dias"
              type="number"
              min={DIAS_MIN}
              max={DIAS_MAX}
              value={dias}
              onChange={handleDiasChange}
              className="w-24 rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
            <span className="ml-2 text-sm text-muted-foreground">días (mín. {DIAS_MIN}, máx. {DIAS_MAX})</span>
          </div>

          <div className="flex flex-wrap gap-4 pt-4">
            <button
              type="button"
              onClick={handleContinuar}
              disabled={!puedeContinuar}
              className="rounded-lg bg-accent px-6 py-2.5 text-sm font-semibold text-accent-foreground transition-colors hover:opacity-90 disabled:opacity-50"
            >
              Continuar
            </button>
            <Link
              to="/reservar"
              className="rounded-lg border border-border px-6 py-2.5 text-sm font-medium hover:bg-muted"
            >
              Volver
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preferencias;
