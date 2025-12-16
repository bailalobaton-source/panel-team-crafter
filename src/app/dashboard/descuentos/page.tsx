"use client";
import Loading from "@/src/components/Loading";
import { handleAxiosError } from "@/utils/errorHandler";
import { Button } from "@heroui/react";
import { useCallback, useEffect, useState } from "react";
import { FaTicketAlt } from "react-icons/fa";
import { Descuento } from "@/src/interfaces/descuento.interface";
import TablaDescuentos from "./components/TablaDescuentos";
import ModalNuevoDescuento from "./components/ModalNuevoDescuento";
import { getDescuento } from "@/src/service/descuento.service";
import ModalEditarDescuento from "./components/ModalEditarDescuento";
import ModalEliminarDescuento from "./components/ModalEliminarNotificacion";

export default function Notificaciones() {
  const [openModal, setOpenModal] = useState(false);
  const [selectModal, setSelectModal] = useState("");
  const [descuentos, setDescuentos] = useState<Descuento[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedDescuento, setSelectedDescuento] = useState<Descuento | null>(
    null
  );

  const gfindDescuentos = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getDescuento();
      setDescuentos(res);
    } catch (err) {
      handleAxiosError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    gfindDescuentos();
  }, [gfindDescuentos]);

  const handleNew = () => {
    setSelectedDescuento(null);
    setOpenModal(true);
    setSelectModal("nuevo_descuento");
  };
  return (
    <div className="w-full p-4 overflow-x-hidden overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-2">
          <FaTicketAlt className="text-2xl" />
          <h2 className="text-xl font-bold">Descuentos</h2>
        </div>
        <Button className="bg-pink-500 text-white" onPress={handleNew}>
          Agregar Descuento
        </Button>
      </div>
      {loading && <Loading />}{" "}
      <TablaDescuentos
        descuentos={descuentos}
        setSelectModal={setSelectModal}
        setSelectedDescuento={setSelectedDescuento}
        setOpenModal={setOpenModal}
      />
      {selectModal === "nuevo_descuento" && (
        <ModalNuevoDescuento
          open={openModal}
          onClose={() => setOpenModal(false)}
          gfindDescuentos={gfindDescuentos}
        />
      )}
      {selectModal === "editar_notificacion" && selectedDescuento && (
        <ModalEditarDescuento
          key={selectedDescuento.id}
          open={openModal}
          onClose={() => setOpenModal(false)}
          gfindDescuentos={gfindDescuentos}
          descuento={selectedDescuento}
        />
      )}
      {selectModal === "eliminar_notificacion" && selectedDescuento && (
        <ModalEliminarDescuento
          open={openModal}
          onClose={() => setOpenModal(false)}
          gfindDescuentos={gfindDescuentos}
          descuento={selectedDescuento}
        />
      )}
    </div>
  );
}
