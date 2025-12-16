import { FormClase } from "../interfaces/clase.interface";
import instance from "./axiosInstance";

export async function getClases() {
  const res = await instance.get(`/clase-admin`);

  return res.data.clases;
}

export async function postClase(data: FormClase) {
  const res = await instance.post(`/clase-admin`, data);

  return res.data.clase;
}

export async function updateClase(data: FormClase, id: number) {
  const res = await instance.patch(`/clase-admin/${id}`, data);

  return res.data.clase;
}

export async function deleteClase(id: number) {
  const res = await instance.delete(`/clase-admin/${id}`);

  return res.data;
}
