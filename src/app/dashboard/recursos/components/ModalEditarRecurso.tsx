import Loading from "@/src/components/Loading";
import { Clase } from "@/src/interfaces/clase.interface";
import { FormRecurso, Recurso } from "@/src/interfaces/recurso.interface";
import { updateRecurso } from "@/src/service/recursos.service";
import { inputClassNames, selectClassNames } from "@/utils/classNames";
import { handleAxiosError } from "@/utils/errorHandler";

import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Button,
  Input,
  Select,
  SelectItem,
} from "@heroui/react";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface Props {
  open: boolean;
  onClose: () => void;
  gfindClases: () => void;
  selectedRecurso: Recurso | null; // 👈 recurso seleccionado
  clases: Clase[];
}

const categoriasRecurso = [
  "Cake Toppers",
  "Cajitas Temáticas",
  "Cartonaje",
  "Tarjetas Invitación",
  "Proyectos Varios",
];

const tiposRecurso = ["Exclusivos", "Adicionales"];

export default function ModalEditarRecurso({
  open,
  onClose,
  gfindClases,
  selectedRecurso,
  clases,
}: Props) {
  const { register, handleSubmit, reset, setValue } = useForm<FormRecurso>();
  const [loading, setLoading] = useState(false);

  // 📌 Cuando abres el modal, precargar los datos del recurso
  useEffect(() => {
    if (selectedRecurso) {
      setValue("nombre_recurso", selectedRecurso.nombre_recurso);
      setValue("fecha_caducidad", selectedRecurso.fecha_caducidad);
      setValue("tipo_recurso", selectedRecurso.tipo_recurso);
      setValue("categoria_recurso", selectedRecurso.categoria_recurso);
      setValue(
        "clase_id",
        String(
          selectedRecurso.clase_id !== null ? selectedRecurso.clase_id : ""
        )
      );
    }
  }, [selectedRecurso, setValue]);

  const onSubmit = async (data: FormRecurso) => {
    if (!selectedRecurso) return;

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("nombre_recurso", data.nombre_recurso);
      formData.append("fecha_caducidad", data.fecha_caducidad);
      formData.append("tipo_recurso", data.tipo_recurso);
      formData.append("categoria_recurso", data.categoria_recurso);
      if (data.clase_id.length > 0) {
        formData.append("clase_id", data.clase_id);
      }
      // 👇 Solo enviar archivos si fueron cambiados
      if (data.link_recurso && data.link_recurso[0]) {
        formData.append("doc", data.link_recurso[0]);
      }

      if (data.img_recurso && data.img_recurso[0]) {
        formData.append("img", data.img_recurso[0]);
      }

      await updateRecurso(selectedRecurso.id, formData);

      toast.success("El recurso se actualizó correctamente");

      gfindClases();
      onClose();
      reset();
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
            <ModalHeader className="pb-0">Editar recurso</ModalHeader>

            <ModalBody>
              <form
                className="flex flex-col gap-2"
                onSubmit={handleSubmit(onSubmit)}
              >
                <Select
                  classNames={selectClassNames}
                  label="Clases Disponibles"
                  labelPlacement="outside"
                  {...register("clase_id")}
                  radius="sm"
                  size="sm"
                >
                  <>
                    <SelectItem key="">Sin Clase</SelectItem>

                    {clases.map((clase) => (
                      <SelectItem key={clase.id}>
                        {clase.titulo_clase}
                      </SelectItem>
                    ))}
                  </>
                </Select>

                <Input
                  isRequired
                  classNames={inputClassNames}
                  label="Nombre del recurso"
                  variant="bordered"
                  labelPlacement="outside"
                  {...register("nombre_recurso")}
                />

                <Input
                  classNames={inputClassNames}
                  label="Nuevo archivo ZIP (opcional)"
                  type="file"
                  variant="bordered"
                  labelPlacement="outside"
                  accept=".zip"
                  {...register("link_recurso")}
                />

                <Input
                  classNames={inputClassNames}
                  label="Nueva portada (opcional)"
                  type="file"
                  variant="bordered"
                  labelPlacement="outside"
                  accept="image/*"
                  {...register("img_recurso")}
                />

                <Input
                  isRequired
                  classNames={inputClassNames}
                  label="Fecha de caducidad"
                  type="date"
                  variant="bordered"
                  labelPlacement="outside"
                  {...register("fecha_caducidad")}
                />

                <Select
                  isRequired
                  classNames={selectClassNames}
                  label="Tipo Recurso"
                  labelPlacement="outside"
                  {...register("tipo_recurso")}
                  radius="sm"
                  size="sm"
                >
                  {tiposRecurso.map((tipo) => (
                    <SelectItem key={tipo}>{tipo}</SelectItem>
                  ))}
                </Select>

                <Select
                  isRequired
                  classNames={selectClassNames}
                  label="Categoría"
                  labelPlacement="outside"
                  {...register("categoria_recurso")}
                  radius="sm"
                  size="sm"
                >
                  {categoriasRecurso.map((cat) => (
                    <SelectItem key={cat}>{cat}</SelectItem>
                  ))}
                </Select>

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
