import Loading from "@/src/components/Loading";
import { Descuento } from "@/src/interfaces/descuento.interface";
import { deleteDescuento } from "@/src/service/descuento.service";
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
  descuento: Descuento;
  gfindDescuentos: () => void;
}

export default function ModalEliminarDescuento({
  open,
  onClose,
  descuento,
  gfindDescuentos,
}: Props) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);

      await deleteDescuento(descuento.id);

      toast.success("La notificacion  fue eliminado correctamente");
      gfindDescuentos();
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
              Eliminar Notifación: {descuento.tipo_descuento}
            </ModalHeader>
            <ModalBody>
              <p>
                ¿Está seguro de que desea eliminar el descuento{" "}
                <strong>{descuento.tipo_descuento}</strong>? Esta acción no se
                puede deshacer.
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
