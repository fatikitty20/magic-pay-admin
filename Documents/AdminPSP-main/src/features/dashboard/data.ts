import type enCommon from "@/locales/en/common.json";

export type VarianteMetrica = "invertida" | "suave";
export type TonoSemantico = "info" | "success" | "destructive" | "muted";
export type TonoBarraAnalitica = "rayado" | "success" | "invertida" | "suave";

type LlavesAnidadas<T> = T extends object
  ? {
      [K in keyof T & string]: T[K] extends object ? `${K}.${LlavesAnidadas<T[K]>}` : K;
    }[keyof T & string]
  : never;

export type LlaveTraduccion = LlavesAnidadas<typeof enCommon>;

export interface Metrica {
  id: string;
  etiquetaKey?: LlaveTraduccion;
  etiqueta?: string;
  valor: string;
  ayudaKey?: LlaveTraduccion;
  ayuda?: string;
  variante: VarianteMetrica;
  detallePath?: string;
}
