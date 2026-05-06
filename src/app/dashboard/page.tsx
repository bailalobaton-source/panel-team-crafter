"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  LuTrendingUp,
  LuUsers,
  LuWallet,
  LuClock,
  LuActivity,
} from "react-icons/lu";
import PeriodFilter from "./components/PeriodFilter";
import LineAnalytics from "./components/LineAnalytics";
import PlanAnalytics from "./components/PlanAnalytics";
import AnalyticsSkeleton from "./components/AnalyticsSkeleton";
import instance from "@/src/service/axiosInstance";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { handleAxiosError } from "@/utils/errorHandler";

export type PeriodType = "day" | "week" | "month" | "year";
export interface AnalyticsItem {
  label: string | number;
  total: number;
}

// Configuración de animaciones escalonadas
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
};

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
        handleAxiosError(e);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading)
    return (
      <div className="p-8 max-w-[1400px] mx-auto">
        <AnalyticsSkeleton />
      </div>
    );

  return (
    <main className="w-full min-h-screen bg-slate-50/50 pb-12 overflow-y-auto">
      <motion.div
        className="max-w-[1400px] mx-auto p-6 md:p-8 space-y-8"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {/* HEADER */}
        <motion.header
          variants={itemVariants}
          className="flex flex-col md:flex-row md:items-end justify-between gap-4"
        >
          <div className="space-y-1">
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <LuActivity className="text-pink-500" />
              Resumen del Negocio
            </h1>
            <p className="text-sm text-slate-500 font-medium">
              Métricas y rendimiento en tiempo real
            </p>
          </div>
          <div className="bg-white px-4 py-2.5 rounded-xl shadow-sm border border-slate-200/60 flex items-center gap-2.5 text-xs font-semibold text-slate-600 w-fit">
            <div className="p-1 bg-blue-50 rounded-md">
              <LuClock className="text-blue-500 text-sm" />
            </div>
            Actualizado hoy, {format(new Date(), "HH:mm", { locale: es })}
          </div>
        </motion.header>

        {/* TOP KPI CARDS */}
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
        >
          <StatCard
            title="Ingresos Brutos"
            value={stats.revenue.toFixed(2)}
            prefix="S/ "
            icon={<LuWallet />}
            color="text-blue-600"
            bg="bg-blue-50"
            ring="ring-blue-100"
          />
          <StatCard
            title="Suscripciones Activas"
            value={stats.subscriptions}
            icon={<LuTrendingUp />}
            color="text-pink-600"
            bg="bg-pink-50"
            ring="ring-pink-100"
          />
          <StatCard
            title="Usuarios con Acceso"
            value={stats.users}
            icon={<LuUsers />}
            color="text-violet-600"
            bg="bg-violet-50"
            ring="ring-violet-100"
          />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* COLUMNA IZQUIERDA: GRÁFICA Y TABLA */}
          <div className="lg:col-span-2 space-y-6">
            {/* GRÁFICA */}
            <motion.section variants={itemVariants} className="space-y-4">
              <PeriodFilter
                setData={setLineData}
                onPeriodChange={setCurrentPeriod}
              />
              <div className="bg-white p-1 rounded-2xl border border-slate-200/60 shadow-sm">
                <LineAnalytics data={lineData} period={currentPeriod} />
              </div>
            </motion.section>

            {/* TABLA DE ÚLTIMAS VENTAS */}
            <motion.div
              variants={itemVariants}
              className="bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden"
            >
              <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
                <h3 className="font-bold text-slate-800 text-base">
                  Transacciones Recientes
                </h3>
                <span className="text-xs font-semibold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-md">
                  Últimos movimientos
                </span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50/50 text-slate-500 text-[11px] uppercase tracking-wider font-semibold">
                    <tr>
                      <th className="px-6 py-4">Usuario</th>
                      <th className="px-6 py-4">Fecha</th>
                      <th className="px-6 py-4">Monto</th>
                      <th className="px-6 py-4">Estado</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {stats.recent.map((sub: any) => {
                      const initial =
                        sub.usuario?.nombre?.charAt(0).toUpperCase() || "?";

                      return (
                        <tr
                          key={sub.id}
                          className="hover:bg-slate-50/80 transition-colors group"
                        >
                          {/* Usuario con Avatar */}
                          <td className="px-6 py-3.5">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-xs text-slate-600 group-hover:bg-pink-50 group-hover:text-pink-600 group-hover:border-pink-100 transition-colors">
                                {initial}
                              </div>
                              <span className="font-medium text-slate-700 capitalize">
                                {sub.usuario.nombre.toLowerCase()}
                              </span>
                            </div>
                          </td>
                          {/* Fecha */}
                          <td className="px-6 py-3.5 text-slate-500 text-[13px]">
                            {format(
                              new Date(sub.createdAt),
                              "d MMM, yyyy - HH:mm",
                              {
                                locale: es,
                              },
                            )}
                          </td>
                          {/* Monto */}
                          <td className="px-6 py-3.5">
                            <span className="font-bold text-slate-800">
                              S/ {Number(sub.precio).toFixed(2)}
                            </span>
                          </td>
                          {/* Estado (Badge moderno) */}
                          <td className="px-6 py-3.5">
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wide bg-emerald-50 text-emerald-600 border border-emerald-100">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                              {sub.status || "Activo"}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                {stats.recent.length === 0 && (
                  <div className="p-8 text-center text-slate-400 text-sm">
                    No hay transacciones recientes.
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {/* COLUMNA DERECHA: DONA */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <div className="bg-white p-1 rounded-2xl border border-slate-200/60 shadow-sm h-full">
              <PlanAnalytics />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </main>
  );
}

// Componente Tarjeta KPI
function StatCard({ title, value, icon, color, bg, ring, prefix = "" }: any) {
  return (
    <motion.div
      variants={itemVariants}
      className="relative bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm flex items-center gap-5 overflow-hidden group hover:shadow-md transition-shadow duration-300"
    >
      {/* Decoración de fondo invisible que aparece al hacer hover */}
      <div
        className={`absolute -right-8 -top-8 w-32 h-32 rounded-full opacity-0 ${bg} group-hover:opacity-20 transition-all duration-500 transform group-hover:scale-150`}
      />

      {/* Icono */}
      <div
        className={`${bg} ${color} ${ring} ring-1 p-4 rounded-2xl text-2xl relative z-10`}
      >
        {icon}
      </div>

      {/* Textos */}
      <div className="relative z-10">
        <p className="text-[13px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
          {title}
        </p>
        <h3 className="text-3xl font-black text-slate-800 flex items-baseline gap-1">
          {prefix && (
            <span className="text-xl font-bold text-slate-400">{prefix}</span>
          )}
          {value}
        </h3>
      </div>
    </motion.div>
  );
}
