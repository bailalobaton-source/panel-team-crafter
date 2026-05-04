"use client";

import { User } from "@/src/interfaces/user.type"; // Ajusta la ruta si es necesario
import { formatDateTimeFull } from "@/utils/formatCreatedAtDate";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Button,
  Tooltip,
  Avatar,
  Chip,
} from "@heroui/react";
import { BsTrash2 } from "react-icons/bs";
import { BiPencil } from "react-icons/bi"; // Añadido para edición
import { MdOutlineMailOutline, MdPhoneIphone } from "react-icons/md"; // Iconos extras

interface Props {
  usuarios: User[];
  setSelectModal: (i: string) => void;
  setSelectedUsuario: (u: User) => void;
  setOpenModal: (s: boolean) => void;
}

export default function TablaUsuarios({
  usuarios,
  setSelectModal,
  setSelectedUsuario,
  setOpenModal,
}: Props) {
  // Función auxiliar para colorear el estado del usuario
  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "active":
        return "bg-[#e0f7fa] text-[#00838f] border-[#b2ebf2]"; // Cyan Team Crafter
      case "disabled":
        return "bg-slate-100 text-slate-600 border-slate-300"; // Gris
      case "bloqued":
        return "bg-rose-50 text-rose-700 border-rose-200"; // Rojo
      default:
        return "bg-slate-50 text-slate-700 border-slate-200";
    }
  };

  return (
    <div className="w-full">
      <Table
        aria-label="Tabla de Gestión de Usuarios"
        removeWrapper
        classNames={{
          base: "min-w-full max-h-[70vh] overflow-y-auto custom-scrollbar",
          table: "min-w-full",
          th: "bg-slate-50 text-slate-500 font-bold uppercase text-[11px] tracking-wider py-4 border-b border-slate-200",
          td: "py-4 border-b border-slate-100/80 text-slate-700 align-middle",
          tr: "hover:bg-slate-50/50 transition-colors duration-200",
        }}
      >
        <TableHeader>
          <TableColumn className="w-10 text-center">Nº</TableColumn>
          <TableColumn>Usuario</TableColumn>
          <TableColumn>Contacto</TableColumn>
          <TableColumn>Ubicación</TableColumn>
          <TableColumn>Verificación</TableColumn>
          <TableColumn>Estado</TableColumn>
          <TableColumn>Fecha Registro</TableColumn>
          <TableColumn align="center">Acciones</TableColumn>
        </TableHeader>

        <TableBody emptyContent={"No hay usuarios registrados aún."}>
          {usuarios?.map((user, index) => (
            <TableRow key={user.id}>
              {/* Nº */}
              <TableCell className="text-sm font-medium text-slate-400 text-center">
                {index + 1}
              </TableCell>

              {/* USUARIO (Avatar + Nombre + DNI) */}
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar
                    src={user.foto_perfil || undefined}
                    name={user.nombre.charAt(0)}
                    size="sm"
                    className="flex-shrink-0 text-white bg-gradient-to-tr from-[#48D1CC] to-[#FF69B4]"
                  />
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-slate-800 whitespace-nowrap">
                      {user.nombre} {user.apellidos}
                    </span>
                    {user.dni_id_ce && (
                      <span className="text-[10px] text-slate-400 font-mono">
                        DNI: {user.dni_id_ce}
                      </span>
                    )}
                  </div>
                </div>
              </TableCell>

              {/* CONTACTO (Correo + Teléfono) */}
              <TableCell>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 truncate max-w-[180px]">
                    <MdOutlineMailOutline className="text-slate-400" />
                    <span title={user.correo}>{user.correo}</span>
                  </div>
                  {user.telefono && (
                    <div className="flex items-center gap-1.5 text-xs text-slate-500">
                      <MdPhoneIphone className="text-slate-400" />
                      <span>{user.telefono}</span>
                    </div>
                  )}
                </div>
              </TableCell>

              {/* UBICACIÓN (País y Código) */}
              <TableCell>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-slate-700">
                    {user.pais || "No definido"}
                  </span>
                  {user.codigo_pais && (
                    <span className="text-xs text-slate-400 font-mono">
                      {user.codigo_pais}
                    </span>
                  )}
                </div>
              </TableCell>

              {/* VERIFICACIÓN (Email Verified) */}
              <TableCell>
                <Chip
                  size="sm"
                  variant="flat"
                  color={user.emailVerified ? "success" : "warning"}
                  className="text-[10px] font-bold tracking-wider"
                >
                  {user.emailVerified ? "VERIFICADO" : "PENDIENTE"}
                </Chip>
              </TableCell>

              {/* ESTADO (active / disabled / bloqued) */}
              <TableCell>
                <span
                  className={`inline-flex items-center justify-center px-2.5 py-1 border rounded-lg text-[10px] font-bold tracking-wider uppercase ${getStatusColor(
                    user.status,
                  )}`}
                >
                  {user.status === "active"
                    ? "Activo"
                    : user.status === "bloqued"
                      ? "Bloqueado"
                      : "Deshabilitado"}
                </span>
              </TableCell>

              {/* FECHA REGISTRO */}
              <TableCell className="text-xs font-medium text-slate-500 whitespace-nowrap">
                {user.createdAt ? formatDateTimeFull(user.createdAt) : "---"}
              </TableCell>

              {/* ACCIONES */}
              <TableCell>
                <div className="flex items-center justify-center gap-2">
                  <Tooltip
                    content="Editar Usuario"
                    color="foreground"
                    delay={0}
                  >
                    <Button
                      isIconOnly
                      size="sm"
                      className="bg-slate-100 text-slate-500 hover:bg-cyan-500 hover:text-white transition-colors shadow-sm"
                      onPress={() => {
                        setSelectedUsuario(user);
                        setSelectModal("editar_usuario");
                        setOpenModal(true);
                      }}
                    >
                      <BiPencil className="text-base" />
                    </Button>
                  </Tooltip>

                  <Tooltip content="Eliminar Usuario" color="danger" delay={0}>
                    <Button
                      isIconOnly
                      size="sm"
                      className="bg-slate-100 text-slate-500 hover:bg-rose-500 hover:text-white transition-colors shadow-sm"
                      onPress={() => {
                        setSelectedUsuario(user);
                        setSelectModal("eliminar_usuario");
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
