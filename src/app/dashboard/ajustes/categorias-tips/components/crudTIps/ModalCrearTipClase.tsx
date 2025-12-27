import Loading from "@/src/components/Loading";
import {
  CategoriaClase,
  TipClase,
} from "@/src/interfaces/ajustes/categoriasTipsClase.interface";
import { Descuento } from "@/src/interfaces/descuento.interface";
import {
  postCategoriaClase,
  postTipsClase,
} from "@/src/service/ajustes/categoriaTipClase.service";
import { postDescuento } from "@/src/service/descuento.service";
import { inputClassNames, selectClassNames } from "@/utils/classNames";
import { handleAxiosError } from "@/utils/errorHandler";
import { useNumericInput } from "@/utils/onInputs";
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
}

export default function ModalCrearTipClase({
  open,
  onClose,
  gfindTips,
}: Props) {
  const { register, handleSubmit, reset } = useForm<TipClase>();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: TipClase) => {
    try {
      setLoading(true);

      await postTipsClase(data); // <-- ahora se envía como multipart/form-data

      toast.success("El tip se creó correctamente");
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
            <ModalHeader className="pb-0 ">Agregar Tip</ModalHeader>
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
                />

                <div className="flex justify-end gap-3 mt-4">
                  <Button
                    color="danger"
                    type="button"
                    onPress={onClose}
                    size="sm"
                  >
                    Cancelar
                  </Button>
                  <Button color="primary" type="submit" size="sm">
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
