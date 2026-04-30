"use client";

import Loading from "@/src/components/Loading";
import { handleAxiosError } from "@/utils/errorHandler";
import { Button } from "@heroui/react";
import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { LuImage, LuPlus } from "react-icons/lu";

// Servicios e Interfaces
import { getBanner } from "@/src/service/banner.service";
import { Banner } from "@/src/interfaces/banner.interface";

// Componentes
import SwiperBanner from "./components/SwiperBanner";
import ModalAgregarBanner from "./components/ModalAgregarBanner";
import ModalEditarBanner from "./components/ModalEditarBanner";
// Nota: Revisa esta ruta en tu proyecto, apuntaba a ModalEliminarNotificacion
import ModalEliminarBanner from "./components/ModalEliminarNotificacion";

// Variantes de animación
const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
};

export default function BannerPage() {
  const [openModal, setOpenModal] = useState(false);
  const [selectModal, setSelectModal] = useState("");
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedBanner, setSelectedBanner] = useState<Banner | null>(null);

  const gfindBanner = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getBanner();
      setBanners(res);
    } catch (err) {
      handleAxiosError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    gfindBanner();
  }, [gfindBanner]);

  const handleNew = () => {
    setSelectedBanner(null);
    setOpenModal(true);
    setSelectModal("nuevo_banner"); // Corregido: antes decía "nueva_notificacion"
  };

  return (
    <main className="w-full min-h-screen bg-slate-50 pb-12 overflow-y-auto">
      {/* HEADER SUPERIOR FLOTANTE CON IDENTIDAD DE MARCA */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-30 px-6 py-5 md:px-10 shadow-sm shadow-slate-100">
        <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            {/* Ícono temático: Fondo Cyan claro, Icono Rosa */}
            <div className="p-3 bg-[#e0f7fa] text-pink-500 rounded-xl shadow-inner border border-cyan-100">
              <LuImage className="text-2xl" />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-slate-800 leading-tight">
                Gestión de Banners
              </h1>
              <p className="text-sm text-slate-500 font-medium">
                Administra el carrusel de imágenes principales.
              </p>
            </div>
          </div>

          {/* BOTÓN CON DEGRADADO TEAM CRAFTER (Cyan -> Rosa) */}
          <Button
            className="bg-gradient-to-r from-[#48D1CC] to-[#FF69B4] hover:from-[#3BB8B3] hover:to-[#FF1493] text-white font-bold shadow-lg shadow-pink-200 px-6 py-2.5 rounded-xl flex items-center gap-2 transition-all hover:scale-[1.02] border-0"
            onPress={handleNew}
            startContent={<LuPlus className="text-xl stroke-[3]" />}
          >
            Agregar Banner
          </Button>
        </div>
      </div>

      <motion.div
        className="max-w-[1400px] mx-auto p-6 md:p-10 space-y-6 mt-2"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {/* INDICADOR DE CARGA */}
        {loading && (
          <motion.div
            variants={itemVariants}
            className="flex flex-col items-center justify-center py-16"
          >
            <Loading />
            <p className="mt-4 text-cyan-600 font-medium animate-pulse">
              Cargando banners...
            </p>
          </motion.div>
        )}

        {/* CONTENEDOR DEL SWIPER (CARRUSEL) */}
        {!loading && (
          <motion.section
            variants={itemVariants}
            className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
          >
            {/* Línea decorativa Team Crafter (Amarillo -> Cyan -> Rosa) */}
            <div className="h-1 w-full bg-gradient-to-r from-yellow-200 via-[#48D1CC] to-[#FF69B4]" />
            <div className="p-4 md:p-8">
              <SwiperBanner
                banners={banners}
                setSelectModal={setSelectModal}
                setSelectedBanner={setSelectedBanner}
                setOpenModal={setOpenModal}
              />
            </div>
          </motion.section>
        )}
      </motion.div>

      {/* MODALES */}
      <section>
        {selectModal === "nuevo_banner" && (
          <ModalAgregarBanner
            open={openModal}
            onClose={() => setOpenModal(false)}
            gfindBanner={gfindBanner}
          />
        )}
        {selectModal === "editar" && selectedBanner && (
          <ModalEditarBanner
            key={`edit-${selectedBanner.id}`}
            open={openModal}
            onClose={() => setOpenModal(false)}
            gfindBanner={gfindBanner}
            selectedBanner={selectedBanner}
          />
        )}
        {selectModal === "eliminar" && selectedBanner && (
          <ModalEliminarBanner
            key={`del-${selectedBanner.id}`}
            open={openModal}
            onClose={() => setOpenModal(false)}
            gfindBanner={gfindBanner}
            selectedBanner={selectedBanner}
          />
        )}
      </section>
    </main>
  );
}
