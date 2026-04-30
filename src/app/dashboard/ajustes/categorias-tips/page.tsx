"use client";

import Loading from "@/src/components/Loading";
import { handleAxiosError } from "@/utils/errorHandler";
import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { LuBookMarked } from "react-icons/lu";

// Interfaces y Servicios
import {
  CategoriaClase,
  TipClase,
} from "@/src/interfaces/ajustes/categoriasTipsClase.interface";
import {
  getCategoriaClase,
  getTipsClase,
} from "@/src/service/ajustes/categoriaTipClase.service";

// Componentes (Tablas)
import TablaCategoriaClase from "./components/TablaCategoriaClase";
import TablaTipClase from "./components/TablaTipClase";

// Componentes (Modales CRUD Categorías)
import ModalCrearCategoriaClase from "./components/crudCategoria/ModalCrearCategoriaClase";
import ModalEditarCategoriaClase from "./components/crudCategoria/ModalEditarCategoriaClase";
import ModalEliminarCategoriaClase from "./components/crudCategoria/ModalEliminarCategoriaClase";

// Componentes (Modales CRUD Tips)
import ModalCrearTipClase from "./components/crudTIps/ModalCrearTipClase";
import ModalEditarTipClase from "./components/crudTIps/ModalEditarTipClase";
import ModalEliminarTipClase from "./components/crudTIps/ModalEliminarTipClase";

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

export default function CategoriasTips() {
  const [openModal, setOpenModal] = useState(false);
  const [selectModal, setSelectModal] = useState("");

  const [categorias, setCategorias] = useState<CategoriaClase[]>([]);
  const [tips, setTips] = useState<TipClase[]>([]);
  const [loading, setLoading] = useState(false);

  const [selectedCategoria, setSelectedCategoria] =
    useState<CategoriaClase | null>(null);
  const [selectedTip, setSelectedTip] = useState<TipClase | null>(null);

  const gfindCategorias = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getCategoriaClase();
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
      const res = await getTipsClase();
      setTips(res);
    } catch (err) {
      handleAxiosError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    gfindCategorias();
    gfindTips();
  }, [gfindCategorias, gfindTips]);

  return (
    <main className="w-full min-h-screen bg-slate-50 pb-12 overflow-y-auto">
      {/* HEADER SUPERIOR FLOTANTE CON IDENTIDAD DE MARCA */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-30 px-6 py-5 md:px-10 shadow-sm shadow-slate-100">
        <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            {/* Ícono temático: Fondo Cyan claro, Icono Rosa */}
            <div className="p-3 bg-[#e0f7fa] text-pink-500 rounded-xl shadow-inner border border-cyan-100">
              <LuBookMarked className="text-2xl" />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-slate-800 leading-tight">
                Categorías y Tips (Clases)
              </h1>
              <p className="text-sm text-slate-500 font-medium">
                Configura la clasificación y las etiquetas para tus clases.
              </p>
            </div>
          </div>
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
              Sincronizando configuraciones...
            </p>
          </motion.div>
        )}

        {/* CONTENEDOR DE LAS TABLAS (Responsivo) */}
        {!loading && (
          <div className="flex flex-col lg:flex-row gap-6 w-full">
            {/* TARJETA 1: CATEGORÍAS */}
            <motion.section
              variants={itemVariants}
              className="flex-1 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col"
            >
              {/* Línea decorativa Cyan */}
              <div className="h-1 w-full bg-gradient-to-r from-cyan-300 to-cyan-500" />
              <div className="p-4 md:p-6 flex-1">
                <div className="mb-4">
                  <h3 className="text-lg font-bold text-slate-800">
                    Categorías de Clases
                  </h3>
                  <p className="text-xs text-slate-500">
                    Agrupa tus lecciones por temáticas principales.
                  </p>
                </div>
                <TablaCategoriaClase
                  categorias={categorias}
                  setSelectModal={setSelectModal}
                  setSelectedCategoria={setSelectedCategoria}
                  setOpenModal={setOpenModal}
                />
              </div>
            </motion.section>

            {/* TARJETA 2: TIPS DE CLASES */}
            <motion.section
              variants={itemVariants}
              className="flex-1 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col"
            >
              {/* Línea decorativa Rosa/Amarillo */}
              <div className="h-1 w-full bg-gradient-to-r from-yellow-300 to-pink-400" />
              <div className="p-4 md:p-6 flex-1">
                <div className="mb-4">
                  <h3 className="text-lg font-bold text-slate-800">
                    Tips de Clases
                  </h3>
                  <p className="text-xs text-slate-500">
                    Define los consejos o tutoriales asociados.
                  </p>
                </div>
                <TablaTipClase
                  tips={tips}
                  setSelectModal={setSelectModal}
                  setSelectedTip={setSelectedTip}
                  setOpenModal={setOpenModal}
                />
              </div>
            </motion.section>
          </div>
        )}
      </motion.div>

      {/* MODALES CATEGORÍAS */}
      <section>
        {selectModal === "crear_categoria" && (
          <ModalCrearCategoriaClase
            open={openModal}
            onClose={() => setOpenModal(false)}
            gfindCategorias={gfindCategorias}
          />
        )}
        {selectModal === "editar_categoria" && selectedCategoria && (
          <ModalEditarCategoriaClase
            key={`edit-cat-${selectedCategoria.id}`}
            selectedCategoria={selectedCategoria}
            open={openModal}
            onClose={() => setOpenModal(false)}
            gfindCategorias={gfindCategorias}
          />
        )}
        {selectModal === "eliminar_categoria" && selectedCategoria && (
          <ModalEliminarCategoriaClase
            key={`del-cat-${selectedCategoria.id}`}
            selectedCategoria={selectedCategoria}
            open={openModal}
            onClose={() => setOpenModal(false)}
            gfindCategorias={gfindCategorias}
          />
        )}
      </section>

      {/* MODALES TIPS */}
      <section>
        {selectModal === "crear_tip" && (
          <ModalCrearTipClase
            open={openModal}
            onClose={() => setOpenModal(false)}
            gfindTips={gfindTips}
          />
        )}
        {selectModal === "editar_tip" && selectedTip && (
          <ModalEditarTipClase
            key={`edit-tip-${selectedTip.id}`}
            selectedTip={selectedTip}
            open={openModal}
            onClose={() => setOpenModal(false)}
            gfindTips={gfindTips}
          />
        )}
        {selectModal === "eliminar_tip" && selectedTip && (
          <ModalEliminarTipClase
            key={`del-tip-${selectedTip.id}`}
            selectedTip={selectedTip}
            open={openModal}
            onClose={() => setOpenModal(false)}
            gfindTips={gfindTips}
          />
        )}
      </section>
    </main>
  );
}
