"use client";

import { PlanAnalyticsResponse } from "@/src/interfaces/suscripcion.interface";
import { getPlannAnalytics } from "@/src/service/analytics.service";
import { handleAxiosError } from "@/utils/errorHandler";
import { useCallback, useEffect, useMemo, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

/**
 * 🎨 Colores profesionales (se asignan dinámicamente)
 */
const PLAN_COLORS = ["#16A34A", "#ff11e3", "#7C3AED", "#1184ff"];

/**
 * 🧩 Tooltip personalizado
 */
const CustomTooltip = ({
  active,
  payload,
}: {
  active?: boolean;
  payload?: any[];
}) => {
  if (!active || !payload?.length) return null;

  const { name, value, fill } = payload[0];

  return (
    <div className="bg-white/90 backdrop-blur px-3 py-2 rounded-lg shadow text-xs">
      <p className="font-medium" style={{ color: fill }}>
        {name}
      </p>
      <p className="text-neutral-600">{value} suscripciones</p>
    </div>
  );
};

export default function PlanPieChart() {
  const [dataAnalytics, setDataAnalytics] =
    useState<PlanAnalyticsResponse | null>(null);

  const gfindAnalytics = useCallback(async () => {
    try {
      const res = await getPlannAnalytics();
      setDataAnalytics(res);
    } catch (err) {
      handleAxiosError(err);
    }
  }, []);

  useEffect(() => {
    gfindAnalytics();
  }, [gfindAnalytics]);

  /**
   * 🔹 Adaptar data para Recharts
   */
  const chartData = useMemo(() => {
    if (!dataAnalytics) return [];

    return dataAnalytics.planes.map((item, index) => ({
      name: item.plan,
      value: item.total,
      precio: item.precio,
      fill: PLAN_COLORS[index % PLAN_COLORS.length],
    }));
  }, [dataAnalytics]);

  const totalAnual = useMemo(() => {
    if (!dataAnalytics) return 0;
    return dataAnalytics.planes.reduce((acc, item) => acc + item.total, 0);
  }, [dataAnalytics]);

  return (
    <div className="relative  w-fit bg-white/70 backdrop-blur-xl rounded-2xl py-4 shadow-lg flex">
      <section className="flex flex-col gap-4  px-4 ">
        <h3 className="text-nowrap text-pink-600 font-semibold text-sm ">
          Suscripciones por plan · {dataAnalytics?.year}
        </h3>
        <ul className="text-nowrap flex flex-col gap-4">
          {chartData.map((item, index) => (
            <li
              key={index}
              className="flex items-center justify-between gap-4 text-xs"
            >
              <div className="flex items-center gap-2">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: PLAN_COLORS[index] }}
                />
                <span className=" text-black">
                  {item.name} $/{item.precio}
                </span>
              </div>

              <span className="" style={{ color: PLAN_COLORS[index] }}>
                {item.value} suscripciones
              </span>
            </li>
          ))}{" "}
        </ul>
      </section>

      <ResponsiveContainer width={300} height="100%">
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            innerRadius={50}
            paddingAngle={2}
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Pie>

          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
      <p className=" absolute bottom-2  right-4 text-xs font-bold text-red-500 transition-all duration-300">
        {totalAnual} suscripciones
      </p>
    </div>
  );
}
