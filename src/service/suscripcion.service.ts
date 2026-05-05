import instance from "./axiosInstance";

export async function getSuscripcion(filters: any) {
  const params = new URLSearchParams();
  if (filters.fecha_inicio) params.append("fecha_inicio", filters.fecha_inicio);
  if (filters.fecha_final) params.append("fecha_final", filters.fecha_final);
  if (filters.status) params.append("status", filters.status); // Ahora sí coincidirá
  if (filters.plan_id) params.append("plan_id", filters.plan_id);
  if (filters.user_id) params.append("user_id", filters.user_id);

  const res = await instance.get(`/suscripcion-admin?${params.toString()}`);
  return res.data.suscripciones;
}

export async function postSuscripcion(data: any) {
  const res = await instance.post(`/suscripcion-admin`, data);

  return res.data.Suscripcion;
}

export async function updateSuscripcion(data: FormData, id: number) {
  const res = await instance.patch(`/suscripcion-admin/${id}`, data);

  return res.data.banne;
}

export async function deleteSuscripcion(id: number) {
  const res = await instance.delete(`/suscripcion-admin/${id}`);

  return res.data;
}
