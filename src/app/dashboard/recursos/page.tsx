"use client";

import Loading from "@/src/components/Loading";
import { handleAxiosError } from "@/utils/errorHandler";
import { Button } from "@heroui/react";
import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { SiFiles } from "react-icons/si";
import { LuPlus } from "react-icons/lu";

// Interfaces
import { getRecursos } from "@/src/service/recursos.service";
import { Recurso } from "@/src/interfaces/recurso.interface";
import { Clase } from "@/src/interfaces/clase.interface";
import { getClases } from "@/src/service/clases.service";
import {
  CategoriaClase,
  TipClase,
} from "@/src/interfaces/ajustes/categoriasTipsClase.interface";
import {
  getCategoriaRecurso,
  getTiposRecurso,
} from "@/src/service/ajustes/categoriaTiposRecurso.service";

// Componentes
import TablaRecursos from "./components/TablaRecursos";
import ModalAgregarRecurso from "./components/ModalAgregarRecurso";
import ModalEliminarRecurso from "./components/ModalEliminarRecurso";
import ModalEditarRecurso from "./components/ModalEditarRecurso";

// Variantes de animación (Iguales a la vista de Clases)
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

export default function RecursosPage() {
  const [openModal, setOpenModal] = useState(false);
  const [selectModal, setSelectModal] = useState("");
  const [recursos, setRecursos] = useState<Recurso[]>([]);
  const [loading, setLoading] = useState(false);
  const [clases, setClases] = useState<Clase[]>([]);
  const [selectedRecurso, setSelectedRecurso] = useState<Recurso | null>(null);
  const [categorias, setCategorias] = useState<CategoriaClase[]>([]);
  const [tips, setTips] = useState<TipClase[]>([]);

  const gfindRecursos = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getRecursos();
      setRecursos(res);
    } catch (err) {
      handleAxiosError(err);
    } finally {
      setLoading(false);
    }
  }, []);

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

  const gfindCategorias = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getCategoriaRecurso();
      setCategorias(res);
    } catch (err) {
      handleAxiosError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const gfindTips = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getTiposRecurso();
      setTips(res);
    } catch (err) {
      handleAxiosError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    gfindRecursos();
    gfindClases();
  }, [gfindRecursos, gfindClases]);

  useEffect(() => {
    gfindCategorias();
    gfindTips();
  }, [gfindCategorias, gfindTips]);

  const handleNew = () => {
    setSelectedRecurso(null);
    setOpenModal(true);
    setSelectModal("agregar_recurso");
  };

  return (
    <main className="w-full min-h-screen bg-slate-50 pb-12 overflow-y-auto">
      {/* HEADER SUPERIOR FLOTANTE CON IDENTIDAD DE MARCA */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-30 px-6 py-5 md:px-10 shadow-sm shadow-slate-100">
        <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            {/* Ícono temático: Fondo Cyan claro, Icono Rosa */}
            <div className="p-3 bg-[#e0f7fa] text-pink-500 rounded-xl shadow-inner border border-cyan-100">
              <SiFiles className="text-2xl" />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-slate-800 leading-tight">
                Gestión de Recursos
              </h1>
              <p className="text-sm text-slate-500 font-medium">
                Administra los archivos y materiales descargables.
              </p>
            </div>
          </div>

          {/* BOTÓN CON DEGRADADO TEAM CRAFTER (Cyan -> Rosa) */}
          <Button
            className="bg-gradient-to-r from-[#48D1CC] to-[#FF69B4] hover:from-[#3BB8B3] hover:to-[#FF1493] text-white font-bold shadow-lg shadow-pink-200 px-6 py-2.5 rounded-xl flex items-center gap-2 transition-all hover:scale-[1.02] border-0"
            onPress={handleNew}
            startContent={<LuPlus className="text-xl stroke-[3]" />}
          >
            Nuevo Recurso
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
              Cargando biblioteca de recursos...
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
              <TablaRecursos
                recursos={recursos}
                setSelectModal={setSelectModal}
                setSelectedRecurso={setSelectedRecurso}
                setOpenModal={setOpenModal}
              />
            </div>
          </motion.section>
        )}
      </motion.div>

      {/* MODALES */}
      <section>
        {selectModal === "agregar_recurso" && (
          <ModalAgregarRecurso
            open={openModal}
            onClose={() => setOpenModal(false)}
            gfindRecursos={gfindRecursos}
            gfindClases={gfindClases}
            clases={clases}
            categorias={categorias}
            tips={tips}
          />
        )}
        {selectModal === "eliminar" && selectedRecurso && (
          <ModalEliminarRecurso
            key={selectedRecurso.id}
            open={openModal}
            onClose={() => setOpenModal(false)}
            gfindClases={gfindRecursos}
            selectedRecurso={selectedRecurso}
          />
        )}
        {selectModal === "editar" && selectedRecurso && (
          <ModalEditarRecurso
            key={selectedRecurso.id}
            open={openModal}
            onClose={() => setOpenModal(false)}
            gfindClases={gfindRecursos}
            selectedRecurso={selectedRecurso}
            clases={clases}
            categorias={categorias}
            tips={tips}
          />
        )}
      </section>
    </main>
  );
}
