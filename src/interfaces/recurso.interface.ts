import {
  CategoriaClase,
  TipClase,
} from "./ajustes/categoriasTipsClase.interface";
import { Clase } from "./clase.interface";

export interface FormRecurso {
  imagen_recurso: File[] | null;
  nombre_recurso: string;
  nombre_recurso_en: string;

  fecha_caducidad: string;
  tipo_recurso: string;
  categoria_recurso: string;
  link_recurso: string;
  img_recurso: string;
  clase_id: string;
  tipo_recurso_id: string;
  categoria_recurso_id: string;
}

export interface Recurso {
  id: number;
  imagen_recurso: string;
  nombre_recurso: string;
  nombre_recurso_en: string;
  fecha_caducidad: string;
  tipo_recurso: string;
  categoria_recurso: string;
  link_recurso: string;
  img_recurso: string;
  clase: Clase;
  clase_id: string;
  tipo_recurso_id: string;
  categoria_recurso_id: string;
  categorias_ids: CategoriaRecursoId[];
  tipos_ids: TipRecursoId[];
}

export interface CategoriaRecursoId {
  id: number;
  clase_id: number;
  categoria_recurso_id: number;
  categoria_recurso: CategoriaClase;
}

export interface TipRecursoId {
  id: number;
  recurso_id: number;
  tipo_recurso_id: number;
  tipo_recurso: TipClase;
}
