import Loading from "@/src/components/Loading";
import { Descuento } from "@/src/interfaces/descuento.interface";
import { updateDescuento } from "@/src/service/descuento.service";
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
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface Props {
  open: boolean;
  onClose: () => void;
  descuento: Descuento | null; // datos a editar
  gfindDescuentos: () => void;
}

export default function ModalEditarDescuento({
  open,
  onClose,
  descuento,
  gfindDescuentos,
}: Props) {
  const { register, handleSubmit, reset } = useForm<Descuento>();
  const [loading, setLoading] = useState(false);

  // Cuando se abre el modal, llenar el formulario con los datos existentes
  useEffect(() => {
    if (descuento && open) {
      reset({
        titulo_descuento: descuento.titulo_descuento,
        fecha_expiracion: descuento.fecha_expiracion?.substring(0, 10),
        tipo_descuento: descuento.tipo_descuento,
        valor_descuento: descuento.valor_descuento,
        codigo_descuento: descuento.codigo_descuento,
        descripcion_descuento: descuento.descripcion_descuento,
      });
    }
  }, [descuento, open, reset]);

  const onSubmit = async (data: Descuento) => {
    try {
      if (!descuento?.id) return;

      setLoading(true);
      await updateDescuento(descuento.id, data);

      toast.success("El descuento se actualizó correctamente");

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
            <ModalHeader className="pb-0">Editar Descuento</ModalHeader>
            <ModalBody>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-2"
              >
                <Input
                  isRequired
                  classNames={inputClassNames}
                  label="Título descuento"
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
                    label="Tipo descuento"
                    labelPlacement="outside"
                    {...register("tipo_descuento")}
                    radius="sm"
                    size="sm"
                    defaultSelectedKeys={
                      descuento ? [descuento.tipo_descuento] : []
                    }
                  >
                    <SelectItem key="porcentaje">porcentaje</SelectItem>
                    <SelectItem key="monto">monto</SelectItem>
                  </Select>

                  <Input
                    classNames={inputClassNames}
                    label="Valor descuento"
                    placeholder="..."
                    variant="bordered"
                    labelPlacement="outside"
                    {...register("valor_descuento")}
                    radius="sm"
                    size="sm"
                    onInput={useNumericInput}
                  />
                </div>

                <Input
                  classNames={inputClassNames}
                  label="Código descuento"
                  placeholder="..."
                  variant="bordered"
                  labelPlacement="outside"
                  {...register("codigo_descuento")}
                  radius="sm"
                  size="sm"
                />

                <Textarea
                  isRequired
                  classNames={inputClassNames}
                  label="Contenido de la notificación"
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
                    Actualizar
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
