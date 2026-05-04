"use client";

import { SubscriptionType } from "@/src/interfaces/suscripcion.interface";
import { formatDateTimeFull } from "@/utils/formatCreatedAtDate";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Button,
  Tooltip,
} from "@heroui/react";
import { BsTrash2 } from "react-icons/bs";
import { SiPaypal } from "react-icons/si"; // Icono opcional si usas react-icons
import { BsCreditCard2Front } from "react-icons/bs"; // Icono genérico para flow

interface Props {
  suscripciones: SubscriptionType[];
  setSelectModal: (i: string) => void;
  setSelectedSuscripcion: (s: SubscriptionType) => void;
  setOpenModal: (s: boolean) => void;
}

export default function TablaSuscripciones({
  suscripciones,
  setSelectModal,
  setSelectedSuscripcion,
  setOpenModal,
}: Props) {
  // Función auxiliar para colorear el estado adaptado a la paleta Team Crafter
  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "activa":
        return "bg-[#e0f7fa] text-[#00838f] border-[#b2ebf2]";
      case "pendiente":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "expirada":
        return "bg-slate-100 text-slate-600 border-slate-300";
      case "cancelada":
        return "bg-rose-50 text-rose-700 border-rose-200";
      default:
        return "bg-slate-50 text-slate-700 border-slate-200";
    }
  };

  return (
    <div className="w-full">
      <Table
        aria-label="Tabla de Gestión de Suscripciones"
        removeWrapper
        classNames={{
          base: "min-w-full max-h-[70vh] overflow-y-auto custom-scrollbar",
          table: "min-w-full",
          th: "bg-slate-50 text-slate-500 font-bold uppercase text-[11px] tracking-wider py-4 border-b border-slate-200",
          td: "py-4 border-b border-slate-100/80 text-slate-700 align-middle",
          tr: "hover:bg-slate-50/50 transition-colors duration-200",
        }}
      >
        <TableHeader>
          <TableColumn className="w-10 text-center">Nº</TableColumn>
          <TableColumn>Usuario</TableColumn>
          <TableColumn>Correo</TableColumn>
          <TableColumn>Plan</TableColumn>
          <TableColumn>Precio</TableColumn>
          <TableColumn>Estado</TableColumn>
          <TableColumn>Fechas (Inicio/Fin)</TableColumn>
          <TableColumn>Método y ID</TableColumn>
          <TableColumn align="center">Acciones</TableColumn>
        </TableHeader>

        <TableBody emptyContent={"No hay suscripciones registradas aún."}>
          {suscripciones?.map((sub, index) => (
            <TableRow key={sub.id}>
              {/* Nº */}
              <TableCell className="text-sm font-medium text-slate-400 text-center">
                {index + 1}
              </TableCell>

              {/* USUARIO */}
              <TableCell>
                <span className="text-sm font-semibold text-slate-800 whitespace-nowrap">
                  {sub.usuario?.nombre} {sub.usuario?.apellidos}
                </span>
              </TableCell>

              {/* CORREO */}
              <TableCell>
                <span
                  className="text-xs text-slate-500 truncate max-w-[150px] inline-block"
                  title={sub.usuario?.correo}
                >
                  {sub.usuario?.correo}
                </span>
              </TableCell>

              {/* PLAN */}
              <TableCell>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-slate-700">
                    {sub.plan?.nombre_plan || "Plan Personalizado"}
                  </span>
                  <span className="text-xs font-medium text-slate-400">
                    {sub.plan?.interval_count} meses
                  </span>
                </div>
              </TableCell>

              {/* PRECIO (Rosa Team Crafter) */}
              <TableCell className="text-sm font-extrabold text-pink-600">
                ${sub.precio?.toFixed(2)}
              </TableCell>

              {/* ESTADO */}
              <TableCell>
                <span
                  className={`inline-flex items-center justify-center px-2.5 py-1 border rounded-lg text-[10px] font-bold tracking-wider uppercase ${getStatusColor(
                    sub.status,
                  )}`}
                >
                  {sub.status}
                </span>
              </TableCell>

              {/* FECHAS */}
              <TableCell className="text-xs font-medium text-slate-500 whitespace-nowrap">
                <div className="flex flex-col gap-1">
                  <span>
                    <span className="font-semibold text-slate-700">
                      Inicio:
                    </span>{" "}
                    {sub.startDate ? formatDateTimeFull(sub.startDate) : "---"}
                  </span>
                  <span>
                    <span className="font-semibold text-slate-700">Fin:</span>{" "}
                    {sub.endDate ? formatDateTimeFull(sub.endDate) : "---"}
                  </span>
                </div>
              </TableCell>

              {/* MÉTODO Y ID DE SUSCRIPCIÓN (Corregido y estilizado) */}
              <TableCell>
                {sub.suscripcion_id_paypal ? (
                  <div className="flex flex-col items-start gap-1">
                    <span className="flex items-center gap-1 text-[10px] font-bold uppercase text-[#0070ba] bg-[#e6f3fb] border border-[#b2dbf2] px-2 py-0.5 rounded-md w-max tracking-wide">
                      <SiPaypal className="text-xs" /> PayPal
                    </span>
                    <span
                      className="text-[11px] font-mono text-slate-500 truncate max-w-[130px]"
                      title={sub.suscripcion_id_paypal}
                    >
                      {sub.suscripcion_id_paypal}
                    </span>
                  </div>
                ) : sub.flow_subscription_id ? (
                  <div className="flex flex-col items-start gap-1">
                    <span className="flex items-center gap-1 text-[10px] font-bold uppercase text-orange-600 bg-orange-50 border border-orange-200 px-2 py-0.5 rounded-md w-max tracking-wide">
                      <BsCreditCard2Front className="text-xs" /> Flow
                    </span>
                    <span
                      className="text-[11px] font-mono text-slate-500 truncate max-w-[130px]"
                      title={sub.flow_subscription_id}
                    >
                      {sub.flow_subscription_id}
                    </span>
                  </div>
                ) : (
                  <span className="text-xs text-slate-400 italic">
                    Manual / Sin ID
                  </span>
                )}
              </TableCell>

              {/* ACCIONES */}
              <TableCell>
                <div className="flex items-center justify-center gap-2">
                  <Tooltip
                    content="Eliminar Suscripción"
                    color="danger"
                    delay={0}
                  >
                    <Button
                      isIconOnly
                      size="sm"
                      className="bg-slate-100 text-slate-500 hover:bg-rose-500 hover:text-white transition-colors shadow-sm"
                      onPress={() => {
                        setSelectedSuscripcion(sub);
                        setSelectModal("eliminar_suscripcion");
                        setOpenModal(true);
                      }}
                    >
                      <BsTrash2 className="text-base" />
                    </Button>
                  </Tooltip>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
