"use client";

import { Notificacion } from "@/src/interfaces/notificaciones.interface";
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
import { LuExternalLink } from "react-icons/lu";

interface Props {
  notificaciones: Notificacion[];
  setSelectModal: (i: string) => void;
  setSelectedNotificacion: (s: Notificacion) => void;
  setOpenModal: (s: boolean) => void;
}

export default function TablaNotificaciones({
  notificaciones,
  setSelectModal,
  setSelectedNotificacion,
  setOpenModal,
}: Props) {
  return (
    <div className="w-full">
      <Table
        aria-label="Tabla de notificaciones globales"
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
          <TableColumn>Contenido</TableColumn>
          <TableColumn>URL Notificación</TableColumn>
          <TableColumn>Tipo</TableColumn>
          <TableColumn align="center">Acciones</TableColumn>
        </TableHeader>

        <TableBody emptyContent={"No hay notificaciones registradas."}>
          {notificaciones?.map((notificacion, index) => (
            <TableRow key={notificacion.id}>
              {/* ÍNDICE */}
              <TableCell className="text-sm font-medium text-slate-400 text-center">
                {index + 1}
              </TableCell>

              {/* TÍTULO */}
              <TableCell className="text-sm font-semibold text-slate-800">
                {notificacion.titulo}
              </TableCell>

              {/* CONTENIDO (Con límite de ancho para que no deforme la tabla si es muy largo) */}
              <TableCell>
                <div
                  className="text-xs text-slate-600 max-w-[250px] truncate"
                  title={notificacion.contenido}
                >
                  {notificacion.contenido}
                </div>
              </TableCell>

              {/* URL NOTIFICACIÓN */}
              <TableCell>
                {notificacion.url_notificacion ? (
                  <a
                    href={notificacion.url_notificacion}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs font-medium text-cyan-600 hover:text-pink-500 transition-colors truncate max-w-[200px]"
                    title={notificacion.url_notificacion}
                  >
                    <LuExternalLink className="text-sm shrink-0" />
                    <span className="truncate">
                      {notificacion.url_notificacion}
                    </span>
                  </a>
                ) : (
                  <span className="text-xs text-slate-300 italic">-</span>
                )}
              </TableCell>

              {/* TIPO NOTIFICACIÓN (Pill en color Amarillo/Naranja) */}
              <TableCell>
                <span className="text-nowrap px-2.5 py-1 bg-amber-50 text-amber-700 border border-amber-100 rounded-lg text-[10px] font-bold tracking-wider uppercase">
                  {notificacion.tipo_notificacion}
                </span>
              </TableCell>

              {/* ACCIONES */}
              <TableCell>
                <div className="flex items-center justify-center gap-2">
                  <Tooltip
                    content="Editar Notificación"
                    color="foreground"
                    delay={0}
                  >
                    <Button
                      isIconOnly
                      size="sm"
                      className="bg-slate-100 text-slate-500 hover:bg-cyan-500 hover:text-white transition-colors shadow-sm"
                      onPress={() => {
                        setSelectedNotificacion(notificacion);
                        setSelectModal("editar_notificacion");
                        setOpenModal(true);
                      }}
                    >
                      <BiPencil className="text-base" />
                    </Button>
                  </Tooltip>

                  <Tooltip
                    content="Eliminar Notificación"
                    color="danger"
                    delay={0}
                  >
                    <Button
                      isIconOnly
                      size="sm"
                      className="bg-slate-100 text-slate-500 hover:bg-rose-500 hover:text-white transition-colors shadow-sm"
                      onPress={() => {
                        setSelectedNotificacion(notificacion);
                        setSelectModal("eliminar_notificacion");
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
