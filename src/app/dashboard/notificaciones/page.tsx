"use client";
import Loading from "@/src/components/Loading";
import { Notificacion } from "@/src/interfaces/notificaciones.interface";
import { getNotificaciones } from "@/src/service/notificaciones.service";
import { handleAxiosError } from "@/utils/errorHandler";
import { Button } from "@heroui/react";
import { useCallback, useEffect, useState } from "react";
import TablaNotificaciones from "./components/TablaNotificaciones";
import ModalNuevaNotificacion from "./components/ModalNuevaNotificacion";
import ModalEditarNotificacion from "./components/ModalEditarNotificacion";
import ModalEliminarNotificacion from "./components/ModalEliminarNotificacion";

export default function Notificaciones() {
  const [openModal, setOpenModal] = useState(false);
  const [selectModal, setSelectModal] = useState("");
  const [notificaciones, setNotificaciones] = useState<Notificacion[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedNotificacion, setSelectedNotificacion] =
    useState<Notificacion | null>(null);

  const gfindNotificaciones = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getNotificaciones();
      setNotificaciones(res);
    } catch (err) {
      handleAxiosError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    gfindNotificaciones();
  }, [gfindNotificaciones]);

  const handleNew = () => {
    setSelectedNotificacion(null);
    setOpenModal(true);
    setSelectModal("nueva_notificacion");
  };
  return (
    <div className="w-full p-4 overflow-x-hidden overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Notificaciones globales</h2>
        <Button onPress={handleNew}>Nueva Notificación</Button>
      </div>
      {loading && <Loading />}{" "}
      <TablaNotificaciones
        notificaciones={notificaciones}
        setSelectModal={setSelectModal}
        setSelectedNotificacion={setSelectedNotificacion}
        setOpenModal={setOpenModal}
      />
      {selectModal === "nueva_notificacion" && (
        <ModalNuevaNotificacion
          open={openModal}
          onClose={() => setOpenModal(false)}
          gfindNotificaciones={gfindNotificaciones}
        />
      )}
      {selectModal === "editar_notificacion" && selectedNotificacion && (
        <ModalEditarNotificacion
          open={openModal}
          onClose={() => setOpenModal(false)}
          gfindNotificaciones={gfindNotificaciones}
          selectedNotificacion={selectedNotificacion}
        />
      )}
      {selectModal === "eliminar_notificacion" && selectedNotificacion && (
        <ModalEliminarNotificacion
          open={openModal}
          onClose={() => setOpenModal(false)}
          gfindNotificaciones={gfindNotificaciones}
          selectedNotificacion={selectedNotificacion}
        />
      )}
    </div>
  );
}
