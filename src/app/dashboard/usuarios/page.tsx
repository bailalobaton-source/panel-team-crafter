"use client";

import { handleAxiosError } from "@/utils/errorHandler";
import {
  Button,
  Select,
  SelectItem,
  Input,
  useDisclosure,
  Switch, // <-- Importado Switch
} from "@heroui/react";
import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { LuUsers, LuSearch, LuFilterX } from "react-icons/lu";

// Componentes adaptados para Usuarios
import { User } from "@/src/interfaces/user.type";
import { getUser } from "@/src/service/user.service";
import { inputClassNames, selectClassNames } from "@/utils/classNames";
import TablaUsuarios from "./components/TablaUsuarios";
import ModalEditarUsuario from "./components/ModalEditarUsuario";

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

export default function UsuariosPage() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectModal, setSelectModal] = useState("");

  // Estados de Usuarios
  const [usuarios, setUsuarios] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedUsuario, setSelectedUsuario] = useState<User | null>(null);

  // NUEVO: Estado para controlar si se usan las fechas o no
  const [usarFechas, setUsarFechas] = useState(false);

  // Filtros adaptados para usuarios
  const [filtros, setFiltros] = useState({
    fecha_inicio: formatToInputDate(primerDiaMes),
    fecha_final: formatToInputDate(ultimoDiaMes),
    busqueda: "",
    estado: "",
    rol: "",
  });

  const handleChangeFiltro = (campo: string, valor: string) => {
    setFiltros((prev) => ({
      ...prev,
      [campo]: valor,
    }));
  };

  const handleLimpiarFiltros = () => {
    setUsarFechas(false); // Apagamos el switch al limpiar
    setFiltros({
      fecha_inicio: formatToInputDate(primerDiaMes),
      fecha_final: formatToInputDate(ultimoDiaMes),
      busqueda: "",
      estado: "",
      rol: "",
    });
  };

  // Función principal de carga de usuarios
  const gfindUsuarios = useCallback(async () => {
    setLoading(true);
    try {
      // Condicionamos lo que se envía al backend
      const parametrosFiltro = {
        ...filtros,
        fecha_inicio: usarFechas ? filtros.fecha_inicio : "",
        fecha_final: usarFechas ? filtros.fecha_final : "",
      };

      const res = await getUser(parametrosFiltro);
      setUsuarios(res);
    } catch (err) {
      handleAxiosError(err);
    } finally {
      setLoading(false);
    }
  }, [filtros, usarFechas]); // Agregamos usarFechas a las dependencias

  useEffect(() => {
    gfindUsuarios();
  }, [gfindUsuarios]);

  return (
    <main className="w-full min-h-screen bg-slate-50 pb-12 overflow-y-auto">
      {/* HEADER */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-30 px-6 py-5 md:px-10 shadow-sm shadow-slate-100">
        <div className="max-w-[1600px] mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-[#e0f7fa] text-pink-500 rounded-xl shadow-inner border border-cyan-100">
              <LuUsers className="text-2xl" />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-slate-800 leading-tight">
                Usuarios
              </h1>
              <p className="text-sm text-slate-500 font-medium">
                Administra los alumnos y cuentas de tu plataforma.
              </p>
            </div>
          </div>
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
          {/* BUSCADOR DE TEXTO */}
          <div className="w-full sm:w-56 md:w-64">
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

          <div className="w-full max-w-36">
            <Select
              label="Estado"
              size="sm"
              labelPlacement="outside"
              variant="bordered"
              selectedKeys={filtros.estado ? [filtros.estado] : []}
              onChange={(e) => handleChangeFiltro("estado", e.target.value)}
              classNames={selectClassNames}
            >
              <SelectItem key="">Todos</SelectItem>
              <SelectItem key="activo">Activo</SelectItem>
              <SelectItem key="inactivo">Inactivo</SelectItem>
            </Select>
          </div>

          {/* TOGGLE PARA ACTIVAR/DESACTIVAR FECHAS */}
          <div className="flex items-center h-full pb-2 px-2">
            <Switch
              size="sm"
              color="primary"
              isSelected={usarFechas}
              onValueChange={setUsarFechas}
            >
              <span className="text-sm text-slate-600 font-medium">
                Filtrar por fecha
              </span>
            </Switch>
          </div>

          {/* INPUTS DE FECHA (Solo se muestran si usarFechas es true) */}
          {usarFechas && (
            <>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full sm:w-36"
              >
                <Input
                  label="Registrado desde"
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
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full sm:w-36"
              >
                <Input
                  label="Registrado hasta"
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
              </motion.div>
            </>
          )}

          <div className="flex gap-2 w-full sm:w-auto mt-2 sm:mt-0">
            <Button
              isIconOnly
              className="bg-[#e0f7fa] text-[#3BB8B3] hover:bg-[#b2ebf2] hover:text-[#00838f]"
              variant="flat"
              onPress={gfindUsuarios}
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
              Buscando usuarios...
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
              <TablaUsuarios
                usuarios={usuarios}
                setSelectModal={setSelectModal}
                setSelectedUsuario={setSelectedUsuario}
                setOpenModal={onOpenChange}
              />
            </div>
          </motion.section>
        )}
      </motion.div>

      {/* MODALES */}
      {selectModal === "editar_usuario" && selectedUsuario && (
        <ModalEditarUsuario
          key={`del-${selectedUsuario.id}`}
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          gfindUsuarios={gfindUsuarios}
          usuario={selectedUsuario}
        />
      )}
    </main>
  );
}
