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
    <div>
      <Table
        aria-label="Tabla de recursos"
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
          <TableColumn className="text-xs text-white bg-neutral-800">
            #
          </TableColumn>
          <TableColumn className="text-xs text-white bg-neutral-800">
            Portada
          </TableColumn>
          <TableColumn className="text-xs text-white bg-neutral-800">
            Título
          </TableColumn>
          <TableColumn className="text-xs text-white bg-neutral-800">
            Clase
          </TableColumn>
          <TableColumn className="text-xs text-white bg-neutral-800">
            Categoria
          </TableColumn>
          <TableColumn className="text-xs text-white bg-neutral-800">
            Tipo Recurso
          </TableColumn>
          <TableColumn className="text-xs text-white bg-neutral-800">
            Fecha de <br />
            Caducidad
          </TableColumn>
          <TableColumn className="text-xs text-white bg-neutral-800">
            Archivo del <br />
            Recurso
          </TableColumn>
          <TableColumn className="text-xs text-white bg-neutral-800">
            Acciones
          </TableColumn>
        </TableHeader>
        <TableBody>
          {recursos?.map((recurso, index) => (
            <TableRow key={index}>
              <TableCell className="text-xs">{index + 1}</TableCell>
              <TableCell className="text-xs">
                <img
                  className="w-14 h-14  object-cover rounded-2xl"
                  src={`${process.env.NEXT_PUBLIC_API_URL_UPLOADS}/${recurso.img_recurso}`}
                  alt="ps y ai"
                />
              </TableCell>

              <TableCell className="text-xs">
                {recurso.nombre_recurso}
              </TableCell>
              <TableCell className="text-xs">
                {recurso.clase?.titulo_clase || "-"}
              </TableCell>
              <TableCell className="text-xs">
                {recurso.categorias_ids?.map((i) => (
                  <p className="text-nowrap" key={i.id}>
                    {i?.categoria_recurso?.nombre_es || ""}
                  </p>
                ))}
              </TableCell>
              <TableCell className="text-xs">
                {" "}
                {recurso.tipos_ids?.map((i) => (
                  <p className="text-nowrap" key={i.id}>
                    {i?.tipo_recurso?.nombre_es || ""}
                  </p>
                ))}
              </TableCell>
              <TableCell className="text-xs">
                {formatDate(recurso.fecha_caducidad)}
              </TableCell>
              <TableCell className="text-xs">
                <a
                  href={`${process.env.NEXT_PUBLIC_API_URL_UPLOADS}/${recurso.link_recurso}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button color="primary" size="sm">
                    Descargar file
                  </Button>
                </a>
              </TableCell>

              <TableCell className="h-full">
                <div className="h-full flex items-center justify-center gap-1">
                  <Tooltip content="Editar Recurso">
                    <Button
                      isIconOnly
                      size="sm"
                      color="primary"
                      onPress={() => {
                        setSelectedRecurso(recurso);
                        setSelectModal("editar");
                        setOpenModal(true);
                      }}
                    >
                      <BiPencil className="w-3 h-3" />
                    </Button>
                  </Tooltip>
                  <Tooltip content="Eliminar Recurso">
                    <Button
                      isIconOnly
                      size="sm"
                      color="danger"
                      onPress={() => {
                        setSelectedRecurso(recurso);
                        setSelectModal("eliminar");
                        setOpenModal(true);
                      }}
                    >
                      <BsTrash2 className="w-3 h-3" />
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
