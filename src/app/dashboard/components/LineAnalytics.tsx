"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
  Legend,
  ChartOptions,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";
import { AnalyticsItem, PeriodType } from "../page";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
  Legend,
);

interface Props {
  data: AnalyticsItem[];
  period: PeriodType;
}

export default function LineAnalytics({ data, period }: Props) {
  // Función para formatear las etiquetas del Eje X según el tipo de periodo
  const getFormattedLabel = (rawLabel: string | number) => {
    if (period === "day") {
      // El backend devuelve horas (ej: 14), añadimos formato hora
      return `${rawLabel}:00`;
    }
    if (period === "year") {
      // El backend devuelve número de mes (1-12 SQL). Convertimos a nombre.
      const monthIndex = Number(rawLabel) - 1; // JS es 0-11
      const date = new Date(2024, monthIndex, 1);
      return format(date, "MMM", { locale: es }); // Ene, Feb
    }
    // Para week y month, el backend suele devolver fecha completa (YYYY-MM-DD)
    try {
      if (typeof rawLabel === "string" && rawLabel.includes("-")) {
        const date = parseISO(rawLabel);
        return format(date, "d MMM", { locale: es });
      }
    } catch (e) {
      return rawLabel;
    }
    return rawLabel;
  };

  const chartData = {
    labels: data.map((d) => getFormattedLabel(d.label)),
    datasets: [
      {
        label: "Nuevas Suscripciones",
        data: data.map((d) => d.total),
        borderColor: "#3b82f6", // blue-500
        backgroundColor: (context: any) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 300);
          gradient.addColorStop(0, "rgba(59, 130, 246, 0.2)"); // Azul arriba
          gradient.addColorStop(1, "rgba(59, 130, 246, 0)"); // Transparente abajo
          return gradient;
        },
        tension: 0.4, // Curva suave
        fill: true,
        pointRadius: 4,
        pointBackgroundColor: "#fff",
        pointBorderColor: "#3b82f6",
        pointBorderWidth: 2,
        pointHoverRadius: 6,
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#1e293b",
        padding: 12,
        titleFont: { size: 13 },
        bodyFont: { size: 13 },
        displayColors: false,
        callbacks: {
          label: (ctx) => `📈 ${ctx.parsed.y} suscripciones`,
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: "#9ca3af", font: { size: 11 } },
      },
      y: {
        beginAtZero: true,
        border: { dash: [4, 4] }, // Líneas punteadas
        grid: { color: "#f3f4f6" },
        ticks: { color: "#9ca3af", precision: 0 },
      },
    },
  };

  return (
    <div className="w-full h-[400px] rounded-2xl border border-gray-200 bg-white p-6 shadow-sm relative overflow-hidden">
      <div className="flex flex-col mb-6">
        <h3 className="text-lg font-bold text-gray-800">
          Tendencia de Ingresos
        </h3>
        <p className="text-xs text-gray-500">
          Visualización de altas en el periodo seleccionado
        </p>
      </div>

      <div className="h-[300px] w-full">
        {data.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-400">
            <span className="text-4xl mb-2">📊</span>
            <p className="text-sm">No hay datos registrados en este periodo</p>
          </div>
        ) : (
          <Line data={chartData} options={options} />
        )}
      </div>
    </div>
  );
}
