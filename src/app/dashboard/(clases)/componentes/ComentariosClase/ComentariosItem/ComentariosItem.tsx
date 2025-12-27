"use client";

import { Avatar, Button, useDisclosure } from "@heroui/react";
import { useCallback, useEffect, useState } from "react";
import { PiHeart } from "react-icons/pi";
import { handleAxiosError } from "@/utils/errorHandler";
import RespuestaComentarios from "./components/RespuestaComentarios";
import {
  ComentarioClase,
  RespuestaComentarioClase,
} from "@/src/interfaces/comentario.interface";
import { getRespuestaComentario } from "@/src/service/comentarios.service";
import ModalEliminarComentarioClase from "../crudComentariosClase/ModalEliminarComentarioClase";

interface Props {
  comentario: ComentarioClase;
  findComentarios: () => void;
}

export default function ComentarioItem({ comentario, findComentarios }: Props) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [respuestacomentarios, setRespuestaComentarios] = useState<
    RespuestaComentarioClase[]
  >([]);

  const classText = "text-lg text-[#FFB4DF] font-medium";

  const findRespuestaComentarios = useCallback(async () => {
    try {
      const res = await getRespuestaComentario(comentario.id);
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
          <div className="flex items-center justify-between gap-2 mb-2">
            <h3 className="text-[#8A8A8A] font-bold text-sm truncate">
              {comentario.usuario.nombre}
            </h3>
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

          {/* Contenido del comentario */}
          <p className="text-[#8A8A8A] leading-relaxed mb-3">
            {comentario.comentario}
          </p>

          <div className="flex gap-2 mt-2 items-center">
            <button className={`transition-transform duration-200 `}>
              <PiHeart className="text-xl text-[#FFB4DF] cursor-pointer" />
            </button>

            <p className={classText}>{comentario.nro_likes}</p>
          </div>
        </div>
      </div>

      <div className="ml-10 mt-4">
        {respuestacomentarios.map((respuesta) => (
          <RespuestaComentarios
            key={respuesta.id}
            respuesta={respuesta}
            findRespuestaComentarios={findRespuestaComentarios}
          />
        ))}
      </div>
      {comentario && (
        <ModalEliminarComentarioClase
          key={comentario.id}
          open={isOpen}
          onClose={() => onOpenChange()}
          findComentarios={findComentarios}
          comentario={comentario}
        />
      )}
    </article>
  );
}
