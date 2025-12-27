import Loading from "@/src/components/Loading";
import {
  CategoriaClase,
  TipClase,
} from "@/src/interfaces/ajustes/categoriasTipsClase.interface";
import {
  updateCategoriaClase,
  updateTipsClase,
} from "@/src/service/ajustes/categoriaTipClase.service";
import { inputClassNames } from "@/utils/classNames";
import { handleAxiosError } from "@/utils/errorHandler";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Button,
  Input,
} from "@heroui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface Props {
  open: boolean;
  onClose: () => void;
  gfindTips: () => void;
  selectedTip: TipClase;
}

export default function ModalEditarTipClase({
  open,
  onClose,
  gfindTips,
  selectedTip,
}: Props) {
  const { register, handleSubmit, reset } = useForm<TipClase>();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: TipClase) => {
    try {
      setLoading(true);

      await updateTipsClase(data, selectedTip.id); // <-- ahora se envía como multipart/form-data

      toast.success("El tip se edito correctamente");
      reset();
      gfindTips();
      onClose();
    } catch (err) {
      handleAxiosError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={open} onOpenChange={onClose} size="sm">
      {loading && <Loading />}

      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="pb-0 ">Editar Categoria</ModalHeader>
            <ModalBody>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-2"
              >
                <Input
                  isRequired
                  classNames={inputClassNames}
                  label="Nombre tip (en español)"
                  placeholder="..."
                  variant="bordered"
                  labelPlacement="outside"
                  {...register("nombre_es")}
                  radius="sm"
                  size="sm"
                  defaultValue={selectedTip.nombre_es}
                />
                <Input
                  isRequired
                  classNames={inputClassNames}
                  label="Nombre tip (en ingles)"
                  placeholder="..."
                  variant="bordered"
                  labelPlacement="outside"
                  {...register("nombre_en")}
                  radius="sm"
                  size="sm"
                  defaultValue={selectedTip.nombre_en}
                />

                <div className="flex justify-end gap-3 mt-4">
                  <Button color="danger" type="button" onPress={onClose}>
                    Cancelar
                  </Button>
                  <Button color="primary" type="submit">
                    Guardar
                  </Button>
                </div>
              </form>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
