"use client";

import { Banner } from "@/src/interfaces/banner.interface";
import { Button } from "@heroui/react";
import { A11y, Autoplay, Navigation, Pagination } from "swiper/modules";
import { SwiperSlide, Swiper } from "swiper/react";

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
  return (
    <div className="w-full h-[450px] max-md:h-[300px]">
      <Swiper
        className="h-full w-full pb-4 "
        modules={[Navigation, A11y, Autoplay, Pagination]}
        spaceBetween={1}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={true}
      >
        {banners?.map((banner) => (
          <SwiperSlide
            key={banner.id}
            className="relative !w-full !h-full pb-10"
          >
            <div className="absolute top-2 right-2 z-10 flex gap-2">
              <Button onPress={() => handleEdit(banner)} color="primary">
                Editar
              </Button>
              <Button onPress={() => handleDelete(banner)} color="danger">
                {" "}
                Eliminar
              </Button>
            </div>
            <img
              className="w-full h-full  object-cover rounded-2xl"
              src={`${process.env.NEXT_PUBLIC_API_URL_UPLOADS}/${banner.url_banner}`}
              alt="ps y ai"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
