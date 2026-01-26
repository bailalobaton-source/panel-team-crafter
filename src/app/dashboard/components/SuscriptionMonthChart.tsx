"use client";

import { MonthAnalyticsResponse } from "@/src/interfaces/suscripcion.interface";
import { getSuscriptionMonthAnalytics } from "@/src/service/analytics.service";
import { handleAxiosError } from "@/utils/errorHandler";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

/* =========================
   CONSTANTES
========================= */

const MONTHS = [
  "Ene",
  "Feb",
  "Mar",
  "Abr",
  "May",
  "Jun",
  "Jul",
  "Ago",
  "Sep",
  "Oct",
  "Nov",
  "Dic",
];

const PROFESSIONAL_COLORS = [
  "#1184ff",
  "#0D9488",
  "#7C3AED",
  "#DC2626",
  "#EA580C",
  "#CA8A04",
  "#16A34A",
  "#0891B2",
  "#9333EA",
  "#4B5563",
  "#BE185D",
  "#1F2937",
];

/* =========================
   EJE X PERSONALIZADO
========================= */

const CustomXAxisTick = ({ x, y, payload }: any) => {
  if (!payload) return null;

  return (
    <text
      x={x}
      y={(y ?? 0) + 12}
      textAnchor="middle"
      fill={PROFESSIONAL_COLORS[payload.index]}
      fontSize={10}
      fontWeight={500}
    >
      {payload.value}
    </text>
  );
};

/* =========================
   TOOLTIP PERSONALIZADO
========================= */

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;

  const { suscripciones, index, totalAnual } = payload[0].payload;
  const color = PROFESSIONAL_COLORS[index];

  return (
    <div
      className="rounded-md px-3 py-2 shadow"
      style={{
        backgroundColor: "white",
        border: `1px solid ${color}33`,
      }}
    >
      <p className="text-[10px] font-medium" style={{ color }}>
        {label}
      </p>

      <p className="text-[11px] font-semibold" style={{ color }}>
        {suscripciones} suscripciones
      </p>

      <p className="text-[10px] text-neutral-500">Total año: {totalAnual}</p>
    </div>
  );
};

export default function SuscriptionMonthChart() {
  const [dataAnalytics, setDataAnalytics] =
    useState<MonthAnalyticsResponse | null>(null);

  const gfindAnalytics = useCallback(async () => {
    try {
      const res = await getSuscriptionMonthAnalytics();
      setDataAnalytics(res);
    } catch (err) {
      handleAxiosError(err);
    }
  }, []);

  useEffect(() => {
    gfindAnalytics();
  }, [gfindAnalytics]);

  /* =========================
     TOTAL ANUAL
  ========================= */

  const totalAnual = useMemo(() => {
    if (!dataAnalytics) return 0;
    return dataAnalytics.data.reduce((acc, item) => acc + item.total, 0);
  }, [dataAnalytics]);

  /* =========================
     DATA UNIFICADA (12 MESES)
  ========================= */

  const chartData = useMemo(() => {
    return MONTHS.map((mes, index) => {
      const found = dataAnalytics?.data.find((d) => d.month === mes);
      return {
        mes,
        suscripciones: found ? found.total : 0,
        index,
        totalAnual,
      };
    });
  }, [dataAnalytics, totalAnual]);

  return (
    <div className="relative w-full bg-white/70 backdrop-blur-xl rounded-2xl p-4 shadow-lg flex gap-4">
      {/* =========================
          LISTA DE MESES
      ========================= */}
      <section className="flex flex-col">
        <h3 className="text-pink-600 text-nowrap text-sm font-semibold mb-3">
          Suscripciones en {dataAnalytics?.year}
        </h3>

        <ul className="w-28 flex flex-col gap-1">
          {chartData.map((item) => (
            <li
              key={item.mes}
              className="flex items-center justify-between text-xs"
            >
              <div className="flex items-center gap-2">
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: PROFESSIONAL_COLORS[item.index] }}
                />
                <span className="text-neutral-700">{item.mes}</span>
              </div>

              <span
                className="font-semibold"
                style={{ color: PROFESSIONAL_COLORS[item.index] }}
              >
                {item.suscripciones}
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* =========================
          GRÁFICO
      ========================= */}
      <div className="w-full  pb-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <XAxis
              dataKey="mes"
              tickLine={false}
              axisLine={false}
              tick={<CustomXAxisTick />}
            />
            <YAxis hide />
            <Tooltip
              cursor={{ fill: "rgba(0,0,0,0.04)" }}
              content={<CustomTooltip />}
            />

            <Bar dataKey="suscripciones" barSize={18} radius={[4, 4, 0, 0]}>
              {chartData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={PROFESSIONAL_COLORS[index]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <p className=" absolute bottom-2  right-4 text-xs font-bold text-red-500 transition-all duration-300">
        {totalAnual} suscripciones
      </p>
    </div>
  );
}
