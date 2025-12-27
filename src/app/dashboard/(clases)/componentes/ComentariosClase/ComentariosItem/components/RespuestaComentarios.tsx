import { RespuestaComentarioClase } from "@/src/interfaces/comentario.interface";
import { Avatar, Button, Link, useDisclosure } from "@heroui/react";
import ModalEliminarRespuestaClase from "../../crudComentariosClase/ModalEliminarRespuestaClase";

interface Props {
  respuesta: RespuestaComentarioClase;
  findRespuestaComentarios: () => void;
}

export default function RespuestaComentarios({
  respuesta,
  findRespuestaComentarios,
}: Props) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <article className="flex gap-3">
      <Avatar
        className="w-7 h-7 flex-shrink-0"
        src={
          respuesta.usuario?.foto_perfil
            ? `${process.env.NEXT_PUBLIC_API_URL_UPLOADS}/${respuesta.usuario?.foto_perfil}`
            : "/icons/user.svg"
        }
        alt={`Avatar de ${respuesta.usuario.nombre}`}
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-center  gap-6 mb-1">
          <p className="text-[#8A8A8A] font-semibold text-sm truncate">
            {respuesta.usuario.nombre}
          </p>
          <Button
            className="w-fit scale-90"
            color="danger"
            size="sm"
            onPress={() => {
              onOpen();
            }}
          >
            Eliminar
          </Button>
        </div>

        <div className="mb-2">
          {respuesta.user_id && respuesta.usuario && (
            <Link
              href="#"
              className="text-xs font-semibold text-[#FC68B9] hover:underline mr-1"
            >
              @{respuesta.usuario.nombre}
            </Link>
          )}
          <p className="text-sm text-[#8A8A8A] leading-relaxed">
            {respuesta.comentario}
          </p>
        </div>
      </div>
      {respuesta && (
        <ModalEliminarRespuestaClase
          key={respuesta.id}
          open={isOpen}
          onClose={() => onOpenChange()}
          findRespuestaComentarios={findRespuestaComentarios}
          respuesta={respuesta}
        />
      )}
    </article>
  );
}
