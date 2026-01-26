import Loading from "@/src/components/Loading";
import { RespuestaComentarioClase } from "@/src/interfaces/comentario.interface";
import { deleteRespuestaComentario } from "@/src/service/comentarios.service";
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
  respuesta: RespuestaComentarioClase;
  findRespuestaComentarios: () => void;
}

export default function ModalEliminarRespuestaClase({
  open,
  onClose,
  respuesta,
  findRespuestaComentarios,
}: Props) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);

      await deleteRespuestaComentario(respuesta.id);

      toast.success(
        "La respuesta  del comentario  fue eliminado correctamente"
      );
      findRespuestaComentarios();
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
              Eliminar respuesta del comentario: {respuesta.comentario}
            </ModalHeader>
            <ModalBody>
              <p className="text-sm text-neutral-700">
                ¿Está seguro de que desea eliminar la respuesta del comentario?{" "}
                <br />
                <strong>{respuesta.comentario}</strong> <br />
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
