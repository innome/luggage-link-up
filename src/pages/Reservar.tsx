import { Link } from "react-router-dom";
import { Briefcase } from "lucide-react";

const suitcases = [
  { id: 1, name: "Cabina Clásica", size: "20″", price: 8, tag: "Popular" },
  { id: 2, name: "Mediana Viajera", size: "24″", price: 12, tag: null },
  { id: 3, name: "Grande Aventura", size: "28″", price: 16, tag: "Mejor valor" },
];

const Reservar = () => (
  <div className="container py-16">
    <h1 className="text-3xl font-extrabold">Elige tu maleta</h1>
    <p className="mt-2 text-muted-foreground">Selecciona el tamaño ideal para tu viaje.</p>

    <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {suitcases.map((s) => (
        <div key={s.id} className="relative rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
          {s.tag && (
            <span className="absolute right-4 top-4 rounded-full bg-accent/10 px-3 py-0.5 text-xs font-semibold text-accent">
              {s.tag}
            </span>
          )}
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
            <Briefcase className="h-7 w-7 text-primary" />
          </div>
          <h3 className="text-lg font-bold">{s.name}</h3>
          <p className="text-sm text-muted-foreground">{s.size}</p>
          <p className="mt-3 text-2xl font-extrabold text-primary">
            ${s.price}<span className="text-sm font-normal text-muted-foreground">/día</span>
          </p>
          <Link
            to="/reservar/preferencias"
            className="mt-4 block rounded-lg bg-accent py-2.5 text-center text-sm font-semibold text-accent-foreground transition-colors hover:opacity-90"
          >
            Seleccionar
          </Link>
        </div>
      ))}
    </div>
  </div>
);

export default Reservar;
