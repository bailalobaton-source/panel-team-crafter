"use client";
import Loading from "@/src/components/Loading";
import { handleAxiosError } from "@/utils/errorHandler";
import { Button } from "@heroui/react";
import { useCallback, useEffect, useState } from "react";
import { getRecursos } from "@/src/service/recursos.service";
import { Recurso } from "@/src/interfaces/recurso.interface";
import TablaRecursos from "./components/TablaRecursos";
import ModalAgregarRecurso from "./components/ModalAgregarRecurso";
import { SiFiles } from "react-icons/si";
import { Clase } from "@/src/interfaces/clase.interface";
import { getClases } from "@/src/service/clases.service";
import ModalEliminarRecurso from "./components/ModalEliminarRecurso";
import ModalEditarRecurso from "./components/ModalEditarRecurso";
import {
  CategoriaClase,
  TipClase,
} from "@/src/interfaces/ajustes/categoriasTipsClase.interface";
import {
  getCategoriaRecurso,
  getTiposRecurso,
} from "@/src/service/ajustes/categoriaTiposRecurso.service";

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

  useEffect(() => {
    gfindRecursos();
    gfindClases();
  }, [gfindRecursos, gfindClases]);

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
    gfindCategorias();
    gfindTips();
  }, [gfindCategorias, gfindTips]);

  const handleNew = () => {
    setSelectedRecurso(null);
    setOpenModal(true);
    setSelectModal("agregar_recurso");
  };

  console.log(recursos);

  return (
    <div className="w-full p-4 overflow-x-hidden overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-2">
          <SiFiles className="text-2xl" />
          <h2 className="text-xl font-bold">Recursos </h2>
        </div>
        <Button onPress={handleNew}>Agregar Recurso</Button>
      </div>
      {loading && <Loading />}{" "}
      <TablaRecursos
        recursos={recursos}
        setSelectModal={setSelectModal}
        setSelectedRecurso={setSelectedRecurso}
        setOpenModal={setOpenModal}
      />
      {selectModal === "agregar_recurso" && (
        <ModalAgregarRecurso
          open={openModal}
          onClose={() => setOpenModal(false)}
          gfindClases={gfindRecursos}
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
    </div>
  );
}
