import Loading from "@/src/components/Loading";
import { CategoriaClase } from "@/src/interfaces/ajustes/categoriasTipsClase.interface";
import { Descuento } from "@/src/interfaces/descuento.interface";
import { postCategoriaClase } from "@/src/service/ajustes/categoriaTipClase.service";
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
  gfindCategorias: () => void;
}

export default function ModalCrearCategoriaClase({
  open,
  onClose,
  gfindCategorias,
}: Props) {
  const { register, handleSubmit, reset } = useForm<CategoriaClase>();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: CategoriaClase) => {
    try {
      setLoading(true);

      await postCategoriaClase(data); // <-- ahora se envía como multipart/form-data

      toast.success("La categoria se creó correctamente");
      reset();
      gfindCategorias();
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
            <ModalHeader className="pb-0 ">Agregar Categoria</ModalHeader>
            <ModalBody>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-2"
              >
                <Input
                  isRequired
                  classNames={inputClassNames}
                  label="Nombre categoria (en español)"
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
                  label="Nombre categoria (en ingles)"
                  placeholder="..."
                  variant="bordered"
                  labelPlacement="outside"
                  {...register("nombre_en")}
                  radius="sm"
                  size="sm"
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
