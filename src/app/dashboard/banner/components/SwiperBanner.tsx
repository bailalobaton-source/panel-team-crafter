"use client";

import { Banner } from "@/src/interfaces/banner.interface";
import { Button, Tooltip } from "@heroui/react";
import { A11y, Autoplay, Navigation, Pagination } from "swiper/modules";
import { SwiperSlide, Swiper } from "swiper/react";
import { BiPencil } from "react-icons/bi";
import { BsTrash2 } from "react-icons/bs";
import { LuImageOff } from "react-icons/lu";

interface Props {
  banners: Banner[];
  setSelectModal: (i: string) => void;
  setSelectedBanner: (s: Banner) => void;
  setOpenModal: (s: boolean) => void;
}

export default function SwiperBanner({
  banners,
  setSelectModal,
  setSelectedBanner,
  setOpenModal,
}: Props) {
  const handleEdit = (banner: Banner) => {
    setSelectedBanner(banner);
    setSelectModal("editar");
    setOpenModal(true);
  };

  const handleDelete = (banner: Banner) => {
    setSelectedBanner(banner);
    setSelectModal("eliminar");
    setOpenModal(true);
  };

  // ESTADO VACÍO: Si no hay banners, mostramos una caja bonita en lugar de un espacio roto
  if (!banners || banners.length === 0) {
    return (
      <div className="w-full h-[300px] md:h-[450px] bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center text-slate-400">
        <LuImageOff className="text-5xl mb-3 text-slate-300" />
        <p className="font-medium text-lg">No hay banners activos</p>
        <p className="text-sm">
          Agrega tu primer banner para mostrarlo a tus alumnos.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full h-[300px] md:h-[450px] rounded-3xl overflow-hidden shadow-sm border border-slate-100 group">
      <Swiper
        className="h-full w-full custom-swiper"
        modules={[Navigation, A11y, Autoplay, Pagination]}
        spaceBetween={20}
        slidesPerView={1}
        loop={banners.length > 1} // Solo activa el loop si hay más de 1 banner
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
      >
        {banners.map((banner) => (
          <SwiperSlide key={banner.id} className="relative w-full h-full">
            {/* 
              CONTROLES FLOTANTES (GLASSMORPHISM)
              Solo se hacen totalmente visibles cuando haces hover sobre el carrusel
            */}
            <div className="absolute top-4 right-4 z-20 flex gap-2 p-1.5 bg-white/30 backdrop-blur-md border border-white/50 shadow-lg rounded-2xl opacity-80 group-hover:opacity-100 transition-opacity duration-300">
              <Tooltip content="Editar Banner" color="foreground" delay={0}>
                <Button
                  isIconOnly
                  size="sm"
                  className="bg-white/80 text-slate-600 hover:bg-cyan-500 hover:text-white transition-colors shadow-sm rounded-xl"
                  onPress={() => handleEdit(banner)}
                >
                  <BiPencil className="text-base" />
                </Button>
              </Tooltip>

              <Tooltip content="Eliminar Banner" color="danger" delay={0}>
                <Button
                  isIconOnly
                  size="sm"
                  className="bg-white/80 text-slate-600 hover:bg-rose-500 hover:text-white transition-colors shadow-sm rounded-xl"
                  onPress={() => handleDelete(banner)}
                >
                  <BsTrash2 className="text-base" />
                </Button>
              </Tooltip>
            </div>

            {/* IMAGEN DEL BANNER */}
            <img
              className="w-full h-full object-cover rounded-3xl pointer-events-none select-none"
              src={`${process.env.NEXT_PUBLIC_API_URL_UPLOADS}/${banner.url_banner}`}
              alt={banner.url_banner || "Banner promocional"}
              onError={(e) => {
                e.currentTarget.src = "/img/placeholder.png";
              }}
            />

            {/* OVERLAY SUTIL OSCURO (Opcional, para que resalten los botones superiores) */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-transparent rounded-3xl pointer-events-none" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
