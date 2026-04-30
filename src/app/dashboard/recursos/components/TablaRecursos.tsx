"use client";

import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
} from "@heroui/react";
import { Recurso } from "@/src/interfaces/recurso.interface";
import { BsTrash2 } from "react-icons/bs";
import { BiPencil } from "react-icons/bi";
import { formatDate } from "@/utils/formatCreatedAtDate";
import { LuDownload } from "react-icons/lu";

interface Props {
  recursos: Recurso[];
  setSelectModal: (i: string) => void;
  setSelectedRecurso: (s: Recurso) => void;
  setOpenModal: (s: boolean) => void;
}

export default function TablaRecursos({
  recursos,
  setSelectModal,
  setSelectedRecurso,
  setOpenModal,
}: Props) {
  return (
    <div className="w-full">
      <Table
        aria-label="Tabla de Gestión de Recursos"
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
          <TableColumn>Portada</TableColumn>
          <TableColumn>Título</TableColumn>
          <TableColumn>Clase</TableColumn>
          <TableColumn>Categoría</TableColumn>
          <TableColumn>Tipo Recurso</TableColumn>
          <TableColumn>Vencimiento</TableColumn>
          <TableColumn align="center">Archivo</TableColumn>
          <TableColumn align="center">Acciones</TableColumn>
        </TableHeader>

        <TableBody emptyContent={"No hay recursos registrados aún."}>
          {recursos?.map((recurso, index) => (
            <TableRow key={index}>
              {/* ÍNDICE */}
              <TableCell className="text-sm font-medium text-slate-400 text-center">
                {index + 1}
              </TableCell>

              {/* PORTADA */}
              <TableCell>
                <div className="relative w-14 h-14 rounded-xl overflow-hidden border border-slate-200 shadow-sm">
                  <img
                    className="w-full h-full object-cover"
                    src={`${process.env.NEXT_PUBLIC_API_URL_UPLOADS}/${recurso.img_recurso}`}
                    alt={recurso.nombre_recurso || "Portada"}
                    onError={(e) => {
                      // Fallback por si la imagen no carga
                      e.currentTarget.src = "/img/placeholder.png";
                    }}
                  />
                </div>
              </TableCell>

              {/* TÍTULO */}
              <TableCell className="text-sm font-semibold text-slate-800">
                {recurso.nombre_recurso}
              </TableCell>

              {/* CLASE */}
              <TableCell className="text-xs font-medium text-slate-500">
                {recurso.clase?.titulo_clase || (
                  <span className="text-slate-300 italic">Sin clase</span>
                )}
              </TableCell>

              {/* CATEGORÍAS (Pills Cyan) */}
              <TableCell>
                <div className="flex flex-wrap gap-1.5">
                  {recurso.categorias_ids?.map((i) => (
                    <span
                      className="text-nowrap px-2 py-1 bg-cyan-50 text-cyan-700 border border-cyan-100 rounded-lg text-[10px] font-bold tracking-wide"
                      key={i.id}
                    >
                      {i?.categoria_recurso?.nombre_es || ""}
                    </span>
                  ))}
                </div>
              </TableCell>

              {/* TIPO RECURSO (Pills Naranja/Amarillo) */}
              <TableCell>
                <div className="flex flex-wrap gap-1.5">
                  {recurso.tipos_ids?.map((i) => (
                    <span
                      className="text-nowrap px-2 py-1 bg-amber-50 text-amber-700 border border-amber-100 rounded-lg text-[10px] font-bold tracking-wide"
                      key={i.id}
                    >
                      {i?.tipo_recurso?.nombre_es || ""}
                    </span>
                  ))}
                </div>
              </TableCell>

              {/* FECHA DE CADUCIDAD */}
              <TableCell className="text-xs text-slate-500 font-medium whitespace-nowrap">
                {formatDate(recurso.fecha_caducidad)}
              </TableCell>

              {/* DESCARGAR ARCHIVO (Botón Rosa sutil) */}
              <TableCell>
                <div className="flex justify-center">
                  <a
                    href={`${process.env.NEXT_PUBLIC_API_URL_UPLOADS}/${recurso.link_recurso}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      className="bg-pink-50 hover:bg-pink-100 text-pink-600 font-medium px-3 h-8 text-xs transition-colors border border-pink-200/50"
                      startContent={<LuDownload className="text-base" />}
                    >
                      Descargar
                    </Button>
                  </a>
                </div>
              </TableCell>

              {/* ACCIONES */}
              <TableCell>
                <div className="flex items-center justify-center gap-2">
                  <Tooltip
                    content="Editar Recurso"
                    color="foreground"
                    delay={0}
                  >
                    <Button
                      isIconOnly
                      size="sm"
                      className="bg-slate-100 text-slate-500 hover:bg-cyan-500 hover:text-white transition-colors shadow-sm"
                      onPress={() => {
                        setSelectedRecurso(recurso);
                        setSelectModal("editar");
                        setOpenModal(true);
                      }}
                    >
                      <BiPencil className="text-base" />
                    </Button>
                  </Tooltip>

                  <Tooltip content="Eliminar Recurso" color="danger" delay={0}>
                    <Button
                      isIconOnly
                      size="sm"
                      className="bg-slate-100 text-slate-500 hover:bg-rose-500 hover:text-white transition-colors shadow-sm"
                      onPress={() => {
                        setSelectedRecurso(recurso);
                        setSelectModal("eliminar");
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
