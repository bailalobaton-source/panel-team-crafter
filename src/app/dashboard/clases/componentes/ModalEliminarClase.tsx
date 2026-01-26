import Loading from "@/src/components/Loading";
import { Clase } from "@/src/interfaces/clase.interface";
import { deleteClase } from "@/src/service/clases.service";
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
  selectedClase: Clase;
  gfindClases: () => void;
}

export default function ModalEliminarClase({
  open,
  onClose,
  selectedClase,
  gfindClases,
}: Props) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);

      await deleteClase(selectedClase.id);

      toast.success("La clase  fue eliminado correctamente");
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
              Eliminar clase: {selectedClase.titulo_clase}
            </ModalHeader>
            <ModalBody>
              <p>
                ¿Está seguro de que desea eliminar la clase{" "}
                <strong>{selectedClase.titulo_clase}</strong>? Esta acción no se
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
