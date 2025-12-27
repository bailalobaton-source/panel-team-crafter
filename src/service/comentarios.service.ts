import instance from "./axiosInstance";

export async function getComentariosClase(id: string | number) {
  const res = await instance.get(`/comentario-clase-admin/${id}`);

  return res.data.comentarios;
}

export async function deleteComentariosClase(id: string | number) {
  const res = await instance.delete(`/comentario-clase-admin/${id}`);

  return res.data;
}

export async function getRespuestaComentario(id: string | number) {
  const res = await instance.get(`/respuesta-comentario-clase-admin/${id}`);

  return res.data.respuestas;
}

export async function deleteRespuestaComentario(id: string | number) {
  const res = await instance.delete(`/respuesta-comentario-clase-admin/${id}`);

  return res.data.respuestas;
}
