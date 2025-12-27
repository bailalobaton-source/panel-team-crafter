import { Avatar, Button, Link, useDisclosure } from "@heroui/react";
import { useState } from "react";
import ModalEliminarRespuestaForo from "./crudForo/ModalEliminarRespuestaForo";
import { RespuestaComentarioForo } from "@/src/interfaces/foros.interface";

interface Props {
  respuesta: RespuestaComentarioForo;
  findRespuestaComentarios: () => void;
}

export default function RespuestaComentariosForo({
  respuesta,
  findRespuestaComentarios,
}: Props) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectModal, setSelectModal] = useState("");
  const [selectRespuestaForo, setSelectRespuestaForo] =
    useState<RespuestaComentarioForo | null>(null);

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
        <div className="flex items-center gap-2 mb-1">
          <p className="text-[#8A8A8A] font-semibold text-sm truncate">
            {respuesta.usuario.nombre}
          </p>

          <Button
            className="w-fit scale-90"
            color="danger"
            size="sm"
            onPress={() => {
              setSelectModal("eliminar");
              onOpen();
              setSelectRespuestaForo(respuesta);
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
      {selectModal === "eliminar" && selectRespuestaForo && (
        <ModalEliminarRespuestaForo
          key={selectRespuestaForo.id}
          open={isOpen}
          onClose={() => onOpenChange()}
          findRespuestaComentarios={findRespuestaComentarios}
          selectRespuestaForo={selectRespuestaForo}
        />
      )}
    </article>
  );
}
