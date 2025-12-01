import Loading from "@/src/components/Loading";
import { Recurso } from "@/src/interfaces/recurso.interface";
import { deleteRecurso } from "@/src/service/recursos.service";
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
  selectedRecurso: Recurso;
  gfindClases: () => void;
}

export default function ModalEliminarRecurso({
  open,
  onClose,
  selectedRecurso,
  gfindClases,
}: Props) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);

      await deleteRecurso(selectedRecurso.id);

      toast.success("El recurso fue eliminado correctamente");
      gfindClases();
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
              Eliminar recurso: {selectedRecurso.nombre_recurso}
            </ModalHeader>
            <ModalBody>
              <p>
                ¿Está seguro de que desea eliminar el recurso{" "}
                <strong>{selectedRecurso.nombre_recurso}</strong>? Esta acción
                no se puede deshacer.
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
