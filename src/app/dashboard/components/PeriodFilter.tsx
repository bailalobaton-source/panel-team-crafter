"use client";

import { Button } from "@heroui/react";
import { useEffect, useState } from "react";
import {
  addDays,
  addWeeks,
  addMonths,
  addYears,
  format,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear,
} from "date-fns";
import { es } from "date-fns/locale"; // IMPORTANTE: Locale Español
import { BiChevronLeft, BiChevronRight, BiCalendar } from "react-icons/bi";
import instance from "@/src/service/axiosInstance";
import { AnalyticsItem, PeriodType } from "../page";

interface Props {
  setData: (e: AnalyticsItem[]) => void;
  onPeriodChange: (p: PeriodType) => void;
  onRangeChange?: (from: Date, to: Date) => void;
}

export default function PeriodFilter({
  setData,
  onPeriodChange,
  onRangeChange,
}: Props) {
  const [period, setPeriod] = useState<PeriodType>("month");
  const [baseDate, setBaseDate] = useState(new Date());
  const [loading, setLoading] = useState(false);

  // Sincronizar el estado del padre
  useEffect(() => {
    onPeriodChange(period);
    if (onRangeChange) {
      onRangeChange(range.from, range.to);
    }
  }, [period, onPeriodChange]);

  const range = (() => {
    const opts = { weekStartsOn: 1 as const }; // Lunes
    switch (period) {
      case "day":
        return { from: baseDate, to: baseDate };
      case "week":
        return {
          from: startOfWeek(baseDate, opts),
          to: endOfWeek(baseDate, opts),
        };
      case "month":
        return { from: startOfMonth(baseDate), to: endOfMonth(baseDate) };
      case "year":
        return { from: startOfYear(baseDate), to: endOfYear(baseDate) };
    }
  })();

  const move = (dir: "prev" | "next") => {
    const amount = dir === "next" ? 1 : -1;
    const actions = {
      day: addDays,
      week: addWeeks,
      month: addMonths,
      year: addYears,
    };
    setBaseDate(actions[period](baseDate, amount));
  };

  // FORMATO PERÚ (es-PE style)
  const label = (() => {
    const opts = { locale: es };
    switch (period) {
      case "day":
        return format(baseDate, "EEEE d 'de' MMMM, yyyy", opts); // lunes 2 de octubre, 2023
      case "week":
        return `${format(range.from, "d MMM", opts)} – ${format(range.to, "d MMM yyyy", opts)}`;
      case "month":
        return format(baseDate, "MMMM yyyy", opts);
      case "year":
        return format(baseDate, "yyyy", opts);
    }
  })();

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        // Aseguramos formato ISO completo para el backend
        const res = await instance.get(`/suscripcion-admin/analytics`, {
          params: {
            type: period,
            from: range.from.toISOString(),
            to: range.to.toISOString(),
          },
        });
        setData(res.data.data);
      } catch (error) {
        console.error("Error analytics", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, [period, baseDate]);

  return (
    <div className="w-full bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Título e Indicador de Fecha */}
        <div className="flex items-center gap-3 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
          <div className="p-2 bg-white rounded-md shadow-sm text-blue-600">
            <BiCalendar size={20} />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">
              Periodo seleccionado
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => move("prev")}
                className="hover:text-blue-600 transition-colors"
              >
                <BiChevronLeft size={20} />
              </button>
              <span className="text-sm font-bold text-gray-800 capitalize min-w-[140px] text-center select-none">
                {label}
              </span>
              <button
                onClick={() => move("next")}
                className="hover:text-blue-600 transition-colors"
              >
                <BiChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Selector Tipo Segmented Control */}
        <div className="flex bg-gray-100 p-1 rounded-xl">
          {(["day", "week", "month", "year"] as const).map((key) => {
            const labels: Record<string, string> = {
              day: "Día",
              week: "Semana",
              month: "Mes",
              year: "Año",
            };
            const isActive = period === key;
            return (
              <button
                key={key}
                onClick={() => setPeriod(key)}
                className={`
                  relative px-4 py-1.5 text-xs font-semibold rounded-lg transition-all duration-200
                  ${isActive ? "text-gray-900 shadow-sm bg-white" : "text-gray-500 hover:text-gray-700"}
                `}
              >
                {labels[key]}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
