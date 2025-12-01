import instance from "./axiosInstance";

export async function getBanner() {
  const res = await instance.get(`/banner`);
  return res.data.banners;
}

export async function postBanner(data: FormData) {
  const res = await instance.post(`/banner`, data);

  return res.data.banner;
}

export async function updateBanner(data: FormData, id: number) {
  const res = await instance.patch(`/banner/${id}`, data);

  return res.data.banne;
}

export async function deleteBanner(id: number) {
  const res = await instance.delete(`/banner/${id}`);

  return res.data;
}
