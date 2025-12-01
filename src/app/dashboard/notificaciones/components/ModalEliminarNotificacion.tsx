import Loading from "@/src/components/Loading";
import { Notificacion } from "@/src/interfaces/notificaciones.interface";
import { deleteNotificaciones } from "@/src/service/notificaciones.service";
import { handleAxiosError } from "@/utils/errorHandler";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Button,
  ModalFooter,
} from "@heroui/react";
import { useState } from "react";
import { toast } from "sonner";

interface Props {
  open: boolean;
  onClose: () => void;
  selectedNotificacion: Notificacion;
  gfindNotificaciones: () => void;
}

export default function ModalEliminarNotificacion({
  open,
  onClose,
  selectedNotificacion,
  gfindNotificaciones,
}: Props) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);

      await deleteNotificaciones(selectedNotificacion.id);

      toast.success("La notificacion  fue eliminado correctamente");
      gfindNotificaciones();
      onClose();
    } catch (err) {
      handleAxiosError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={open} onOpenChange={onClose}>
      {loading && <Loading />}

      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="pb-0">
              Eliminar Notifación: {selectedNotificacion.titulo}
            </ModalHeader>
            <ModalBody>
              <p>
                ¿Está seguro de que desea eliminar la notificación{" "}
                <strong>{selectedNotificacion.titulo}</strong>? Esta acción no
                se puede deshacer.
              </p>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onPress={onClose}>
                Cancelar
              </Button>
              <Button color="danger" onPress={handleDelete}>
                Eliminar
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
