"use client";

import { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import instance from "@/src/service/axiosInstance";

ChartJS.register(ArcElement, Tooltip, Legend);

interface PlanData {
  planId: number;
  plan: string; // Nombre del plan
  precio: string;
  total: number; // Cantidad vendida
}

export default function PlanAnalytics() {
  const [plans, setPlans] = useState<PlanData[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalSales, setTotalSales] = useState(0);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        // Asumo que esta es la ruta basada en tu controlador
        const res = await instance.get("/suscripcion-admin/analytics-planes");
        if (res.data.status === "success") {
          const data: PlanData[] = res.data.planes;
          setPlans(data);
          setTotalSales(data.reduce((acc, curr) => acc + curr.total, 0));
        }
      } catch (error) {
        console.error("Error fetching plan analytics", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPlans();
  }, []);

  // Paleta de colores moderna
  const colors = [
    "#3b82f6", // Blue 500
    "#10b981", // Emerald 500
    "#f59e0b", // Amber 500
    "#8b5cf6", // Violet 500
    "#ec4899", // Pink 500
  ];

  const chartData = {
    labels: plans.map((p) => p.plan),
    datasets: [
      {
        data: plans.map((p) => p.total),
        backgroundColor: colors,
        borderWidth: 0,
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    cutout: "75%", // Hace la dona más fina
    plugins: {
      legend: { display: false }, // Ocultamos la leyenda por defecto para hacer una personalizada
      tooltip: {
        backgroundColor: "#1e293b",
        callbacks: {
          label: (ctx: any) => ` ${ctx.raw} ventas`,
        },
      },
    },
  };

  return (
    <div className="w-full h-full min-h-[400px] rounded-2xl border border-gray-200 bg-white p-6 shadow-sm flex flex-col">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-gray-800">
          Distribución por Plan
        </h3>
        <p className="text-xs text-gray-500">
          Rendimiento anual por tipo de plan
        </p>
      </div>

      {loading ? (
        <div className="flex-1 flex items-center justify-center animate-pulse">
          <div className="w-32 h-32 rounded-full bg-gray-200"></div>
        </div>
      ) : plans.length === 0 ? (
        <div className="flex-1 flex items-center justify-center text-gray-400 text-sm">
          Sin datos anuales
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center relative">
          {/* Gráfica */}
          <div className="relative w-[220px] h-[220px]">
            <Doughnut data={chartData} options={options} />
            {/* Texto Central */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-3xl font-bold text-gray-800">
                {totalSales}
              </span>
              <span className="text-xs text-gray-500 font-medium uppercase">
                Total
              </span>
            </div>
          </div>

          {/* Leyenda Personalizada */}
          <div className="mt-8 w-full space-y-3">
            {plans.map((p, i) => (
              <div
                key={p.planId}
                className="flex items-center justify-between text-sm"
              >
                <div className="flex items-center gap-2">
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: colors[i % colors.length] }}
                  />
                  <span className="text-gray-600 font-medium">{p.plan}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-gray-400 text-xs">$/ {p.precio}</span>
                  <span className="font-bold text-gray-800">{p.total}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
