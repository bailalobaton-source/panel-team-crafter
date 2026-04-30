import { Foro } from "@/src/interfaces/foros.interface";
import { Avatar, Button, Tooltip } from "@heroui/react";
import Image from "next/image";
import { FaHeart } from "react-icons/fa";
import { BsTrash2 } from "react-icons/bs";
import { LuMessageCircle } from "react-icons/lu";
import { formatDate } from "@/utils/formatCreatedAtDate"; // Si tienes esta utilidad, úsala. Si no, usa el string directo.

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
  // Colores pastel de la marca Team Crafter
  const colores = ["bg-[#FFEE97]", "bg-[#C3F3F3]", "bg-[#FFE1F2]"];
  const bgColor = colores[index % colores.length];

  // Manejador para abrir el detalle del foro
  const handleOpenForo = () => {
    setSelectForo(foro);
    setSelectModal("foro");
    onOpen();
    setColorForo(bgColor);
  };

  return (
    <article
      className={`relative w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.33%-16px)] min-w-[320px] flex-grow flex flex-col justify-between p-5 ${bgColor} rounded-3xl border border-white/50 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1.5 group`}
    >
      {/* 
        Usamos un div para el contenido clickeable separado de las acciones,
        así evitamos que hacer clic en "Eliminar" abra el modal equivocado.
      */}
      <div
        className="flex flex-col gap-3 cursor-pointer"
        onClick={handleOpenForo}
      >
        {/* HEADER: USUARIO Y ACCIONES */}
        <div className="w-full flex items-start justify-between mb-1">
          <div className="flex items-center gap-3">
            <Avatar
              className="w-10 h-10 flex-shrink-0 border-2 border-white/60 shadow-sm"
              src={
                foro.usuario?.foto_perfil
                  ? `${process.env.NEXT_PUBLIC_API_URL_UPLOADS}/${foro.usuario?.foto_perfil}`
                  : "/icons/user.svg" // O tu avatar por defecto
              }
              alt={`Avatar de ${foro.usuario?.nombre}`}
            />
            <div className="flex flex-col">
              <h3 className="text-slate-800 font-extrabold text-sm truncate max-w-[150px]">
                {foro.usuario?.nombre || "Usuario"}
              </h3>
              <time className="text-slate-500 text-xs font-medium">
                {foro.createdAt}
              </time>
            </div>
          </div>

          {/* BOTÓN ELIMINAR (Icono sutil que resalta en hover) */}
          <Tooltip content="Eliminar foro" color="danger" delay={0}>
            <Button
              isIconOnly
              size="sm"
              variant="light"
              className="text-slate-400 hover:bg-rose-500 hover:text-white transition-colors z-10"
              onPress={(e) => {
                // Evita que el clic se propague al contenedor padre y abra la vista de detalle
                setSelectModal("eliminar");
                onOpen();
                setSelectForo(foro);
              }}
            >
              <BsTrash2 className="text-base" />
            </Button>
          </Tooltip>
        </div>

        {/* IMAGEN DEL FORO (Opcional) */}
        {foro.img_foro && (
          <div className="relative w-full h-[200px] mt-2 rounded-2xl overflow-hidden shadow-sm border border-black/5 group-hover:shadow-md transition-shadow">
            <Image
              src={`${process.env.NEXT_PUBLIC_API_URL_UPLOADS}/${foro.img_foro}`}
              alt={`Imagen del foro ${foro.titulo_foro}`}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
        )}

        {/* TEXTOS DEL FORO */}
        <div className="mt-2 space-y-1.5">
          <h3 className="text-lg text-slate-900 font-bold leading-tight line-clamp-2">
            {foro.titulo_foro}
          </h3>
          <p className="text-sm text-slate-700 font-medium leading-relaxed line-clamp-3">
            {foro.contenido_foro}
          </p>
        </div>
      </div>

      {/* FOOTER: LIKES Y COMENTARIOS */}
      <div className="mt-5 pt-4 border-t border-black/5 flex items-center justify-between">
        {/* INTERACCIONES (Likes / Mensajes) */}
        <div className="flex items-center gap-5">
          {/* LIKES */}
          <div className="flex items-center gap-1.5 bg-white/40 px-3 py-1.5 rounded-full shadow-sm">
            <FaHeart className="text-pink-500 text-sm" />
            <span className="text-xs font-bold text-slate-800">
              {foro.likes_foro || 0}
            </span>
          </div>

          {/* COMENTARIOS CONTADOR */}
          <div className="flex items-center gap-1.5 bg-white/40 px-3 py-1.5 rounded-full shadow-sm">
            <LuMessageCircle className="text-cyan-600 text-sm stroke-[2.5]" />
            <span className="text-xs font-bold text-slate-800">
              {foro.comentarios_foro?.length || 0}
            </span>
          </div>
        </div>

        {/* ACCIÓN VER COMENTARIOS */}
        <button
          className="text-xs font-extrabold text-pink-600 hover:text-pink-700 hover:underline uppercase tracking-wider transition-colors z-10"
          onClick={(e) => {
            e.stopPropagation();
            handleOpenForo();
          }}
        >
          Ver Foro
        </button>
      </div>
    </article>
  );
}
