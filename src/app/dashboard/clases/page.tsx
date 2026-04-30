"use client";

import Loading from "@/src/components/Loading";
import { Clase } from "@/src/interfaces/clase.interface";
import { getClases } from "@/src/service/clases.service";
import { handleAxiosError } from "@/utils/errorHandler";
import { Button } from "@heroui/react";
import { useCallback, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { LuPlay, LuPlus } from "react-icons/lu";

// Componentes
import TablaClases from "./componentes/TablaClases";
import ModalNuevaClase from "./componentes/ModalNuevaClase";
import ModalEditarClase from "./componentes/ModalEditarClase";
import ModalVerClaseRecurso from "./componentes/ModalVerClaseRecurso";
import ModalEliminarClase from "./componentes/ModalEliminarClase";
import ModalComentariosClase from "./componentes/ComentariosClase/ModalComentariosClase";

// Servicios
import {
  getCategoriaClase,
  getTipsClase,
} from "@/src/service/ajustes/categoriaTipClase.service";
import {
  CategoriaClase,
  TipClase,
} from "@/src/interfaces/ajustes/categoriasTipsClase.interface";

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

export default function Clases() {
  const [openModal, setOpenModal] = useState(false);
  const [selectModal, setSelectModal] = useState("");
  const [clases, setClases] = useState<Clase[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedClase, setSelectedClase] = useState<Clase | null>(null);
  const [categorias, setCategorias] = useState<CategoriaClase[]>([]);
  const [tips, setTips] = useState<TipClase[]>([]);

  const gfindClases = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getClases();
      setClases(res);
    } catch (err) {
      handleAxiosError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const gfindData = useCallback(async () => {
    try {
      const [cats, tps] = await Promise.all([
        getCategoriaClase(),
        getTipsClase(),
      ]);
      setCategorias(cats);
      setTips(tps);
    } catch (err) {
      handleAxiosError(err);
    }
  }, []);

  useEffect(() => {
    gfindData();
    gfindClases();
  }, [gfindData, gfindClases]);

  const handleNew = () => {
    setOpenModal(true);
    setSelectModal("");
  };

  return (
    <main className="w-full min-h-screen bg-slate-50 pb-12 overflow-y-auto">
      {/* HEADER SUPERIOR FLOTANTE CON IDENTIDAD DE MARCA */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-30 px-6 py-5 md:px-10 shadow-sm shadow-slate-100">
        <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            {/* Ícono con colores del logo: Fondo Cyan claro, Icono Rosa */}
            <div className="p-3 bg-[#e0f7fa] text-pink-500 rounded-xl shadow-inner border border-cyan-100">
              <LuPlay className="text-2xl" />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-slate-800 leading-tight">
                Gestión de Clases
              </h1>
              <p className="text-sm text-slate-500 font-medium">
                Administra tu contenido educativo y recursos.
              </p>
            </div>
          </div>

          {/* BOTÓN CON DEGRADADO TEAM CRAFTER (Cyan -> Rosa) */}
          <Button
            className="bg-gradient-to-r from-[#48D1CC] to-[#FF69B4] hover:from-[#3BB8B3] hover:to-[#FF1493] text-white font-bold shadow-lg shadow-pink-200 px-6 py-2.5 rounded-xl flex items-center gap-2 transition-all hover:scale-[1.02] border-0"
            onPress={handleNew}
            startContent={<LuPlus className="text-xl stroke-[3]" />}
          >
            Nueva Clase
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
              Preparando tu espacio creativo...
            </p>
          </motion.div>
        )}

        {/* CONTENEDOR DE LA TABLA */}
        {!loading && (
          <motion.section
            variants={itemVariants}
            className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
          >
            {/* Pequeña línea decorativa amarilla/rosa arriba de la tabla */}
            <div className="h-1 w-full bg-gradient-to-r from-yellow-200 via-[#48D1CC] to-[#FF69B4]" />
            <div className="p-4 md:p-6">
              <TablaClases
                clases={clases}
                setSelectModal={setSelectModal}
                setSelectedClase={setSelectedClase}
                setOpenModal={setOpenModal}
              />
            </div>
          </motion.section>
        )}
      </motion.div>

      {/* MODALES */}
      <section>
        {selectModal === "" && (
          <ModalNuevaClase
            open={openModal}
            onClose={() => setOpenModal(false)}
            categorias={categorias}
            tips={tips}
            gfindClases={gfindClases}
          />
        )}
        {selectModal === "editar_clase" && selectedClase && (
          <ModalEditarClase
            key={selectedClase.id}
            open={openModal}
            onClose={() => setOpenModal(false)}
            selectedClase={selectedClase}
            gfindClases={gfindClases}
            categorias={categorias}
            tips={tips}
          />
        )}
        {selectModal === "ver_clase_recurso" && selectedClase && (
          <ModalVerClaseRecurso
            key={selectedClase.id}
            open={openModal}
            onClose={() => setOpenModal(false)}
            selectedClase={selectedClase}
          />
        )}
        {selectModal === "comentarios_clase" && selectedClase && (
          <ModalComentariosClase
            key={selectedClase.id}
            open={openModal}
            onClose={() => setOpenModal(false)}
            selectedClase={selectedClase}
          />
        )}
        {selectModal === "eliminar_clase" && selectedClase && (
          <ModalEliminarClase
            key={selectedClase.id}
            open={openModal}
            onClose={() => setOpenModal(false)}
            selectedClase={selectedClase}
            gfindClases={gfindClases}
          />
        )}
      </section>
    </main>
  );
}
