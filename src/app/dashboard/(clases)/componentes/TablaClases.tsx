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
    <div>
      <Table
        aria-label="Tabla de Clases"
        color="default"
        isStriped
        classNames={{
          base: "min-w-full max-h-[70vh] overflow-scroll p-4",
          wrapper: "p-0",
        }}
        radius="sm"
        isCompact
      >
        <TableHeader>
          <TableColumn className="text-xs text-stone-800">#</TableColumn>

          <TableColumn className="text-xs text-stone-800">Título</TableColumn>
          <TableColumn className="text-xs text-stone-800">
            Categoria
          </TableColumn>
          <TableColumn className="text-xs text-stone-800">
            Tutoriales / Tips
          </TableColumn>

          <TableColumn className="text-xs text-stone-800">
            Ver Clase y Recurso
          </TableColumn>
          <TableColumn className="text-xs text-stone-800">
            Comentarios
          </TableColumn>
          <TableColumn className="text-xs text-stone-800">Acciones</TableColumn>
        </TableHeader>
        <TableBody>
          {clases?.map((clase, index) => (
            <TableRow key={index}>
              <TableCell className="text-xs">{index + 1}</TableCell>

              <TableCell className="text-xs">{clase.titulo_clase}</TableCell>
              <TableCell className="text-xs ">
                {clase.categorias_id?.map((i) => (
                  <p key={i.id}>{i?.categoria_clase?.nombre_es || ""}</p>
                ))}
              </TableCell>
              <TableCell className="text-xs">
                {clase.tips_id?.map((i) => (
                  <p key={i.id}>{i?.tip_clase?.nombre_es || ""}</p>
                ))}{" "}
              </TableCell>
              <TableCell className="text-xs">
                <Button
                  color="warning"
                  size="sm"
                  onPress={() => {
                    setSelectedClase(clase);
                    setSelectModal("ver_clase_recurso");
                    setOpenModal(true);
                  }}
                >
                  ver clase y recurso
                </Button>
              </TableCell>
              <TableCell className="text-xs">
                <Button
                  className="scale-90"
                  color="success"
                  size="sm"
                  onPress={() => {
                    setSelectedClase(clase);
                    setSelectModal("comentarios_clase");
                    setOpenModal(true);
                  }}
                >
                  Gestionar Comentarios
                </Button>
              </TableCell>
              <TableCell className="h-full">
                <div className="h-full flex items-center justify-center gap-1">
                  <Tooltip content="Editar">
                    <Button
                      isIconOnly
                      size="sm"
                      color="primary"
                      onPress={() => {
                        setSelectedClase(clase);
                        setSelectModal("editar_clase");
                        setOpenModal(true);
                      }}
                    >
                      <BiPencil className="w-4 h-4" />
                    </Button>
                  </Tooltip>
                  <Tooltip content="Eliminar Clase">
                    <Button
                      isIconOnly
                      size="sm"
                      color="danger"
                      onPress={() => {
                        setSelectedClase(clase);
                        setSelectModal("eliminar_clase");
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
      </Table>{" "}
      {/* <VerVideo onClose={onOpenChange} isOpen={isOpen} urlVideo={urlVideo} /> */}
    </div>
  );
}
