import Loading from "@/src/components/Loading";
import { ComentarioClase } from "@/src/interfaces/comentario.interface";
import { deleteComentariosClase } from "@/src/service/comentarios.service";
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
  comentario: ComentarioClase;
  findComentarios: () => void;
}

export default function ModalEliminarComentarioClase({
  open,
  onClose,
  comentario,
  findComentarios,
}: Props) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);

      await deleteComentariosClase(comentario.id);

      toast.success("El comentario  fue eliminado correctamente");
      findComentarios();
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
              Eliminar comentario: {comentario.comentario}
            </ModalHeader>
            <ModalBody>
              <p className="text-sm text-neutral-700">
                ¿Está seguro de que desea eliminar el comentario?
                <strong>{comentario.comentario}</strong> <br />
                Esta acción no se puede deshacer.
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
