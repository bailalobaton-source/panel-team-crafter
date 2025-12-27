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
import { useState } from "react";
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
    <Modal isOpen={open} onOpenChange={onClose} size="3xl">
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
                <div className="flex gap-2">
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
                    defaultValue={descuento?.titulo_descuento}
                  />
                  <Input
                    isRequired
                    classNames={inputClassNames}
                    label="Titulo descuento (en inglés)"
                    placeholder="..."
                    variant="bordered"
                    labelPlacement="outside"
                    {...register("titulo_descuento_en")}
                    radius="sm"
                    size="sm"
                    defaultValue={descuento?.titulo_descuento_en}
                  />
                </div>

                <div className="flex gap-2">
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
                    defaultValue={descuento?.fecha_expiracion}
                  />
                  <Select
                    isRequired
                    classNames={selectClassNames}
                    label=" Tipo descuento"
                    labelPlacement="outside"
                    variant="bordered"
                    {...register("tipo_descuento")}
                    radius="sm"
                    size="sm"
                    defaultSelectedKeys={[descuento?.tipo_descuento || ""]}
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
                    defaultValue={descuento?.valor_descuento}
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
                    defaultValue={descuento?.codigo_descuento}
                  />
                </div>

                <div className="flex gap-2">
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
                    defaultValue={descuento?.descripcion_descuento}
                  />
                  <Textarea
                    isRequired
                    classNames={inputClassNames}
                    label="Contenido de la notifiacaion  (en inglés)"
                    placeholder="..."
                    variant="bordered"
                    labelPlacement="outside"
                    {...register("descripcion_descuento_en")}
                    radius="sm"
                    size="sm"
                    defaultValue={descuento?.descripcion_descuento_en}
                  />
                </div>
                <div className="flex gap-2">
                  <Input
                    isRequired
                    classNames={inputClassNames}
                    label="Texto 2"
                    placeholder="..."
                    variant="bordered"
                    labelPlacement="outside"
                    {...register("texto_2_es")}
                    radius="sm"
                    size="sm"
                    defaultValue={descuento?.texto_2_es}
                  />
                  <Input
                    isRequired
                    classNames={inputClassNames}
                    label="Texto 2 (en inglés)"
                    placeholder="..."
                    variant="bordered"
                    labelPlacement="outside"
                    {...register("texto_2_en")}
                    radius="sm"
                    size="sm"
                    defaultValue={descuento?.texto_2_en}
                  />
                </div>
                <Input
                  classNames={inputClassNames}
                  label="Link del descuento"
                  placeholder="..."
                  variant="bordered"
                  labelPlacement="outside"
                  {...register("enlace_descuento")}
                  radius="sm"
                  size="sm"
                  defaultValue={descuento?.enlace_descuento}
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
