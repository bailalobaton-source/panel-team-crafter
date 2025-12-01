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
    <div>
      <Table
        aria-label="Tabla de notificaciones"
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
            Contenido
          </TableColumn>
          <TableColumn className="text-xs text-stone-800">
            Url notificación
          </TableColumn>
          <TableColumn className="text-xs text-stone-800">
            Tipo Notificación
          </TableColumn>
          <TableColumn className="text-xs text-stone-800">Acciones</TableColumn>
        </TableHeader>
        <TableBody>
          {notificaciones?.map((notificacion, index) => (
            <TableRow key={notificacion.id}>
              <TableCell className="text-xs">{index + 1}</TableCell>

              <TableCell className="text-xs">{notificacion.titulo}</TableCell>
              <TableCell className="text-xs">
                {notificacion.contenido}
              </TableCell>
              <TableCell className="text-xs">
                {notificacion.url_notificacion}
              </TableCell>
              <TableCell className="text-xs">
                {notificacion.tipo_notificacion}
              </TableCell>

              <TableCell className="h-full">
                <div className="h-full flex items-center justify-center gap-1">
                  <Tooltip content="Editar">
                    <Button
                      isIconOnly
                      size="sm"
                      color="primary"
                      onPress={() => {
                        setSelectedNotificacion(notificacion);
                        setSelectModal("editar_notificacion");
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
                        setSelectedNotificacion(notificacion);
                        setSelectModal("eliminar_notificacion");
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
    </div>
  );
}
