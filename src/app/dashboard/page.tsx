"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BiTrendingUp,
  BiUserCheck,
  BiWallet,
  BiTimeFive,
} from "react-icons/bi";
import PeriodFilter from "./components/PeriodFilter";
import LineAnalytics from "./components/LineAnalytics";
import PlanAnalytics from "./components/PlanAnalytics";
import AnalyticsSkeleton from "./components/AnalyticsSkeleton";
import instance from "@/src/service/axiosInstance";
import { format } from "date-fns";
import { es } from "date-fns/locale";
export type PeriodType = "day" | "week" | "month" | "year";
export interface AnalyticsItem {
  label: string | number;
  total: number;
}

export default function Inicio() {
  const [lineData, setLineData] = useState<AnalyticsItem[]>([]);
  const [currentPeriod, setCurrentPeriod] = useState<PeriodType>("month");
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    revenue: 0,
    subscriptions: 0,
    users: 0,
    recent: [],
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await instance.get("/suscripcion-admin/stats");
        setStats(res.data.data);
      } catch (e) {
        console.error("Error fetching stats", e);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading)
    return (
      <div className="p-8">
        <AnalyticsSkeleton />
      </div>
    );

  return (
    <main className="w-full min-h-screen bg-[#F8FAFC] pb-12 overflow-y-auto">
      <div className="max-w-[1400px] mx-auto p-6 space-y-6">
        {/* HEADER */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-2">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Dashboard de Negocio
            </h1>
            <p className="text-slate-500">
              Panel de control y métricas en tiempo real
            </p>
          </div>
          <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-200 flex items-center gap-2 text-sm font-medium text-slate-600">
            <BiTimeFive className="text-blue-500" />
            Actualizado: {format(new Date(), "HH:mm aa")}
          </div>
        </header>

        {/* TOP KPI CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard
            title="Ingresos Brutos"
            value={`$/ ${stats.revenue.toFixed(2)}`}
            icon={<BiWallet />}
            color="text-blue-600"
            bg="bg-blue-50"
          />
          <StatCard
            title="Total Suscripciones"
            value={stats.subscriptions}
            icon={<BiTrendingUp />}
            color="text-emerald-600"
            bg="bg-emerald-50"
          />
          <StatCard
            title="Clientes Únicos"
            value={stats.users}
            icon={<BiUserCheck />}
            color="text-violet-600"
            bg="bg-violet-50"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* COLUMNA IZQUIERDA: GRÁFICA Y TABLA */}
          <div className="lg:col-span-2 space-y-6">
            <section className="space-y-4">
              <PeriodFilter
                setData={setLineData}
                onPeriodChange={setCurrentPeriod}
              />
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <LineAnalytics data={lineData} period={currentPeriod} />
              </motion.div>
            </section>

            {/* TABLA DE ÚLTIMAS VENTAS */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
            >
              <div className="p-6 border-b border-slate-100">
                <h3 className="font-bold text-slate-800">
                  Suscripciones Recientes
                </h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 text-slate-500 font-semibold">
                    <tr>
                      <th className="px-6 py-4">Usuario</th>
                      <th className="px-6 py-4">Fecha</th>
                      <th className="px-6 py-4">Monto</th>
                      <th className="px-6 py-4">Estado</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {stats.recent.map((sub: any) => (
                      <tr
                        key={sub.id}
                        className="hover:bg-slate-50/50 transition-colors"
                      >
                        <td className="px-6 py-4 font-mono text-xs text-slate-500">
                          {sub.usuario.nombre}...
                        </td>
                        <td className="px-6 py-4 text-slate-600">
                          {format(new Date(sub.createdAt), "d MMM, HH:mm", {
                            locale: es,
                          })}
                        </td>
                        <td className="px-6 py-4 font-bold text-slate-800">
                          $/ {sub.precio}
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-1 rounded-full text-[10px] font-bold uppercase bg-emerald-100 text-emerald-700">
                            {sub.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>

          {/* COLUMNA DERECHA: DONA */}
          <div className="lg:col-span-1">
            <PlanAnalytics />
          </div>
        </div>
      </div>
    </main>
  );
}

function StatCard({ title, value, icon, color, bg }: any) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-5 transition-all"
    >
      <div className={`${bg} ${color} p-4 rounded-2xl text-3xl shadow-inner`}>
        {icon}
      </div>
      <div>
        <p className="text-sm font-semibold text-slate-400 uppercase tracking-wider">
          {title}
        </p>
        <h3 className="text-3xl font-black text-slate-800">{value}</h3>
      </div>
    </motion.div>
  );
}
