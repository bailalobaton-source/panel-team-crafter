"use client";
import Loading from "@/src/components/Loading";
import { Clase } from "@/src/interfaces/clase.interface";
import { getClases } from "@/src/service/clases.service";
import { handleAxiosError } from "@/utils/errorHandler";
import { Button } from "@heroui/react";
import { useCallback, useState, useEffect } from "react";
import TablaClases from "./componentes/TablaClases";
import ModalNuevaClase from "./componentes/ModalNuevaClase";
import ModalEditarClase from "./componentes/ModalEditarClase";
import ModalVerClaseRecurso from "./componentes/ModalVerClaseRecurso";
import ModalEliminarClase from "./componentes/ModalEliminarClase";
import ModalComentariosClase from "./componentes/ComentariosClase/ModalComentariosClase";
import {
  getCategoriaClase,
  getTipsClase,
} from "@/src/service/ajustes/categoriaTipClase.service";
import {
  CategoriaClase,
  TipClase,
} from "@/src/interfaces/ajustes/categoriasTipsClase.interface";

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

  useEffect(() => {
    gfindClases();
  }, [gfindClases]);

  const handleNew = () => {
    setOpenModal(true);
    setSelectModal("");
  };

  return (
    <div className="w-full p-4 overflow-x-hidden overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Clases</h2>
        <Button className="bg-pink-500 text-white" onPress={handleNew}>
          Nueva Clase
        </Button>
      </div>

      {loading && <Loading />}
      <TablaClases
        clases={clases}
        setSelectModal={setSelectModal}
        setSelectedClase={setSelectedClase}
        setOpenModal={setOpenModal}
      />
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
    </div>
  );
}
