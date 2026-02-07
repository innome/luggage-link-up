import { Briefcase, Shield, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-suitcases.jpg";

const Index = () => {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Maletas de viaje" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-foreground/60" />
        </div>
        <div className="container relative z-10 flex min-h-[70vh] flex-col items-center justify-center py-20 text-center">
          <h1 className="animate-fade-in text-4xl font-extrabold leading-tight text-primary-foreground sm:text-5xl lg:text-6xl">
            Viaja ligero,<br />alquila tu maleta
          </h1>
          <p className="mt-4 max-w-lg animate-fade-in text-lg text-primary-foreground/80" style={{ animationDelay: "0.15s" }}>
            ¿Sin espacio para guardar maletas? Alquila la que necesitas, cuando la necesitas.
          </p>
          <div className="mt-8 flex flex-wrap gap-4 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <Link
              to="/reservar"
              className="rounded-lg bg-accent px-6 py-3 text-base font-semibold text-accent-foreground shadow-lg transition-transform hover:scale-105"
            >
              Alquilar ahora
            </Link>
            <a
              href="#como-funciona"
              className="rounded-lg border border-primary-foreground/30 px-6 py-3 text-base font-semibold text-primary-foreground transition-colors hover:bg-primary-foreground/10"
            >
              Cómo funciona
            </a>
          </div>
        </div>
      </section>

      {/* Qué es Maleta Lista */}
      <section className="border-t border-border bg-muted/30 py-16">
        <div className="container">
          <h2 className="text-center text-3xl font-extrabold">¿Qué es Maleta Lista?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground">
            Maleta Lista es una plataforma que conecta la <strong>oferta y la demanda</strong> de alquiler de maletas.
            Resolvemos el problema del deterioro de las maletas por falta de espacio adecuado para su almacenamiento en los departamentos:
            alquila la maleta que necesitas, cuando la necesitas, sin guardarla en casa.
          </p>
        </div>
      </section>

      {/* Promesa 24h */}
      <section className="py-12">
        <div className="container">
          <div className="mx-auto max-w-2xl rounded-xl border-2 border-primary/20 bg-primary/5 p-8 text-center">
            <p className="text-lg font-semibold text-foreground">
              La maleta estará disponible para su recogida 24 horas antes del primer día de alquiler.
            </p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="como-funciona" className="py-20">
        <div className="container text-center">
          <h2 className="text-3xl font-extrabold">¿Cómo funciona?</h2>
          <p className="mx-auto mt-3 max-w-md text-muted-foreground">
            En tres sencillos pasos tendrás la maleta perfecta para tu viaje.
          </p>
          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            {[
              { icon: Briefcase, title: "Elige tu maleta", desc: "Selecciona tamaño, estilo y fechas de alquiler." },
              { icon: Clock, title: "Recíbela a tiempo", desc: "Te la enviamos o la recoges antes de tu viaje." },
              { icon: Shield, title: "Viaja tranquilo", desc: "Seguro incluido y devolución fácil al regresar." },
            ].map((step, i) => (
              <div key={i} className="rounded-xl border border-border bg-card p-8 text-center shadow-sm transition-shadow hover:shadow-md">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <step.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold">{step.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-16 text-center">
        <div className="container">
          <h2 className="text-3xl font-extrabold text-primary-foreground">¿Listo para tu próximo viaje?</h2>
          <p className="mt-3 text-primary-foreground/80">
            Regístrate gratis y encuentra la maleta ideal.
          </p>
          <Link
            to="/registro"
            className="mt-8 inline-block rounded-lg bg-accent px-8 py-3 text-base font-semibold text-accent-foreground shadow-lg transition-transform hover:scale-105"
          >
            Crear cuenta gratis
          </Link>
        </div>
      </section>
    </>
  );
};

export default Index;
