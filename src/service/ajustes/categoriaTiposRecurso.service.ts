import {
  CategoriaClase,
  TipClase,
} from "@/src/interfaces/ajustes/categoriasTipsClase.interface";
import instance from "../axiosInstance";

export async function getCategoriaRecurso() {
  const res = await instance.get(`/ajustes/categorias-recurso`);
  return res.data.categorias;
}

export async function postCategoriaRecurso(data: CategoriaClase) {
  const res = await instance.post(`/ajustes/categorias-recurso`, data);

  return res.data.categoria;
}

export async function updateCategoriaRecurso(data: CategoriaClase, id: number) {
  const res = await instance.patch(`/ajustes/categorias-recurso/${id}`, data);

  return res.data.categoria;
}

export async function deleteCategoriaRecurso(id: number) {
  const res = await instance.delete(`/ajustes/categorias-recurso/${id}`);

  return res.data;
}

// tips

export async function getTiposRecurso() {
  const res = await instance.get(`/ajustes/tipo-recurso`);
  return res.data.tipos;
}

export async function postTiposRecurso(data: TipClase) {
  const res = await instance.post(`/ajustes/tipo-recurso`, data);

  return res.data.tipo;
}

export async function updateTiposRecurso(data: TipClase, id: number) {
  const res = await instance.patch(`/ajustes/tipo-recurso/${id}`, data);

  return res.data.tipo;
}

export async function deleteTiposRecurso(id: number) {
  const res = await instance.delete(`/ajustes/tipo-recurso/${id}`);

  return res.data;
}
