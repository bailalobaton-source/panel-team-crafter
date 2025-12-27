import Loading from "@/src/components/Loading";
import { Foro } from "@/src/interfaces/foros.interface";
import { deleteForo } from "@/src/service/foros.service";
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
  foro: Foro;
  getFindForos: () => void;
}

export default function ModalEliminarForo({
  open,
  onClose,
  foro,
  getFindForos,
}: Props) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);

      await deleteForo(foro.id);

      toast.success("El foro  fue eliminado correctamente");
      getFindForos();
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
            <ModalHeader className="pb-0 text-md text-red-400">
              Eliminar Foro: {foro.titulo_foro}
            </ModalHeader>
            <ModalBody>
              <p className="text-sm text-neutral-700">
                ¿Está seguro de que desea eliminar el foro{" "}
                <strong>{foro.titulo_foro}</strong>? Esta acción no se puede
                deshacer.
              </p>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onPress={onClose} size="sm">
                Cancelar
              </Button>
              <Button color="danger" onPress={handleDelete} size="sm">
                Eliminar
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
