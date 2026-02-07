import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Formatea un monto en pesos colombianos (COP). Ej: 45000 → "$45.000" */
export function formatCop(amount: number): string {
  return `$${amount.toLocaleString("es-CO", { maximumFractionDigits: 0 })}`;
}
