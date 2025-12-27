import Loading from "@/src/components/Loading";
import { RespuestaComentarioForo } from "@/src/interfaces/foros.interface";
import { deleteRespuestaComentarioForo } from "@/src/service/foros.service";
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
  selectRespuestaForo: RespuestaComentarioForo;
  findRespuestaComentarios: () => void;
}

export default function ModalEliminarRespuestaForo({
  open,
  onClose,
  selectRespuestaForo,
  findRespuestaComentarios,
}: Props) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);

      await deleteRespuestaComentarioForo(selectRespuestaForo.id);

      toast.success(
        "La respuesta del comentario del  foro  fue eliminado correctamente"
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
              Eliminar respuesta del comentario
            </ModalHeader>
            <ModalBody>
              <p className="text-sm text-neutral-700">
                ¿Está seguro de que desea eliminar la respuesta del comentario
                de este foro? <br />
                <strong>
                  respuesta del comentario: {selectRespuestaForo.comentario}
                </strong>{" "}
                <br /> Esta acción no se puede deshacer.
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
