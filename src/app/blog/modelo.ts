export interface ArticuloMeta {
  slug: string;
  titulo: string;
  descripcion: string;
  /** AAAA-MM-DD */
  fecha: string;
  etiquetas: string[];
  minutos: number;
}

export interface CuerpoArticulo {
  html: string;
  indice: { id: string; texto: string }[];
}
