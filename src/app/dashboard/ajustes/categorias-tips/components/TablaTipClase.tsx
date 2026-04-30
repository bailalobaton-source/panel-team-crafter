"use client";

import { TipClase } from "@/src/interfaces/ajustes/categoriasTipsClase.interface";
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
import { LuPlus } from "react-icons/lu";

interface Props {
  tips: TipClase[];
  setSelectModal: (i: string) => void;
  setSelectedTip: (s: TipClase) => void;
  setOpenModal: (s: boolean) => void;
}

export default function TablaTipClase({
  tips,
  setSelectModal,
  setSelectedTip,
  setOpenModal,
}: Props) {
  return (
    <div className="w-full flex flex-col gap-4">
      {/* SECCIÓN DE BOTÓN DE AGREGAR (Color Rosa de la marca) */}
      <div className="w-full flex justify-end">
        <Button
          className="bg-pink-50 hover:bg-pink-100 text-pink-600 font-bold px-4 h-9 rounded-lg transition-colors border border-pink-200/50 shadow-sm"
          startContent={<LuPlus className="text-base stroke-[3]" />}
          onPress={() => {
            setSelectModal("crear_tip");
            setOpenModal(true);
          }}
        >
          Nuevo Tip
        </Button>
      </div>

      {/* TABLA DE TIPS */}
      <Table
        aria-label="Tabla de gestión de tips de clases"
        removeWrapper // Integración limpia con la Card padre
        classNames={{
          base: "min-w-full max-h-[60vh] overflow-y-auto custom-scrollbar",
          table: "min-w-full",
          th: "bg-slate-50 text-slate-500 font-bold uppercase text-[10px] tracking-wider py-3 border-b border-slate-200",
          td: "py-3 border-b border-slate-100/80 text-slate-700 align-middle",
          tr: "hover:bg-slate-50/50 transition-colors duration-200",
        }}
      >
        <TableHeader>
          <TableColumn className="w-10 text-center">#</TableColumn>
          <TableColumn>Nombre (ES)</TableColumn>
          <TableColumn>Nombre (EN)</TableColumn>
          <TableColumn align="center">Acciones</TableColumn>
        </TableHeader>

        <TableBody emptyContent={"No hay tips registrados aún."}>
          {tips?.map((tip, index) => (
            <TableRow key={tip.id}>
              {/* ÍNDICE */}
              <TableCell className="text-sm font-medium text-slate-400 text-center">
                {index + 1}
              </TableCell>

              {/* NOMBRE ES */}
              <TableCell>
                <span className="text-sm font-semibold text-slate-800">
                  {tip.nombre_es}
                </span>
              </TableCell>

              {/* NOMBRE EN */}
              <TableCell>
                <span className="text-sm text-slate-500">
                  {tip.nombre_en || (
                    <span className="italic text-slate-300">-</span>
                  )}
                </span>
              </TableCell>

              {/* ACCIONES */}
              <TableCell>
                <div className="flex items-center justify-center gap-2">
                  <Tooltip content="Editar Tip" color="foreground" delay={0}>
                    <Button
                      isIconOnly
                      size="sm"
                      className="bg-slate-100 text-slate-500 hover:bg-cyan-500 hover:text-white transition-colors shadow-sm"
                      onPress={() => {
                        setSelectedTip(tip);
                        setSelectModal("editar_tip");
                        setOpenModal(true);
                      }}
                    >
                      <BiPencil className="text-base" />
                    </Button>
                  </Tooltip>

                  <Tooltip content="Eliminar Tip" color="danger" delay={0}>
                    <Button
                      isIconOnly
                      size="sm"
                      className="bg-slate-100 text-slate-500 hover:bg-rose-500 hover:text-white transition-colors shadow-sm"
                      onPress={() => {
                        setSelectedTip(tip);
                        setSelectModal("eliminar_tip");
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
