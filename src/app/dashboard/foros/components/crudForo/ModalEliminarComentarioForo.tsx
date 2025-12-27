import Loading from "@/src/components/Loading";
import { ComentarioForo } from "@/src/interfaces/foros.interface";
import { deleteComentarioForo } from "@/src/service/foros.service";
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
  comentarioForo: ComentarioForo;
  findComentariosForos: () => void;
}

export default function ModalEliminarComentarioForo({
  open,
  onClose,
  comentarioForo,
  findComentariosForos,
}: Props) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);

      await deleteComentarioForo(comentarioForo.id);

      toast.success("El comentario del  foro  fue eliminado correctamente");
      findComentariosForos();
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
              Eliminar comentario del Foro
            </ModalHeader>
            <ModalBody>
              <p className="text-sm text-neutral-700">
                ¿Está seguro de que desea eliminar el comentario de este foro?{" "}
                <br />
                <strong>
                  comentario: {comentarioForo.comentario}
                </strong> <br /> Esta acción no se puede deshacer.
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
