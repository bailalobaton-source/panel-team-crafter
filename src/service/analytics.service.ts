import instance from "./axiosInstance";

export async function getUserAnalytics() {
  const res = await instance.get(`/user-admin/analytics`);

  return res.data;
}

export async function getSuscriptionAnalytics() {
  const res = await instance.get(`/suscripcion-admin/analytics`);

  return res.data;
}

export async function getPlannAnalytics() {
  const res = await instance.get(`/suscripcion-admin/analytics-plan`);
  return res.data;
}

export async function getSuscriptionMonthAnalytics() {
  const res = await instance.get(`/suscripcion-admin/analytics-months`);
  return res.data;
}
