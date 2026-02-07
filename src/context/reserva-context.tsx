import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";

export type TipoMaleta = "bodega" | "cabina";

export interface MaletaSeleccionada {
  tipo: TipoMaleta;
  caracteristica1: string;
  caracteristica2: string;
  precio: number;
}

interface ReservaContextValue {
  maletas: MaletaSeleccionada[];
  addMaleta: (maleta: MaletaSeleccionada) => void;
  setMaletas: (maletas: MaletaSeleccionada[]) => void;
  clearReserva: () => void;
}

const ReservaContext = createContext<ReservaContextValue | null>(null);

const CATALOGO: Record<TipoMaleta, Omit<MaletaSeleccionada, "tipo">> = {
  bodega: {
    caracteristica1: "55×40×23 cm",
    caracteristica2: "Hasta 23 kg",
    precio: 10,
  },
  cabina: {
    caracteristica1: "40×30×20 cm",
    caracteristica2: "Hasta 10 kg",
    precio: 8,
  },
};

export function getCaracteristicasYPrecio(tipo: TipoMaleta): Omit<MaletaSeleccionada, "tipo"> {
  return { ...CATALOGO[tipo] };
}

export function createMaletaSeleccionada(tipo: TipoMaleta): MaletaSeleccionada {
  const data = CATALOGO[tipo];
  return { tipo, ...data };
}

export function ReservaProvider({ children }: { children: ReactNode }) {
  const [maletas, setMaletas] = useState<MaletaSeleccionada[]>([]);

  const addMaleta = useCallback((maleta: MaletaSeleccionada) => {
    setMaletas((prev) => (prev.length >= 2 ? prev : [...prev, maleta]));
  }, []);

  const setMaletasList = useCallback((list: MaletaSeleccionada[]) => {
    setMaletas(list.slice(0, 2));
  }, []);

  const clearReserva = useCallback(() => setMaletas([]), []);

  return (
    <ReservaContext.Provider value={{ maletas, addMaleta, setMaletas: setMaletasList, clearReserva }}>
      {children}
    </ReservaContext.Provider>
  );
}

export function useReserva() {
  const ctx = useContext(ReservaContext);
  if (!ctx) throw new Error("useReserva debe usarse dentro de ReservaProvider");
  return ctx;
}
