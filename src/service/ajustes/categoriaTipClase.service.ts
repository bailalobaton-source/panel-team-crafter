import {
  CategoriaClase,
  TipClase,
} from "@/src/interfaces/ajustes/categoriasTipsClase.interface";
import instance from "../axiosInstance";

export async function getCategoriaClase() {
  const res = await instance.get(`/ajustes/categorias-clase`);
  return res.data.categorias;
}

export async function postCategoriaClase(data: CategoriaClase) {
  const res = await instance.post(`/ajustes/categorias-clase`, data);

  return res.data.categoria;
}

export async function updateCategoriaClase(data: CategoriaClase, id: number) {
  const res = await instance.patch(`/ajustes/categorias-clase/${id}`, data);

  return res.data.categoria;
}

export async function deleteCategoriaClase(id: number) {
  const res = await instance.delete(`/ajustes/categorias-clase/${id}`);

  return res.data;
}

// tips

export async function getTipsClase() {
  const res = await instance.get(`/ajustes/tips-clase`);
  return res.data.tips;
}

export async function postTipsClase(data: TipClase) {
  const res = await instance.post(`/ajustes/tips-clase`, data);

  return res.data.tip;
}

export async function updateTipsClase(data: TipClase, id: number) {
  const res = await instance.patch(`/ajustes/tips-clase/${id}`, data);

  return res.data.tip;
}

export async function deleteTipsClase(id: number) {
  const res = await instance.delete(`/ajustes/tips-clase/${id}`);

  return res.data;
}
