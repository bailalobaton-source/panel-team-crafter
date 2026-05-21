"use client";

import { handleAxiosError } from "@/utils/errorHandler";
import {
  Button,
  Select,
  SelectItem,
  Input,
  useDisclosure,
} from "@heroui/react";
import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { LuCreditCard, LuPlus, LuSearch, LuFilterX } from "react-icons/lu";

// Componentes
import TablaSuscripciones from "./components/TablaSuscripciones";

import { SubscriptionType } from "@/src/interfaces/suscripcion.interface";
import { getSuscripcion } from "@/src/service/suscripcion.service";
import { inputClassNames, selectClassNames } from "@/utils/classNames";
import { User } from "@/src/interfaces/user.type";
import { getUser } from "@/src/service/user.service";
import ModalNuevaSuscripcion from "./components/ModalNuevaSuscripcion";
import ModalEliminarSuscripcion from "./components/ModalEliminarSuscripcion";

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

// Función auxiliar para formatear la fecha a YYYY-MM-DD
const formatToInputDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const hoy = new Date();
const primerDiaMes = new Date(hoy.getFullYear(), hoy.getMonth(), 1);
const ultimoDiaMes = new Date(hoy.getFullYear(), hoy.getMonth() + 1, 0);

export default function SuscripcionesPage() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectModal, setSelectModal] = useState("");
  const [suscripciones, setSuscripciones] = useState<SubscriptionType[]>([]);
  const [usuarios, setUsuarios] = useState<User[]>([]);

  const [loading, setLoading] = useState(false);
  const [selectedSuscripcion, setSelectedSuscripcion] =
    useState<SubscriptionType | null>(null);

  const [filtros, setFiltros] = useState({
    fecha_inicio: formatToInputDate(primerDiaMes),
    fecha_final: formatToInputDate(ultimoDiaMes),
    plan_id: "",
    status: "",
    busqueda: "",
  });

  const handleChangeFiltro = (campo: string, valor: string) => {
    setFiltros((prev) => ({
      ...prev,
      [campo]: valor,
    }));
  };

  const handleLimpiarFiltros = () => {
    setFiltros({
      fecha_inicio: formatToInputDate(primerDiaMes),
      fecha_final: formatToInputDate(ultimoDiaMes),
      plan_id: "",
      status: "",
      busqueda: "",
    });
  };

  const gfindSuscripcion = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getSuscripcion(filtros);
      setSuscripciones(res);
    } catch (err) {
      handleAxiosError(err);
    } finally {
      setLoading(false);
    }
  }, [filtros]);

  const gfindUser = useCallback(async () => {
    try {
      const res = await getUser({ no_limit: true });
      setUsuarios(res);
    } catch (err) {
      handleAxiosError(err);
    }
  }, []);

  useEffect(() => {
    gfindUser();
  }, []);

  useEffect(() => {
    gfindSuscripcion();
  }, [filtros]);

  const handleNew = () => {
    setSelectedSuscripcion(null);
    onOpen();
    setSelectModal("nueva_suscripcion");
  };

  return (
    <main className="w-full min-h-screen bg-slate-50 pb-12 overflow-y-auto">
      {/* HEADER */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-30 px-6 py-5 md:px-10 shadow-sm shadow-slate-100">
        <div className="max-w-[1600px] mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-[#e0f7fa] text-pink-500 rounded-xl shadow-inner border border-cyan-100">
              <LuCreditCard className="text-2xl" />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-slate-800 leading-tight">
                Suscripciones
              </h1>
              <p className="text-sm text-slate-500 font-medium">
                Administra los planes y pagos de tus alumnos.
              </p>
            </div>
          </div>

          <Button
            className="bg-gradient-to-r from-[#48D1CC] to-[#FF69B4] hover:from-[#3BB8B3] hover:to-[#FF1493] text-white font-bold shadow-lg shadow-pink-200 px-6 py-2.5 rounded-xl flex items-center gap-2 transition-all hover:scale-[1.02] border-0"
            onPress={handleNew}
            startContent={<LuPlus className="text-xl stroke-[3]" />}
          >
            Nueva Suscripción
          </Button>
        </div>
      </div>

      <motion.div
        className="max-w-[1600px] mx-auto p-6 md:p-10 space-y-6 mt-2"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {/* BARRA DE FILTROS AVANZADOS */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm items-end"
        >
          <div className="w-full sm:w-56 md:w-64 ">
            <Input
              label="Buscar Usuario"
              placeholder="Nombre o correo..."
              size="sm"
              labelPlacement="outside"
              variant="bordered"
              classNames={inputClassNames}
              value={filtros.busqueda}
              onChange={(e) => handleChangeFiltro("busqueda", e.target.value)}
            />
          </div>

          <div className="w-full sm:w-36">
            <Input
              label="Fecha Inicio"
              size="sm"
              type="date"
              labelPlacement="outside"
              variant="bordered"
              placeholder=" "
              classNames={inputClassNames}
              value={filtros.fecha_inicio}
              onChange={(e) =>
                handleChangeFiltro("fecha_inicio", e.target.value)
              }
            />
          </div>

          <div className="w-full sm:w-36">
            <Input
              label="Fecha Final"
              size="sm"
              type="date"
              labelPlacement="outside"
              variant="bordered"
              placeholder=" "
              classNames={inputClassNames}
              value={filtros.fecha_final}
              onChange={(e) =>
                handleChangeFiltro("fecha_final", e.target.value)
              }
            />
          </div>

          <div className="w-full max-w-40">
            <Select
              label="Plan"
              size="sm"
              labelPlacement="outside"
              variant="bordered"
              selectedKeys={filtros.plan_id ? [filtros.plan_id] : []}
              onChange={(e) => handleChangeFiltro("plan_id", e.target.value)}
              classNames={selectClassNames}
            >
              <SelectItem key="">Todos</SelectItem>
              <SelectItem key="1">Plan Básico</SelectItem>
              <SelectItem key="2">Plan Estándar</SelectItem>
              <SelectItem key="3">Plan Pro Crafter</SelectItem>
              <SelectItem key="4">Plan Básico $1</SelectItem>
            </Select>
          </div>

          <div className="w-full max-w-40">
            <Select
              label="Estado"
              size="sm"
              labelPlacement="outside"
              variant="bordered"
              selectedKeys={filtros.status ? [filtros.status] : []} // <-- CORREGIDO AQUÍ (usamos status)
              onChange={(e) => handleChangeFiltro("status", e.target.value)} // <-- CORREGIDO AQUÍ
              classNames={selectClassNames}
            >
              <SelectItem key="">Todos</SelectItem>
              <SelectItem key="pendiente">Pendiente</SelectItem>
              <SelectItem key="activa">Activa</SelectItem>
              <SelectItem key="expirada">Expirada</SelectItem>
              <SelectItem key="cancelada">Cancelada</SelectItem>
            </Select>
          </div>

          <div className="flex gap-2 w-full sm:w-auto mt-2 sm:mt-0">
            {/* EL BOTÓN DE BUSCAR ES EL ÚNICO QUE DISPARA EL FETCH AHORA */}
            <Button
              isIconOnly
              className="bg-[#e0f7fa] text-[#3BB8B3] hover:bg-[#b2ebf2] hover:text-[#00838f]"
              variant="flat"
              onPress={gfindSuscripcion}
            >
              <LuSearch className="text-lg" />
            </Button>

            <Button
              isIconOnly
              className="bg-slate-100 text-slate-500 hover:bg-rose-100 hover:text-rose-600"
              variant="flat"
              onPress={handleLimpiarFiltros}
              title="Limpiar filtros"
            >
              <LuFilterX className="text-lg" />
            </Button>
          </div>
        </motion.div>

        {/* INDICADOR DE CARGA */}
        {loading && (
          <motion.div
            variants={itemVariants}
            className="flex flex-col items-center justify-center py-16"
          >
            <p className="mt-4 text-cyan-600 font-medium animate-pulse">
              Buscando suscripciones...
            </p>
          </motion.div>
        )}

        {/* CONTENEDOR DE LA TABLA */}
        {!loading && (
          <motion.section
            variants={itemVariants}
            className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
          >
            <div className="h-1 w-full bg-gradient-to-r from-yellow-200 via-[#48D1CC] to-[#FF69B4]" />
            <div className="p-4 md:p-6">
              <TablaSuscripciones
                suscripciones={suscripciones}
                setSelectModal={setSelectModal}
                setSelectedSuscripcion={setSelectedSuscripcion}
                setOpenModal={onOpenChange}
              />
            </div>
          </motion.section>
        )}
      </motion.div>
      {selectModal === "nueva_suscripcion" && (
        <ModalNuevaSuscripcion
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          gfindSuscripcion={gfindSuscripcion}
          usuarios={usuarios}
        />
      )}
      {selectModal === "eliminar_suscripcion" && selectedSuscripcion && (
        <ModalEliminarSuscripcion
          key={`del-${selectedSuscripcion.id}`}
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          gfindSuscripcion={gfindSuscripcion}
          suscripcion={selectedSuscripcion}
        />
      )}
    </main>
  );
}
