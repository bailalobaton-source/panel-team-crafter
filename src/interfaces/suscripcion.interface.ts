export type SubscriptionStatus =
  | "activa"
  | "expirada"
  | "cancelada"
  | "pendiente";

export interface SubscriptionAnalyticsItem {
  status: SubscriptionStatus;
  total: number;
}

export interface SubscriptionAnalyticsResponse {
  status: "success";
  year: number;
  data: SubscriptionAnalyticsItem[];
}

export interface PlanAnalyticsItem {
  planId: number;
  plan: string;
  precio: number;
  total: number;
}

export interface PlanAnalyticsResponse {
  status: "success";
  year: number;
  planes: PlanAnalyticsItem[];
}

export interface MonthAnalyticsItem {
  month: string; // Ene, Feb, Mar...
  total: number; // total de suscripciones
}

/* =========================
   RESPONSE GENERAL
========================= */
export interface MonthAnalyticsResponse {
  status: "success";
  year: number;
  data: MonthAnalyticsItem[];
}
