import { User } from "./user.type";

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
  nombre_plan: string;
  interval_count: number;
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

export interface SubscriptionType {
  id: number;
  user_id: string; // UUID
  plan_id: number | null;
  precio: number;
  status: SubscriptionStatus;
  plan: PlanAnalyticsItem;
  usuario: User;
  startDate: string | null; // ISO Date
  endDate: string | null; // ISO Date

  suscripcion_id_paypal: string | null;
  flow_subscription_id: string | null;

  motivo_cancelacion: string | null;
  fecha_cancelacion: string | null; // ISO Date

  createdAt?: string;
  updatedAt?: string;
}
