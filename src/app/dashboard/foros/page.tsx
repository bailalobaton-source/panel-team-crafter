"use client";

import Loading from "@/src/components/Loading";
import { handleAxiosError } from "@/utils/errorHandler";
import { useCallback, useEffect, useState } from "react";
import { getForos } from "@/src/service/foros.service";
import { Foro } from "@/src/interfaces/foros.interface";
import { useDisclosure } from "@heroui/react";
import { motion } from "framer-motion";
import { BsFillPostcardFill } from "react-icons/bs";

// Componentes
import FiltrarForos from "./components/FiltrarForos";
import CardForo from "./components/CardForo";
import ModalEliminarForo from "./components/crudForo/ModalEliminarForo";
import ModalForoSelect from "./components/ModalForoSelect";

// Variantes de animación para las tarjetas (Cards)
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

export default function ForosPage() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [foros, setForos] = useState<Foro[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectForo, setSelectForo] = useState<Foro | null>(null);
  const [colorForo, setColorForo] = useState<string>("");
  const [selectModal, setSelectModal] = useState("");

  const getFindForos = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getForos();
      setForos(res);
    } catch (err) {
      handleAxiosError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getFindForos();
  }, [getFindForos]);

  return (
    <main className="w-full min-h-screen bg-slate-50 pb-12 overflow-y-auto">
      {/* HEADER SUPERIOR FLOTANTE CON IDENTIDAD DE MARCA */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-30 px-6 py-5 md:px-10 shadow-sm shadow-slate-100">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* TÍTULO E ÍCONO */}
          <div className="flex items-center gap-4">
            {/* Ícono temático: Fondo Cyan claro, Icono Rosa */}
            <div className="p-3 bg-[#e0f7fa] text-pink-500 rounded-xl shadow-inner border border-cyan-100">
              <BsFillPostcardFill className="text-2xl" />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-slate-800 leading-tight">
                Comunidad y Foros
              </h1>
              <p className="text-sm text-slate-500 font-medium">
                Administra las discusiones y participación de los alumnos.
              </p>
            </div>
          </div>

          {/* COMPONENTE DE FILTROS ALINEADO A LA DERECHA */}
          <div className="flex items-center">
            <FiltrarForos />
          </div>
        </div>
      </div>

      {/* CONTENEDOR PRINCIPAL ANIMADO */}
      <motion.div
        className="max-w-[1400px] mx-auto p-6 md:p-10"
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
              Cargando discusiones del foro...
            </p>
          </motion.div>
        )}

        {/* GRILLA DE TARJETAS (CARDS) */}
        {!loading && (
          <motion.section
            variants={itemVariants}
            className="flex flex-wrap justify-start gap-6"
          >
            {foros.length === 0 ? (
              <div className="w-full py-12 flex flex-col items-center justify-center text-slate-400 bg-white rounded-2xl border border-slate-200 border-dashed">
                <BsFillPostcardFill className="text-4xl mb-3 text-slate-300" />
                <p className="font-medium">
                  No hay foros disponibles en este momento.
                </p>
              </div>
            ) : (
              foros.map((foro, index) => (
                <CardForo
                  key={foro.id}
                  foro={foro}
                  index={index}
                  setSelectForo={setSelectForo}
                  onOpen={onOpen}
                  setColorForo={setColorForo}
                  setSelectModal={setSelectModal}
                />
              ))
            )}
          </motion.section>
        )}
      </motion.div>

      {/* MODALES */}
      <section>
        {selectModal === "eliminar" && selectForo && (
          <ModalEliminarForo
            key={selectForo.id}
            open={isOpen}
            onClose={() => onOpenChange()}
            getFindForos={getFindForos}
            foro={selectForo}
          />
        )}

        {selectModal === "foro" && selectForo && (
          <ModalForoSelect
            key={`select-${selectForo.id}`}
            onOpenChange={onOpenChange}
            isOpen={isOpen}
            selectForo={selectForo}
            colorForo={colorForo}
          />
        )}
      </section>
    </main>
  );
}
