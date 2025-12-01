import Loading from "@/src/components/Loading";
import { Descuento } from "@/src/interfaces/descuento.interface";
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
  Textarea,
  Select,
  SelectItem,
} from "@heroui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface Props {
  open: boolean;
  onClose: () => void;
  gfindDescuentos: () => void;
}

export default function ModalNuevoDescuento({
  open,
  onClose,
  gfindDescuentos,
}: Props) {
  const { register, handleSubmit, reset } = useForm<Descuento>();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: Descuento) => {
    try {
      setLoading(true);

      await postDescuento(data); // <-- ahora se envía como multipart/form-data

      toast.success("La notificación se creó correctamente");
      reset();
      gfindDescuentos();
      onClose();
    } catch (err) {
      handleAxiosError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={open} onOpenChange={onClose} size="lg">
      {loading && <Loading />}

      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="pb-0 ">Agregar Descuento</ModalHeader>
            <ModalBody>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-2"
              >
                <Input
                  isRequired
                  classNames={inputClassNames}
                  label="Titulo descuento"
                  placeholder="..."
                  variant="bordered"
                  labelPlacement="outside"
                  {...register("titulo_descuento")}
                  radius="sm"
                  size="sm"
                />
                <Input
                  isRequired
                  classNames={inputClassNames}
                  label="Fecha expiración"
                  type="date"
                  placeholder="..."
                  variant="bordered"
                  labelPlacement="outside"
                  {...register("fecha_expiracion")}
                  radius="sm"
                  size="sm"
                />

                <div className="flex gap-2">
                  <Select
                    isRequired
                    classNames={selectClassNames}
                    label=" Tipo descuento"
                    labelPlacement="outside"
                    {...register("tipo_descuento")}
                    radius="sm"
                    size="sm"
                  >
                    <SelectItem key="porcentaje">porcentaje</SelectItem>
                    <SelectItem key="monto">monto</SelectItem>
                  </Select>
                  <Input
                    classNames={inputClassNames}
                    label="Valor Descuento"
                    placeholder="..."
                    variant="bordered"
                    labelPlacement="outside"
                    {...register("valor_descuento")}
                    radius="sm"
                    size="sm"
                    onInput={useNumericInput}
                  />
                </div>
                <div className="flex gap-2">
                  <Input
                    classNames={inputClassNames}
                    label="Codigo descuento"
                    placeholder="..."
                    variant="bordered"
                    labelPlacement="outside"
                    {...register("codigo_descuento")}
                    radius="sm"
                    size="sm"
                  />
                </div>

                <Textarea
                  isRequired
                  classNames={inputClassNames}
                  label="Contenido de la notifiacaion"
                  placeholder="..."
                  variant="bordered"
                  labelPlacement="outside"
                  {...register("descripcion_descuento")}
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
