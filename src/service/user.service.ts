import instance from "./axiosInstance";

export async function getUser(filtros?: any) {
  const paramsLimpios = filtros
    ? Object.fromEntries(
        Object.entries(filtros).filter(
          ([_, value]) => value !== "" && value !== null && value !== undefined,
        ),
      )
    : {};

  const res = await instance.get(`/user-admin`, {
    params: paramsLimpios,
  });

  return res.data.users;
}

export async function updateUser(id: string, data: any) {
  const res = await instance.patch(`/user-admin/${id}`, data);
  return res.data;
}
