"use client";
import { Avatar, Button, useDisclosure } from "@heroui/react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { handleAxiosError } from "@/utils/errorHandler";
import {
  ComentarioForo,
  RespuestaComentarioForo,
} from "@/src/interfaces/foros.interface";
import RespuestaComentariosForo from "./RespuestaComentariosForo";
import { getRespuestaComentarioForo } from "@/src/service/foros.service";
import ModalEliminarComentarioForo from "./crudForo/ModalEliminarComentarioForo";

interface Props {
  comentario: ComentarioForo;
  findComentariosForos: () => void;
}

export default function CardComentarioForo({
  comentario,
  findComentariosForos,
}: Props) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectModal, setSelectModal] = useState("");
  const [selectComentarioForo, setSelectComentarioForo] =
    useState<ComentarioForo | null>(null);
  const [respuestacomentarios, setRespuestaComentarios] = useState<
    RespuestaComentarioForo[]
  >([]);

  const classText = "text-lg text-[#FFB4DF] font-medium";

  const findRespuestaComentarios = useCallback(async () => {
    try {
      const res = await getRespuestaComentarioForo(comentario.id);
      setRespuestaComentarios(res);
    } catch (err) {
      handleAxiosError(err);
    }
  }, [comentario.id]);

  useEffect(() => {
    findRespuestaComentarios();
  }, [findRespuestaComentarios, comentario.id]);

  return (
    <article className="w-full">
      <div className="flex gap-4">
        <Avatar
          className="w-10 h-10 flex-shrink-0"
          src={
            comentario.usuario?.foto_perfil
              ? `${process.env.NEXT_PUBLIC_API_URL_UPLOADS}/${comentario.usuario?.foto_perfil}`
              : "/icons/user.svg"
          }
          alt={`Avatar de ${comentario.usuario.nombre}`}
        />

        <div className="flex-1 min-w-0">
          {/* Información del usuario */}
          <div className="flex items-center gap-2 mb-2">
            <section className="w-full flex justify-between">
              <h3 className="text-[#8A8A8A] font-bold text-sm truncate">
                {comentario.usuario.nombre}
              </h3>
              <Button
                className="w-fit scale-90"
                color="danger"
                size="sm"
                onPress={() => {
                  setSelectModal("eliminar");
                  onOpen();
                  setSelectComentarioForo(comentario);
                }}
              >
                Eliminar
              </Button>
            </section>
            <time className="text-[#8A8A8A] text-sm font-light flex-shrink-0">
              {comentario.createdAt}
            </time>
          </div>

          {/* Contenido del comentario */}
          <p className="text-[#8A8A8A] leading-relaxed mb-3">
            {comentario.comentario}
          </p>

          <div className="w-full flex justify-between">
            <div className="flex gap-4 items-center">
              <button className={`transition-transform duration-200 `}>
                <FaHeart className="text-2xl text-[#FC68B9] cursor-pointer" />
              </button>
              <p className={classText}>{comentario.likes_comentario_foro}</p>

              <Button
                variant="light"
                size="sm"
                className="p-0 h-auto min-w-0 w-fit gap-1.5 text-[#FC68B9] hover:bg-[#FC68B9]/10"
                startContent={
                  <Image
                    src="/icons/message.svg"
                    alt=""
                    width={20}
                    height={20}
                    className="opacity-80"
                  />
                }
              >
                <span className="text-sm font-medium">
                  {comentario.respuesta_comentarios_foros?.length}
                </span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="ml-10 mt-4">
        {respuestacomentarios.map((respuesta) => (
          <RespuestaComentariosForo
            key={respuesta.id}
            respuesta={respuesta}
            findRespuestaComentarios={findRespuestaComentarios}
          />
        ))}
      </div>
      {selectModal === "eliminar" && selectComentarioForo && (
        <ModalEliminarComentarioForo
          key={selectComentarioForo.id}
          open={isOpen}
          onClose={() => onOpenChange()}
          findComentariosForos={findComentariosForos}
          comentarioForo={selectComentarioForo}
        />
      )}
    </article>
  );
}
