"use client";

import { CategoriaClase } from "@/src/interfaces/ajustes/categoriasTipsClase.interface";
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
  categorias: CategoriaClase[];
  setSelectModal: (i: string) => void;
  setSelectedCategoria: (s: CategoriaClase) => void;
  setOpenModal: (s: boolean) => void;
}

export default function TablaCategoriaRecurso({
  categorias,
  setSelectModal,
  setSelectedCategoria,
  setOpenModal,
}: Props) {
  return (
    <div className="w-full flex flex-col gap-4">
      {/* SECCIÓN DE BOTÓN DE AGREGAR */}
      <div className="w-full flex justify-end">
        <Button
          className="bg-cyan-50 hover:bg-cyan-100 text-cyan-600 font-bold px-4 h-9 rounded-lg transition-colors border border-cyan-200/50 shadow-sm"
          startContent={<LuPlus className="text-base stroke-[3]" />}
          onPress={() => {
            setSelectModal("crear_categoria");
            setOpenModal(true);
          }}
        >
          Nueva Categoría
        </Button>
      </div>

      {/* TABLA DE CATEGORÍAS */}
      <Table
        aria-label="Tabla de gestión de categorías"
        removeWrapper // Remueve el contenedor con sombra por defecto para que se integre a la tarjeta
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

        <TableBody emptyContent={"No hay categorías registradas aún."}>
          {categorias?.map((categoria, index) => (
            <TableRow key={categoria.id}>
              {/* ÍNDICE */}
              <TableCell className="text-sm font-medium text-slate-400 text-center">
                {index + 1}
              </TableCell>

              {/* NOMBRE ES */}
              <TableCell>
                <span className="text-sm font-semibold text-slate-800">
                  {categoria.nombre_es}
                </span>
              </TableCell>

              {/* NOMBRE EN (Ligeramente más sutil para jerarquía visual) */}
              <TableCell>
                <span className="text-sm text-slate-500">
                  {categoria.nombre_en || (
                    <span className="italic text-slate-300">-</span>
                  )}
                </span>
              </TableCell>

              {/* ACCIONES */}
              <TableCell>
                <div className="flex items-center justify-center gap-2">
                  <Tooltip
                    content="Editar Categoría"
                    color="foreground"
                    delay={0}
                  >
                    <Button
                      isIconOnly
                      size="sm"
                      className="bg-slate-100 text-slate-500 hover:bg-cyan-500 hover:text-white transition-colors shadow-sm"
                      onPress={() => {
                        setSelectedCategoria(categoria);
                        setSelectModal("editar_categoria");
                        setOpenModal(true);
                      }}
                    >
                      <BiPencil className="text-base" />
                    </Button>
                  </Tooltip>

                  <Tooltip
                    content="Eliminar Categoría"
                    color="danger"
                    delay={0}
                  >
                    <Button
                      isIconOnly
                      size="sm"
                      className="bg-slate-100 text-slate-500 hover:bg-rose-500 hover:text-white transition-colors shadow-sm"
                      onPress={() => {
                        setSelectedCategoria(categoria);
                        setSelectModal("eliminar_categoria");
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
