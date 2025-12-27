"use client";
import { ComentarioForo, Foro } from "@/src/interfaces/foros.interface";
import { handleAxiosError } from "@/utils/errorHandler";
import { Avatar, Button, Divider, Modal, ModalContent } from "@heroui/react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import CardComentarioForo from "./CardComentarioForo";
import { getComentarioForo } from "@/src/service/foros.service";

interface Props {
  isOpen: boolean;
  onOpenChange: () => void;
  selectForo: Foro;
  colorForo: string;
}

export default function ModalForoSelect({
  isOpen,
  onOpenChange,
  selectForo,
  colorForo,
}: Props) {
  const [comentariosForo, setComentariosForo] = useState<ComentarioForo[]>([]);
  const tieneComentarios: boolean = selectForo.comentarios_foro?.length > 0;

  const findComentariosForos = useCallback(async () => {
    try {
      const res = await getComentarioForo(selectForo.id);
      setComentariosForo(res);
    } catch (err) {
      handleAxiosError(err);
    }
  }, [selectForo.id]);

  useEffect(() => {
    findComentariosForos();
  }, [findComentariosForos]);

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size="2xl"
      backdrop="blur"
      placement="center"
    >
      <ModalContent className="w-full max-h-[80vh] overflow-auto p-0">
        {() => (
          <article
            key={selectForo.id}
            className={`w-full p-5 ${colorForo} flex flex-col gap-2 rounded-2xl`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Avatar
                  className="w-8 h-8 flex-shrink-0"
                  src={
                    selectForo.usuario?.foto_perfil
                      ? `${process.env.NEXT_PUBLIC_API_URL_UPLOADS}/${selectForo.usuario?.foto_perfil}`
                      : "/icons/user.svg"
                  }
                  alt={`Avatar de ${selectForo.usuario.nombre}`}
                />
                <div className="flex flex-col">
                  <h3 className="text-[#8A8A8A] font-bold text-sm truncate">
                    {selectForo.usuario.nombre}
                  </h3>
                  <time className="text-[#8A8A8A] text-xs font-light flex-shrink-0">
                    {selectForo.createdAt}
                  </time>
                </div>
              </div>
            </div>

            {selectForo.img_foro && (
              <Image
                src={`${process.env.NEXT_PUBLIC_API_URL_UPLOADS}/${selectForo.img_foro}`}
                alt={`Imagen del foro ${selectForo.titulo_foro}`}
                width={600}
                height={300}
                className="m-auto w-full max-w-[300px] h-auto rounded-lg object-cover"
              />
            )}

            <h3 className="text-xl text-[#8A8A8A] font-bold">
              {selectForo.titulo_foro}
            </h3>
            <p className="text-medium text-[#8A8A8A] font-medium">
              {selectForo.contenido_foro}
            </p>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <button className={`transition-transform duration-200 `}>
                  <FaHeart className="text-xl text-[#FC68B9] cursor-pointer" />
                </button>
                <span className="text-sm font-medium text-[#FC68B9]">
                  {selectForo.likes_foro}
                </span>
              </div>

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
                  {selectForo.comentarios_foro?.length}
                </span>
              </Button>
            </div>

            <div className="w-full flex items-center gap-2 mt-2 ">
              <Avatar
                className="w-8 h-8 flex-shrink-0"
                src={
                  selectForo.usuario?.foto_perfil
                    ? `${process.env.NEXT_PUBLIC_API_URL_UPLOADS}/${selectForo.usuario?.foto_perfil}`
                    : "/icons/user.svg"
                }
                alt={`Avatar de ${selectForo.usuario.nombre}`}
              />
            </div>

            <div className="w-full flex justify-between items-center mt-2">
              <span className="text-[#FC68B9] font-semibold">
                {selectForo.comentarios_foro?.length} comentarios
              </span>
              <button
                className="text-[#FC68B9] font-semibold flex items-center gap-2"
                type="button"
              >
                <Image
                  className="text-xs"
                  src="/icons/arrows.svg"
                  alt={""}
                  width={20}
                  height={20}
                />
              </button>
            </div>

            <Divider />

            {tieneComentarios && comentariosForo && (
              <div className="mt-4 pl-4 border-l-2 border-gray-100 space-y-4">
                {comentariosForo.map((comentario: ComentarioForo) => (
                  <CardComentarioForo
                    key={comentario.id}
                    comentario={comentario}
                    findComentariosForos={findComentariosForos}
                  />
                ))}
              </div>
            )}
          </article>
        )}
      </ModalContent>
    </Modal>
  );
}
