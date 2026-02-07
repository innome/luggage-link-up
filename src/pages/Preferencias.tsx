import { Link } from "react-router-dom";

const Preferencias = () => (
  <div className="container py-16">
    <h1 className="text-3xl font-extrabold">Preferencias de alquiler</h1>
    <p className="mt-2 text-muted-foreground">Personaliza los detalles de tu reserva.</p>

    <form className="mt-8 max-w-lg space-y-5" onSubmit={(e) => e.preventDefault()}>
      <div>
        <label className="mb-1 block text-sm font-medium">Fecha de recogida</label>
        <input type="date" className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring" />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium">Fecha de devolución</label>
        <input type="date" className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring" />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium">Método de entrega</label>
        <select className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring">
          <option>Recogida en punto</option>
          <option>Envío a domicilio</option>
        </select>
      </div>
      <Link
        to="/reservar/resumen"
        className="inline-block rounded-lg bg-accent px-6 py-2.5 text-sm font-semibold text-accent-foreground transition-colors hover:opacity-90"
      >
        Ver resumen
      </Link>
    </form>
  </div>
);

export default Preferencias;
