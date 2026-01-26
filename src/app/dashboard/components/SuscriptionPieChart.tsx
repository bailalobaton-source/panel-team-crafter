"use client";

import { SubscriptionAnalyticsResponse } from "@/src/interfaces/suscripcion.interface";
import { getSuscriptionAnalytics } from "@/src/service/analytics.service";
import { handleAxiosError } from "@/utils/errorHandler";
import { useCallback, useEffect, useMemo, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

/**
 * 🎨 Colores profesionales por estado
 */
const STATUS_COLORS: Record<string, string> = {
  activa: "#16A34A", // verde
  pendiente: "#ff860d", // naranja
  expirada: "#1184ff", // gris
  cancelada: "#DC2626", // rojo
};

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
  if (!active || !payload || !payload.length) return null;

  const { name, value, fill } = payload[0];

  return (
    <div className="bg-white/90 backdrop-blur px-3 py-1.5 rounded-lg shadow text-xs">
      <p className="font-medium" style={{ color: fill }}>
        {name}
      </p>
      <p className="text-neutral-600">{value} suscripciones</p>
    </div>
  );
};

export default function SuscriptionPieChart() {
  const [dataAnalytics, setDataAnalytics] =
    useState<SubscriptionAnalyticsResponse | null>(null);

  const gfindAnalytics = useCallback(async () => {
    try {
      const res = await getSuscriptionAnalytics();
      setDataAnalytics(res);
    } catch (err) {
      console.log(err);

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

    return dataAnalytics.data.map((item) => ({
      name: item.status,
      value: item.total,
      fill: STATUS_COLORS[item.status],
    }));
  }, [dataAnalytics]);

  return (
    <div className="w-80  bg-white/70 backdrop-blur-xl rounded-2xl py-4 shadow-lg">
      <h3 className="text-pink-600 font-semibold px-4 text-sm ">
        Estados Suscripciones {dataAnalytics?.year}
      </h3>

      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            innerRadius={45}
            // outerRadius={105}
            paddingAngle={1}
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Pie>

          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
