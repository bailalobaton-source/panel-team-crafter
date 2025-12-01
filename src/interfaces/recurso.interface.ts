import { Clase } from "./clase.interface";

export interface FormRecurso {
  imagen_recurso: File[] | null;
  nombre_recurso: string;
  fecha_caducidad: string;
  tipo_recurso: string;
  categoria_recurso: string;
  link_recurso: string;
  img_recurso: string;
  clase_id: string;
}

export interface Recurso {
  id: number;
  imagen_recurso: string;
  nombre_recurso: string;
  fecha_caducidad: string;
  tipo_recurso: string;
  categoria_recurso: string;
  link_recurso: string;
  img_recurso: string;
  clase: Clase;
  clase_id: string;
}
