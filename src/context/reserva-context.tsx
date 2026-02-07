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
  dias: number;
  addMaleta: (maleta: MaletaSeleccionada) => void;
  setMaletas: (maletas: MaletaSeleccionada[]) => void;
  setDias: (dias: number) => void;
  clearReserva: () => void;
}

const ReservaContext = createContext<ReservaContextValue | null>(null);

const CATALOGO: Record<TipoMaleta, Omit<MaletaSeleccionada, "tipo">> = {
  bodega: {
    caracteristica1: "55×40×23 cm",
    caracteristica2: "Hasta 23 kg",
    precio: 45000,
  },
  cabina: {
    caracteristica1: "55×35×20 cm",
    caracteristica2: "Hasta 10 kg",
    precio: 35000,
  },
};

export function getCaracteristicasYPrecio(tipo: TipoMaleta): Omit<MaletaSeleccionada, "tipo"> {
  return { ...CATALOGO[tipo] };
}

export function createMaletaSeleccionada(tipo: TipoMaleta): MaletaSeleccionada {
  const data = CATALOGO[tipo];
  return { tipo, ...data };
}

export const DIAS_MIN = 1;
export const DIAS_MAX = 90;

export function ReservaProvider({ children }: { children: ReactNode }) {
  const [maletas, setMaletas] = useState<MaletaSeleccionada[]>([]);
  const [dias, setDiasState] = useState<number>(1);

  const addMaleta = useCallback((maleta: MaletaSeleccionada) => {
    setMaletas((prev) => (prev.length >= 2 ? prev : [...prev, maleta]));
  }, []);

  const setMaletasList = useCallback((list: MaletaSeleccionada[]) => {
    setMaletas(list.slice(0, 2));
  }, []);

  const setDias = useCallback((d: number) => {
    const value = Math.max(DIAS_MIN, Math.min(DIAS_MAX, Math.round(Number(d)) || DIAS_MIN));
    setDiasState(value);
  }, []);

  const clearReserva = useCallback(() => {
    setMaletas([]);
    setDiasState(1);
  }, []);

  return (
    <ReservaContext.Provider value={{ maletas, dias, addMaleta, setMaletas: setMaletasList, setDias, clearReserva }}>
      {children}
    </ReservaContext.Provider>
  );
}

export function useReserva() {
  const ctx = useContext(ReservaContext);
  if (!ctx) throw new Error("useReserva debe usarse dentro de ReservaProvider");
  return ctx;
}
