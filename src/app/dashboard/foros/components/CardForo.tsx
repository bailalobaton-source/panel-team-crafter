import { Foro } from "@/src/interfaces/foros.interface";
import { Avatar, Button, Divider } from "@heroui/react";
import Image from "next/image";
import { FaHeart } from "react-icons/fa";

interface Props {
  foro: Foro;
  index: number;
  setSelectForo: (i: Foro) => void;
  onOpen: () => void;
  setColorForo: (e: string) => void;
  setSelectModal: (e: string) => void;
}

export default function CardForo({
  foro,
  index,
  setSelectForo,
  onOpen,
  setColorForo,
  setSelectModal,
}: Props) {
  const colores = ["bg-[#FFEE97]", "bg-[#C3F3F3]", "bg-[#FFE1F2]"];

  const bgColor = colores[index % colores.length];

  return (
    <article
      key={foro.id}
      className={`relative w-[calc(33%-20px)]  min-w-[330px]  p-3 ${bgColor} flex flex-col gap-2 rounded-2xl`}
    >
      <div
        className="w-full flex flex-col gap-2 cursor-pointer "
        onClick={() => {
          setSelectForo(foro);
          setSelectModal("foro");
          onOpen();
          setColorForo(bgColor);
        }}
      >
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar
              className="w-8 h-8 flex-shrink-0"
              src={
                foro.usuario?.foto_perfil
                  ? `${process.env.NEXT_PUBLIC_API_URL_UPLOADS}/${foro.usuario?.foto_perfil}`
                  : "/icons/user.svg"
              }
              alt={`Avatar de ${foro.usuario.nombre}`}
            />
            <div className="flex flex-col">
              <h3 className="text-[#8A8A8A] font-bold text-sm truncate">
                {foro.usuario.nombre}
              </h3>
              <time className="text-[#8A8A8A] text-xs font-light flex-shrink-0">
                {foro.createdAt}
              </time>
            </div>
          </div>
          <Button
            className="w-fit"
            color="danger"
            size="sm"
            onPress={() => {
              setSelectModal("eliminar");
              onOpen();
              setSelectForo(foro);
            }}
          >
            Eliminar
          </Button>
        </div>

        {foro.img_foro && (
          <Image
            src={`${process.env.NEXT_PUBLIC_API_URL_UPLOADS}/${foro.img_foro}`}
            alt={`Imagen del foro ${foro.titulo_foro}`}
            width={600}
            height={300}
            className="w-full h-[280px] rounded-lg object-cover"
          />
        )}

        <h3 className="text-xl text-[#8A8A8A] font-bold">{foro.titulo_foro}</h3>
        <p className="text-medium text-[#8A8A8A] font-medium">
          {foro.contenido_foro}
        </p>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <button className={`transition-transform duration-200 `}>
            <FaHeart className="text-2xl text-[#FC68B9] cursor-pointer" />
          </button>
          <span className="text-sm font-medium text-[#FC68B9]">
            {foro.likes_foro}
          </span>
        </div>
        <Button
          variant="light"
          size="sm"
          className="p-0 h-auto min-w-0 gap-1.5 text-[#FC68B9] hover:bg-[#FC68B9]/10"
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
            {foro.comentarios_foro?.length}
          </span>
        </Button>
      </div>
      <Divider />
      <button
        className="w-min text-medium text-[#FC68B9] font-semibold underline cursor-pointer"
        onClick={() => {
          setSelectForo(foro);
          setSelectModal("foro");
          onOpen();
          setColorForo(bgColor);
        }}
      >
        Comentarios
      </button>
    </article>
  );
}
