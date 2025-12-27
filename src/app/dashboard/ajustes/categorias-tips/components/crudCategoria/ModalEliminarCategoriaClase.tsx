import Loading from "@/src/components/Loading";
import { CategoriaClase } from "@/src/interfaces/ajustes/categoriasTipsClase.interface";
import { deleteCategoriaClase } from "@/src/service/ajustes/categoriaTipClase.service";
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
  gfindCategorias: () => void;
  selectedCategoria: CategoriaClase;
}

export default function ModalEliminarCategoriaClase({
  open,
  onClose,
  selectedCategoria,
  gfindCategorias,
}: Props) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);

      await deleteCategoriaClase(selectedCategoria.id);

      toast.success("La categoria  fue eliminado correctamente");
      gfindCategorias();
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
              Eliminar categoria {selectedCategoria.nombre_es}
            </ModalHeader>
            <ModalBody>
              <p>
                ¿Está seguro de que desea eliminar la categoria{" "}
                <strong>{selectedCategoria.nombre_es}</strong>? Esta acción no
                se puede deshacer.
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
