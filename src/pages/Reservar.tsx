import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-suitcases.jpg";

const Reservar = () => (
  <section className="relative overflow-hidden">
    <div className="absolute inset-0">
      <img
        src={heroImage}
        alt="Maletas listas para tu viaje"
        className="h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-foreground/50" />
    </div>
    <div className="container relative z-10 flex min-h-[70vh] flex-col items-center justify-center py-20 text-center">
      <h1 className="text-4xl font-extrabold leading-tight text-primary-foreground sm:text-5xl lg:text-6xl">
        Tu maleta lista con solo 1 click
      </h1>
      <p className="mt-6 max-w-lg text-lg text-primary-foreground/90">
        La maleta estará disponible para su recogida 24 horas antes del primer día de alquiler.
      </p>
      <Link
        to="/reservar/preferencias"
        className="mt-10 rounded-lg bg-accent px-8 py-3.5 text-base font-semibold text-accent-foreground shadow-lg transition-transform hover:scale-105"
      >
        Elegir mi maleta
      </Link>
    </div>
  </section>
);

export default Reservar;
