"use client";
import Loading from "@/src/components/Loading";
import { handleAxiosError } from "@/utils/errorHandler";
import { useCallback, useEffect, useState } from "react";
import { FaList } from "react-icons/fa";
import {
  CategoriaClase,
  TipClase,
} from "@/src/interfaces/ajustes/categoriasTipsClase.interface";
import {
  getCategoriaRecurso,
  getTiposRecurso,
} from "@/src/service/ajustes/categoriaTiposRecurso.service";
import TablaCategoriaRecurso from "./components/TablaCategoriaRecurso";
import TablaTipRecurso from "./components/TablaTipRecurso";
import ModalCrearCategoriaRecurso from "./components/crudCategoria/ModalCrearCategoriaRecurso";
import ModalEditarCategoriaRecurso from "./components/crudCategoria/ModalEditarCategoriaRecurso";
import ModalEliminarCategoriaRecurso from "./components/crudCategoria/ModalEliminarCategoriaRecurso";
import ModalCrearTipRecurso from "./components/crudTIps/ModalCrearTipRecurso";
import ModalEditarTipRecurso from "./components/crudTIps/ModalEditarTipRecurso";
import ModalEliminarTipRecurso from "./components/crudTIps/ModalEliminarTipRecurso";

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

  return (
    <div className="w-full p-4 overflow-x-hidden overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <FaList className="text-xl" />
          <h2 className="text-xl font-bold">Categoria y Tipos de Recurso</h2>
        </div>
      </div>
      {loading && <Loading />}{" "}
      <section className="w-full flex gap-6 ">
        <TablaCategoriaRecurso
          categorias={categorias}
          setSelectModal={setSelectModal}
          setSelectedCategoria={setSelectedCategoria}
          setOpenModal={setOpenModal}
        />
        <TablaTipRecurso
          tips={tips}
          setSelectModal={setSelectModal}
          setSelectedTip={setSelectedTip}
          setOpenModal={setOpenModal}
        />
      </section>
      {selectModal === "crear_categoria" && (
        <ModalCrearCategoriaRecurso
          open={openModal}
          onClose={() => setOpenModal(false)}
          gfindCategorias={gfindCategorias}
        />
      )}
      {selectModal === "editar_categoria" && selectedCategoria && (
        <ModalEditarCategoriaRecurso
          key={selectedCategoria.id}
          selectedCategoria={selectedCategoria}
          open={openModal}
          onClose={() => setOpenModal(false)}
          gfindCategorias={gfindCategorias}
        />
      )}
      {selectModal === "eliminar_categoria" && selectedCategoria && (
        <ModalEliminarCategoriaRecurso
          key={selectedCategoria.id}
          selectedCategoria={selectedCategoria}
          open={openModal}
          onClose={() => setOpenModal(false)}
          gfindCategorias={gfindCategorias}
        />
      )}
      {/* tips */}
      {selectModal === "crear_tip" && (
        <ModalCrearTipRecurso
          open={openModal}
          onClose={() => setOpenModal(false)}
          gfindTips={gfindTips}
        />
      )}
      {selectModal === "editar_tip" && selectedTip && (
        <ModalEditarTipRecurso
          key={selectedTip.id}
          selectedTip={selectedTip}
          open={openModal}
          onClose={() => setOpenModal(false)}
          gfindTips={gfindTips}
        />
      )}
      {selectModal === "eliminar_tip" && selectedTip && (
        <ModalEliminarTipRecurso
          key={selectedTip.id}
          selectedTip={selectedTip}
          open={openModal}
          onClose={() => setOpenModal(false)}
          gfindTips={gfindTips}
        />
      )}
    </div>
  );
}
