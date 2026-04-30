"use client";

import { Descuento } from "@/src/interfaces/descuento.interface";
import { formatDate } from "@/utils/formatCreatedAtDate";
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
import { BiPencil } from "react-icons/bi";
import { BsTrash2 } from "react-icons/bs";

interface Props {
  descuentos: Descuento[];
  setSelectModal: (i: string) => void;
  setSelectedDescuento: (s: Descuento) => void;
  setOpenModal: (s: boolean) => void;
}

export default function TablaDescuentos({
  descuentos,
  setSelectModal,
  setSelectedDescuento,
  setOpenModal,
}: Props) {
  return (
    <div className="w-full">
      <Table
        aria-label="Tabla de Gestión de Descuentos"
        removeWrapper // Evita el doble fondo blanco
        classNames={{
          base: "min-w-full max-h-[70vh] overflow-y-auto custom-scrollbar",
          table: "min-w-full",
          th: "bg-slate-50 text-slate-500 font-bold uppercase text-[11px] tracking-wider py-4 border-b border-slate-200",
          td: "py-4 border-b border-slate-100/80 text-slate-700 align-middle",
          tr: "hover:bg-slate-50/50 transition-colors duration-200",
        }}
      >
        <TableHeader>
          <TableColumn className="w-10 text-center">#</TableColumn>
          <TableColumn>Título</TableColumn>
          <TableColumn>Código</TableColumn>
          <TableColumn>Valor</TableColumn>
          <TableColumn>Tipo</TableColumn>
          <TableColumn>Vencimiento</TableColumn>
          <TableColumn>Descripción</TableColumn>
          <TableColumn align="center">Acciones</TableColumn>
        </TableHeader>

        <TableBody emptyContent={"No hay descuentos registrados aún."}>
          {descuentos?.map((descuento, index) => (
            <TableRow key={descuento.id}>
              {/* ÍNDICE */}
              <TableCell className="text-sm font-medium text-slate-400 text-center">
                {index + 1}
              </TableCell>

              {/* TÍTULO */}
              <TableCell className="text-sm font-semibold text-slate-800">
                {descuento.titulo_descuento}
              </TableCell>

              {/* CÓDIGO DEL DESCUENTO (Estilo Cupón) */}
              <TableCell>
                <div className="inline-block px-2.5 py-1.5 bg-slate-50 border border-slate-300 border-dashed rounded-md text-slate-800 font-mono text-xs font-bold tracking-widest uppercase">
                  {descuento.codigo_descuento}
                </div>
              </TableCell>

              {/* VALOR DEL DESCUENTO (Destacado en Rosa) */}
              <TableCell className="text-sm font-extrabold text-pink-600">
                {descuento.valor_descuento}
              </TableCell>

              {/* TIPO DE DESCUENTO (Pill Amarillo/Naranja) */}
              <TableCell>
                <span className="text-nowrap px-2.5 py-1 bg-amber-50 text-amber-700 border border-amber-100 rounded-lg text-[10px] font-bold tracking-wider uppercase">
                  {descuento.tipo_descuento}
                </span>
              </TableCell>

              {/* FECHA DE EXPIRACIÓN */}
              <TableCell className="text-xs font-medium text-slate-500 whitespace-nowrap">
                {formatDate(descuento.fecha_expiracion)}
              </TableCell>

              {/* DESCRIPCIÓN (Truncada para no romper el layout) */}
              <TableCell>
                <div
                  className="text-xs text-slate-500 max-w-[200px] truncate"
                  title={descuento.descripcion_descuento}
                >
                  {descuento.descripcion_descuento || (
                    <span className="italic text-slate-300">
                      Sin descripción
                    </span>
                  )}
                </div>
              </TableCell>

              {/* ACCIONES */}
              <TableCell>
                <div className="flex items-center justify-center gap-2">
                  <Tooltip
                    content="Editar Descuento"
                    color="foreground"
                    delay={0}
                  >
                    <Button
                      isIconOnly
                      size="sm"
                      className="bg-slate-100 text-slate-500 hover:bg-cyan-500 hover:text-white transition-colors shadow-sm"
                      onPress={() => {
                        setSelectedDescuento(descuento);
                        setSelectModal("editar_descuento"); // Corregido de "editar_notificacion"
                        setOpenModal(true);
                      }}
                    >
                      <BiPencil className="text-base" />
                    </Button>
                  </Tooltip>

                  <Tooltip
                    content="Eliminar Descuento"
                    color="danger"
                    delay={0}
                  >
                    <Button
                      isIconOnly
                      size="sm"
                      className="bg-slate-100 text-slate-500 hover:bg-rose-500 hover:text-white transition-colors shadow-sm"
                      onPress={() => {
                        setSelectedDescuento(descuento);
                        setSelectModal("eliminar_descuento"); // Corregido de "eliminar_notificacion"
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
