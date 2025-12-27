import Loading from "@/src/components/Loading";
import {
  CategoriaClase,
  TipClase,
} from "@/src/interfaces/ajustes/categoriasTipsClase.interface";
import {
  deleteCategoriaClase,
  deleteTipsClase,
} from "@/src/service/ajustes/categoriaTipClase.service";
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
  gfindTips: () => void;
  selectedTip: TipClase;
}

export default function ModalEliminarTipClase({
  open,
  onClose,
  selectedTip,
  gfindTips,
}: Props) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);

      await deleteTipsClase(selectedTip.id);

      toast.success("El tip  fue eliminado correctamente");
      gfindTips();
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
            <ModalHeader className="pb-0 text-md">
              Eliminar tip {selectedTip.nombre_es}
            </ModalHeader>
            <ModalBody>
              <p>
                ¿Está seguro de que desea eliminar el tip{" "}
                <strong>{selectedTip.nombre_es}</strong>? Esta acción no se
                puede deshacer.
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
