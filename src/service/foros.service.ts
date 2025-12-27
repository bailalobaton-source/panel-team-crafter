import { Descuento } from "../interfaces/descuento.interface";
import instance from "./axiosInstance";

export async function getForos() {
  const res = await instance.get(`/foro-admin`);

  return res.data.foros;
}

export async function postForo(data: Descuento) {
  const res = await instance.post(`/foro-admin`, data);

  return res.data.foros;
}

export async function updateForo(id: number, data: Descuento) {
  const res = await instance.patch(`/descuento/${id}`, data);

  return res.data.descuento;
}

export async function deleteForo(id: number) {
  const res = await instance.delete(`/foro-admin/${id}`);

  return res.data;
}

export async function getComentarioForo(id: number) {
  const res = await instance.get(`/comentario-foro-admin/${id}`);

  return res.data.comentarioForos;
}

export async function deleteComentarioForo(id: number) {
  const res = await instance.delete(`/comentario-foro-admin/${id}`);

  return res.data.comentarioForos;
}

export async function getRespuestaComentarioForo(id: number) {
  const res = await instance.get(`/respuesta-comentario-foro-admin/${id}`);

  return res.data.respuestas;
}

export async function deleteRespuestaComentarioForo(id: number) {
  const res = await instance.delete(`/respuesta-comentario-foro-admin/${id}`);

  return res.data.respuestas;
}
