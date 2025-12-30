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
    <div className="w-1/2">
      <section className="w-full flex justify-between">
        <h2 className="text-sm font-semibold">Categorias Recurso</h2>
        <Button
          className="bg-pink-500 text-white"
          color="warning"
          size="sm"
          onPress={() => {
            setSelectModal("crear_categoria");
            setOpenModal(true);
          }}
        >
          Agregar Categoria
        </Button>
      </section>
      <Table
        aria-label="Tabla de categorias"
        color="default"
        isStriped
        classNames={{
          base: "min-w-full max-h-[70vh] overflow-scroll p-4 px-0",
          wrapper: "p-0",
        }}
        radius="sm"
        isCompact
      >
        <TableHeader>
          <TableColumn className="text-xs text-stone-800">#</TableColumn>

          <TableColumn className="text-xs text-stone-800">
            Nombre ES
          </TableColumn>
          <TableColumn className="text-xs text-stone-800">
            Nombre EN
          </TableColumn>

          <TableColumn className="text-xs text-stone-800">Acciones</TableColumn>
        </TableHeader>
        <TableBody>
          {categorias?.map((categoria, index) => (
            <TableRow key={categoria.id}>
              <TableCell className="text-xs">{index + 1}</TableCell>

              <TableCell className="text-xs">{categoria.nombre_es}</TableCell>
              <TableCell className="text-xs">{categoria.nombre_en}</TableCell>

              <TableCell className="h-full">
                <div className="h-full flex items-center  gap-1">
                  <Tooltip content="Editar">
                    <Button
                      isIconOnly
                      size="sm"
                      color="primary"
                      onPress={() => {
                        setSelectedCategoria(categoria);
                        setSelectModal("editar_categoria");
                        setOpenModal(true);
                      }}
                    >
                      <BiPencil className="w-4 h-4" />
                    </Button>
                  </Tooltip>
                  <Tooltip content="Eliminar ">
                    <Button
                      isIconOnly
                      size="sm"
                      color="danger"
                      onPress={() => {
                        setSelectedCategoria(categoria);
                        setSelectModal("eliminar_categoria");
                        setOpenModal(true);
                      }}
                    >
                      <BsTrash2 className="w-4 h-4" />
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
