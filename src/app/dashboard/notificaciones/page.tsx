"use client";

import Loading from "@/src/components/Loading";
import { Notificacion } from "@/src/interfaces/notificaciones.interface";
import { getNotificaciones } from "@/src/service/notificaciones.service";
import { handleAxiosError } from "@/utils/errorHandler";
import { Button } from "@heroui/react";
import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { LuBellRing, LuPlus } from "react-icons/lu";

// Componentes
import TablaNotificaciones from "./components/TablaNotificaciones";
import ModalNuevaNotificacion from "./components/ModalNuevaNotificacion";
import ModalEditarNotificacion from "./components/ModalEditarNotificacion";
import ModalEliminarNotificacion from "./components/ModalEliminarNotificacion";

// Variantes de animación (Iguales a las vistas anteriores)
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

export default function Notificaciones() {
  const [openModal, setOpenModal] = useState(false);
  const [selectModal, setSelectModal] = useState("");
  const [notificaciones, setNotificaciones] = useState<Notificacion[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedNotificacion, setSelectedNotificacion] =
    useState<Notificacion | null>(null);

  const gfindNotificaciones = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getNotificaciones();
      setNotificaciones(res);
    } catch (err) {
      handleAxiosError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    gfindNotificaciones();
  }, [gfindNotificaciones]);

  const handleNew = () => {
    setSelectedNotificacion(null);
    setOpenModal(true);
    setSelectModal("nueva_notificacion");
  };

  return (
    <main className="w-full min-h-screen bg-slate-50 pb-12 overflow-y-auto">
      {/* HEADER SUPERIOR FLOTANTE CON IDENTIDAD DE MARCA */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-30 px-6 py-5 md:px-10 shadow-sm shadow-slate-100">
        <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            {/* Ícono temático: Fondo Cyan claro, Icono Rosa */}
            <div className="p-3 bg-[#e0f7fa] text-pink-500 rounded-xl shadow-inner border border-cyan-100">
              <LuBellRing className="text-2xl" />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-slate-800 leading-tight">
                Notificaciones Globales
              </h1>
              <p className="text-sm text-slate-500 font-medium">
                Envía y administra alertas para tus estudiantes.
              </p>
            </div>
          </div>

          {/* BOTÓN CON DEGRADADO TEAM CRAFTER (Cyan -> Rosa) */}
          <Button
            className="bg-gradient-to-r from-[#48D1CC] to-[#FF69B4] hover:from-[#3BB8B3] hover:to-[#FF1493] text-white font-bold shadow-lg shadow-pink-200 px-6 py-2.5 rounded-xl flex items-center gap-2 transition-all hover:scale-[1.02] border-0"
            onPress={handleNew}
            startContent={<LuPlus className="text-xl stroke-[3]" />}
          >
            Nueva Notificación
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
              Cargando notificaciones...
            </p>
          </motion.div>
        )}

        {/* CONTENEDOR DE LA TABLA */}
        {!loading && (
          <motion.section
            variants={itemVariants}
            className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
          >
            {/* Línea decorativa Team Crafter arriba de la tabla */}
            <div className="h-1 w-full bg-gradient-to-r from-yellow-200 via-[#48D1CC] to-[#FF69B4]" />
            <div className="p-4 md:p-6">
              <TablaNotificaciones
                notificaciones={notificaciones}
                setSelectModal={setSelectModal}
                setSelectedNotificacion={setSelectedNotificacion}
                setOpenModal={setOpenModal}
              />
            </div>
          </motion.section>
        )}
      </motion.div>

      {/* MODALES */}
      <section>
        {selectModal === "nueva_notificacion" && (
          <ModalNuevaNotificacion
            open={openModal}
            onClose={() => setOpenModal(false)}
            gfindNotificaciones={gfindNotificaciones}
          />
        )}
        {selectModal === "editar_notificacion" && selectedNotificacion && (
          <ModalEditarNotificacion
            open={openModal}
            onClose={() => setOpenModal(false)}
            gfindNotificaciones={gfindNotificaciones}
            selectedNotificacion={selectedNotificacion}
          />
        )}
        {selectModal === "eliminar_notificacion" && selectedNotificacion && (
          <ModalEliminarNotificacion
            open={openModal}
            onClose={() => setOpenModal(false)}
            gfindNotificaciones={gfindNotificaciones}
            selectedNotificacion={selectedNotificacion}
          />
        )}
      </section>
    </main>
  );
}
