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
  getCategoriaClase,
  getTipsClase,
} from "@/src/service/ajustes/categoriaTipClase.service";
import TablaCategoriaClase from "./components/TablaCategoriaClase";
import TablaTipClase from "./components/TablaTipClase";
import ModalCrearCategoriaClase from "./components/crudCategoria/ModalCrearCategoriaClase";
import ModalEditarCategoriaClase from "./components/crudCategoria/ModalEditarCategoriaClase";
import ModalEliminarCategoriaClase from "./components/crudCategoria/ModalEliminarCategoriaClase";
import ModalCrearTipClase from "./components/crudTIps/ModalCrearTipClase";
import ModalEditarTipClase from "./components/crudTIps/ModalEditarTipClase";
import ModalEliminarTipClase from "./components/crudTIps/ModalEliminarTipClase";

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
    <div className="w-full p-4 overflow-x-hidden overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <FaList className="text-xl" />
          <h2 className="text-xl font-bold">Categoria y Tips</h2>
        </div>
      </div>
      {loading && <Loading />}{" "}
      <section className="w-full flex gap-6 ">
        <TablaCategoriaClase
          categorias={categorias}
          setSelectModal={setSelectModal}
          setSelectedCategoria={setSelectedCategoria}
          setOpenModal={setOpenModal}
        />
        <TablaTipClase
          tips={tips}
          setSelectModal={setSelectModal}
          setSelectedTip={setSelectedTip}
          setOpenModal={setOpenModal}
        />
      </section>
      {selectModal === "crear_categoria" && (
        <ModalCrearCategoriaClase
          open={openModal}
          onClose={() => setOpenModal(false)}
          gfindCategorias={gfindCategorias}
        />
      )}
      {selectModal === "editar_categoria" && selectedCategoria && (
        <ModalEditarCategoriaClase
          key={selectedCategoria.id}
          selectedCategoria={selectedCategoria}
          open={openModal}
          onClose={() => setOpenModal(false)}
          gfindCategorias={gfindCategorias}
        />
      )}
      {selectModal === "eliminar_categoria" && selectedCategoria && (
        <ModalEliminarCategoriaClase
          key={selectedCategoria.id}
          selectedCategoria={selectedCategoria}
          open={openModal}
          onClose={() => setOpenModal(false)}
          gfindCategorias={gfindCategorias}
        />
      )}
      {/* tips */}
      {selectModal === "crear_tip" && (
        <ModalCrearTipClase
          open={openModal}
          onClose={() => setOpenModal(false)}
          gfindTips={gfindTips}
        />
      )}
      {selectModal === "editar_tip" && selectedTip && (
        <ModalEditarTipClase
          key={selectedTip.id}
          selectedTip={selectedTip}
          open={openModal}
          onClose={() => setOpenModal(false)}
          gfindTips={gfindTips}
        />
      )}
      {selectModal === "eliminar_tip" && selectedTip && (
        <ModalEliminarTipClase
          key={selectedTip.id}
          selectedTip={selectedTip}
          open={openModal}
          onClose={() => setOpenModal(false)}
          gfindTips={gfindTips}
        />
      )}
      {/* {selectModal === "nuevo_descuento" && (
        <ModalNuevoDescuento
          open={openModal}
          onClose={() => setOpenModal(false)}
          gfindDescuentos={gfindDescuentos}
        />
      )}
      {selectModal === "editar_notificacion" && selectedCategoria && (
        <ModalEditarDescuento
          key={selectedCategoria.id}
          open={openModal}
          onClose={() => setOpenModal(false)}
          gfindDescuentos={gfindDescuentos}
          descuento={selectedCategoria}
        />
      )}
      {selectModal === "eliminar_notificacion" && selectedCategoria && (
        <ModalEliminarDescuento
          open={openModal}
          onClose={() => setOpenModal(false)}
          gfindDescuentos={gfindDescuentos}
          descuento={selectedCategoria}
        />
      )} */}
    </div>
  );
}
