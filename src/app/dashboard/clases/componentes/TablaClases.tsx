"use client";

import { Clase } from "@/src/interfaces/clase.interface";
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
import { LuMessageCircle, LuPlay } from "react-icons/lu";

interface Props {
  clases: Clase[];
  setSelectModal: (i: string) => void;
  setSelectedClase: (s: Clase) => void;
  setOpenModal: (s: boolean) => void;
}

export default function TablaClases({
  clases,
  setSelectModal,
  setSelectedClase,
  setOpenModal,
}: Props) {
  return (
    <div className="w-full">
      <Table
        aria-label="Tabla de Gestión de Clases"
        removeWrapper // Quita el fondo por defecto para que herede el de la Card padre
        classNames={{
          base: "min-w-full max-h-[70vh] overflow-y-auto custom-scrollbar",
          table: "min-w-full",
          th: "bg-slate-50 text-slate-500 font-bold uppercase text-[11px] tracking-wider py-4 border-b border-slate-200",
          td: "py-4 border-b border-slate-100/80 text-slate-700",
          tr: "hover:bg-slate-50/50 transition-colors duration-200",
        }}
      >
        <TableHeader>
          <TableColumn className="w-10 text-center">#</TableColumn>
          <TableColumn>Título de la Clase</TableColumn>
          <TableColumn>Categoría</TableColumn>
          <TableColumn>Tutoriales / Tips</TableColumn>
          <TableColumn align="center">Recursos</TableColumn>
          <TableColumn align="center">Comentarios</TableColumn>
          <TableColumn align="center">Acciones</TableColumn>
        </TableHeader>

        <TableBody emptyContent={"No hay clases registradas aún."}>
          {clases?.map((clase, index) => (
            <TableRow key={index}>
              {/* ÍNDICE */}
              <TableCell className="text-sm font-medium text-slate-400 text-center">
                {index + 1}
              </TableCell>

              {/* TÍTULO */}
              <TableCell className="text-sm font-semibold text-slate-800">
                {clase.titulo_clase}
              </TableCell>

              {/* CATEGORÍAS (Pills en Cyan) */}
              <TableCell>
                <div className="flex flex-wrap gap-1.5">
                  {clase.categorias_id?.map((i) => (
                    <span
                      key={i.id}
                      className="px-2.5 py-1 bg-cyan-50 text-cyan-700 border border-cyan-100 rounded-lg text-[11px] font-bold tracking-wide"
                    >
                      {i?.categoria_clase?.nombre_es || ""}
                    </span>
                  ))}
                </div>
              </TableCell>

              {/* TIPS (Pills en Amarillo/Naranja sutil) */}
              <TableCell>
                <div className="flex flex-wrap gap-1.5">
                  {clase.tips_id?.map((i) => (
                    <span
                      key={i.id}
                      className="px-2.5 py-1 bg-amber-50 text-amber-700 border border-amber-100 rounded-lg text-[11px] font-bold tracking-wide"
                    >
                      {i?.tip_clase?.nombre_es || ""}
                    </span>
                  ))}
                </div>
              </TableCell>

              {/* VER CLASE Y RECURSO (Botón Cyan) */}
              <TableCell>
                <div className="flex justify-center">
                  <Button
                    className="bg-cyan-50 hover:bg-cyan-100 text-cyan-600 font-medium px-3 h-8 text-xs transition-colors border border-cyan-200/50"
                    startContent={<LuPlay className="text-lg" />}
                    onPress={() => {
                      setSelectedClase(clase);
                      setSelectModal("ver_clase_recurso");
                      setOpenModal(true);
                    }}
                  >
                    Ver Clase
                  </Button>
                </div>
              </TableCell>

              {/* COMENTARIOS (Botón Rosa) */}
              <TableCell>
                <div className="flex justify-center">
                  <Button
                    className="bg-pink-50 hover:bg-pink-100 text-pink-600 font-medium px-3 h-8 text-xs transition-colors border border-pink-200/50"
                    startContent={<LuMessageCircle className="text-lg" />}
                    onPress={() => {
                      setSelectedClase(clase);
                      setSelectModal("comentarios_clase");
                      setOpenModal(true);
                    }}
                  >
                    Comentarios
                  </Button>
                </div>
              </TableCell>

              {/* ACCIONES (Editar / Eliminar) */}
              <TableCell>
                <div className="flex items-center justify-center gap-2">
                  <Tooltip content="Editar Clase" color="foreground" delay={0}>
                    <Button
                      isIconOnly
                      size="sm"
                      className="bg-slate-100 text-slate-500 hover:bg-cyan-500 hover:text-white transition-colors shadow-sm"
                      onPress={() => {
                        setSelectedClase(clase);
                        setSelectModal("editar_clase");
                        setOpenModal(true);
                      }}
                    >
                      <BiPencil className="text-base" />
                    </Button>
                  </Tooltip>

                  <Tooltip content="Eliminar Clase" color="danger" delay={0}>
                    <Button
                      isIconOnly
                      size="sm"
                      className="bg-slate-100 text-slate-500 hover:bg-rose-500 hover:text-white transition-colors shadow-sm"
                      onPress={() => {
                        setSelectedClase(clase);
                        setSelectModal("eliminar_clase");
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
