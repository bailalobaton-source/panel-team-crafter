import { Descuento } from "../interfaces/descuento.interface";
import instance from "./axiosInstance";

export async function getDescuento() {
  const res = await instance.get(`/descuento`);
  return res.data.descuentos;
}

export async function postDescuento(data: Descuento) {
  const res = await instance.post(`/descuento`, data);

  return res.data.descuento;
}

export async function updateDescuento(id: number, data: Descuento) {
  const res = await instance.patch(`/descuento/${id}`, data);

  return res.data.descuento;
}

export async function deleteDescuento(id: number) {
  const res = await instance.delete(`/descuento/${id}`);

  return res.data;
}
