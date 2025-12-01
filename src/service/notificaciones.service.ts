import { Notificacion } from "../interfaces/notificaciones.interface";
import instance from "./axiosInstance";

export async function getNotificaciones() {
  const res = await instance.get(`/notificaciones`);
  return res.data.notificaciones;
}

export async function postNotificaciones(data: Notificacion) {
  const res = await instance.post(`/notificaciones`, data);

  return res.data.notificaciones;
}

export async function updateNotificaciones(data: Notificacion, id: number) {
  const res = await instance.patch(`/notificaciones/${id}`, data);

  return res.data.notificaciones;
}

export async function deleteNotificaciones(id: number) {
  const res = await instance.delete(`/notificaciones/${id}`);

  return res.data;
}
