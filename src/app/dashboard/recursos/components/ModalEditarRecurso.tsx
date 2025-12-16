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
      setValue("nombre_recurso_en", selectedRecurso.nombre_recurso_en);
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
  }, [selectedRecurso, setValue, open]);

  const onSubmit = async (data: FormRecurso) => {
    if (!selectedRecurso) return;

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("nombre_recurso", data.nombre_recurso);
      formData.append("nombre_recurso_en", data.nombre_recurso_en);

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
    <Modal isOpen={open} onOpenChange={onClose} size="2xl">
      {loading && <Loading />}

      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="pb-0">Editar recurso</ModalHeader>

            <ModalBody>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-2"
              >
                {clases && (
                  <Select
                    classNames={selectClassNames}
                    label="Clases Disponibles"
                    labelPlacement="outside"
                    variant="bordered"
                    {...register("clase_id")}
                    errorMessage="Seleccione una opción"
                    radius="sm"
                    size="sm"
                  >
                    {clases
                      .filter((c) => !c.recurso)
                      ?.map((clase) => (
                        <SelectItem key={clase.id}>
                          {clase.titulo_clase}
                        </SelectItem>
                      ))}
                  </Select>
                )}
                <div className="flex gap-2">
                  <Input
                    isRequired
                    classNames={inputClassNames}
                    label="Nombre del recurso"
                    placeholder="..."
                    variant="bordered"
                    labelPlacement="outside"
                    {...register("nombre_recurso")}
                    errorMessage="El titulo de la clase es obligatorio"
                    radius="sm"
                    size="sm"
                  />
                  <Input
                    isRequired
                    classNames={inputClassNames}
                    label="Nombre del recurso (en inglés)"
                    placeholder="..."
                    variant="bordered"
                    labelPlacement="outside"
                    {...register("nombre_recurso_en")}
                    errorMessage="El titulo de la clase es obligatorio"
                    radius="sm"
                    size="sm"
                  />
                </div>
                <div className="flex gap-2 items-end">
                  <Input
                    classNames={inputClassNames}
                    label="File del recurso"
                    placeholder="..."
                    variant="bordered"
                    type="file"
                    labelPlacement="outside"
                    accept=".zip,application/zip,application/x-zip-compressed" // ✅ solo zip
                    {...register("link_recurso")}
                    errorMessage="El file del recurso es obligatorio"
                    radius="sm"
                    size="sm"
                  />
                  {selectedRecurso?.link_recurso && (
                    <p className=" text-xs ">
                      File actual del recurso : <br />{" "}
                      <span className="text-pink-500">
                        {selectedRecurso?.link_recurso}
                      </span>
                    </p>
                  )}
                </div>
                <div className="flex gap-2 items-end pt-4">
                  <Input
                    classNames={inputClassNames}
                    label="Portada del recurso"
                    placeholder="..."
                    variant="bordered"
                    type="file"
                    labelPlacement="outside"
                    accept="image/*"
                    {...register("img_recurso")}
                    errorMessage="La portada del recurso es obligatorio"
                    radius="sm"
                    size="sm"
                  />

                  {selectedRecurso?.img_recurso && (
                    <div className="w-[300px]">
                      <p className="text-xs font-semibold">
                        Portada actual del recurso:
                      </p>
                      <img
                        className="w-12 h-12  object-cover rounded-xl"
                        src={`${process.env.NEXT_PUBLIC_API_URL_UPLOADS}/${selectedRecurso.img_recurso}`}
                        alt="ps y ai"
                      />
                    </div>
                  )}
                </div>

                <Input
                  isRequired
                  classNames={inputClassNames}
                  label="Fecha de caducidad"
                  type="date"
                  placeholder="..."
                  variant="bordered"
                  labelPlacement="outside"
                  {...register("fecha_caducidad")}
                  errorMessage="La fecha de caducidad es obligatorio"
                  radius="sm"
                  size="sm"
                />

                <Select
                  isRequired
                  classNames={selectClassNames}
                  label="Tipo Recurso"
                  labelPlacement="outside"
                  variant="bordered"
                  {...register("tipo_recurso")}
                  errorMessage="Seleccione una categoría"
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
                  label="Categoria"
                  labelPlacement="outside"
                  variant="bordered"
                  {...register("categoria_recurso")}
                  errorMessage="Seleccione una opción"
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
