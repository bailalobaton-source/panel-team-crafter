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
    <div>
      <Table
        aria-label="Tabla de descuentos"
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
            Fecha de expiración
          </TableColumn>
          <TableColumn className="text-xs text-stone-800">
            Tipo de descuento
          </TableColumn>
          <TableColumn className="text-xs text-stone-800">
            Valor del descuento
          </TableColumn>
          <TableColumn className="text-xs text-stone-800">
            Codigo del descuento
          </TableColumn>
          <TableColumn className="text-xs text-stone-800">
            Descripción del descuento
          </TableColumn>
          <TableColumn className="text-xs text-stone-800">Acciones</TableColumn>
        </TableHeader>
        <TableBody>
          {descuentos?.map((descuento, index) => (
            <TableRow key={descuento.id}>
              <TableCell className="text-xs">{index + 1}</TableCell>

              <TableCell className="text-xs">
                {descuento.titulo_descuento}
              </TableCell>
              <TableCell className="text-xs">
                {formatDate(descuento.fecha_expiracion)}
              </TableCell>
              <TableCell className="text-xs">
                {descuento.tipo_descuento}
              </TableCell>
              <TableCell className="text-xs">
                {descuento.valor_descuento}
              </TableCell>
              <TableCell className="text-xs">
                {descuento.codigo_descuento}
              </TableCell>
              <TableCell className="text-xs">
                {descuento.descripcion_descuento}
              </TableCell>

              <TableCell className="h-full">
                <div className="h-full flex items-center justify-center gap-1">
                  <Tooltip content="Editar">
                    <Button
                      isIconOnly
                      size="sm"
                      color="primary"
                      onPress={() => {
                        setSelectedDescuento(descuento);
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
                        setSelectedDescuento(descuento);
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
