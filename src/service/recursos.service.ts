import instance from "./axiosInstance";

export async function getRecursos() {
  const res = await instance.get(`/recurso-admin`);

  return res.data.recursos;
}

export async function postRecurso(id: number, data: FormData) {
  const res = await instance.post(`/recurso-admin/clase/${id}`, data);

  return res.data.recurso;
}

export async function postRecursoLibre(data: FormData) {
  const res = await instance.post(`/recurso-admin/`, data);

  return res.data.recurso;
}

export async function updateRecurso(id: number, data: FormData) {
  const res = await instance.patch(`/recurso-admin/${id}`, data);

  return res.data.recurso;
}

export async function deleteRecurso(id: number) {
  const res = await instance.delete(`/recurso-admin/${id}`);

  return res.data.recurso;
}
