import Loading from "@/src/components/Loading";
import { FormClase } from "@/src/interfaces/clase.interface";
import { postClase } from "@/src/service/clases.service";
import { inputClassNames, selectClassNames } from "@/utils/classNames";
import { handleAxiosError } from "@/utils/errorHandler";
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
  gfindClases: () => void;
}

const categoriasClase = [
  "Cake Toppers",
  "Cajitas Temáticas",
  "Cartonaje",
  "Tarjetas Invitación",
  "Proyectos Varios",
];

const tutorialesTips = [
  "Tutoriales Silhouette Studio",
  "Tutoriales Cricut Design",
  "Tips de Diseño",
  "Tips de Corte",
  "Varios/otros",
];

export default function ModalNuevaClase({ open, onClose, gfindClases }: Props) {
  const { register, handleSubmit, reset } = useForm<FormClase>();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: FormClase) => {
    try {
      setLoading(true);

      await postClase(data); // <-- ahora se envía como multipart/form-data

      toast.success("La clase se creó correctamente");
      reset();
      gfindClases();
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
            <ModalHeader className="pb-0">Nueva Clase</ModalHeader>
            <ModalBody>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-2"
              >
                <div className="flex gap-2">
                  <Input
                    isRequired
                    classNames={inputClassNames}
                    label="Titulo de la clase"
                    placeholder="..."
                    variant="bordered"
                    labelPlacement="outside"
                    {...register("titulo_clase")}
                    errorMessage="El titulo de la clase es obligatorio"
                    radius="sm"
                    size="sm"
                  />
                  <Input
                    isRequired
                    classNames={inputClassNames}
                    label="Titulo de la clase (en inglés)"
                    placeholder="..."
                    variant="bordered"
                    labelPlacement="outside"
                    {...register("titulo_clase_en")}
                    errorMessage="El titulo de la clase es obligatorio"
                    radius="sm"
                    size="sm"
                  />
                </div>
                <Input
                  isRequired
                  classNames={inputClassNames}
                  label="Video de la clase"
                  placeholder="..."
                  variant="bordered"
                  labelPlacement="outside"
                  {...register("video_clase")}
                  errorMessage="El video de la clase es obligatorio"
                  radius="sm"
                  size="sm"
                />
                <Input
                  isRequired
                  classNames={inputClassNames}
                  label="Poster Video"
                  placeholder="..."
                  variant="bordered"
                  labelPlacement="outside"
                  {...register("poster_url")}
                  errorMessage="El Poster del video obligatorio"
                  radius="sm"
                  size="sm"
                />
                <Input
                  isRequired
                  classNames={inputClassNames}
                  label="Duración del video"
                  type="text"
                  placeholder="H:MM:SS"
                  pattern="^([0-9]{1,2}):([0-5]?[0-9]):([0-5]?[0-9])$" // HH:MM:SS flexible
                  variant="bordered"
                  labelPlacement="outside"
                  {...register("duracion_video")}
                  errorMessage="Formato válido: H:MM:SS (ej. 1:20:20)"
                  radius="sm"
                  size="sm"
                />
                <div className="flex gap-2">
                  <Select
                    isRequired
                    classNames={selectClassNames}
                    label="Categoría"
                    labelPlacement="outside"
                    variant="bordered"
                    {...register("categoria_clase")}
                    errorMessage="Seleccione una categoría"
                    radius="sm"
                    size="sm"
                  >
                    {categoriasClase.map((categoria) => (
                      <SelectItem key={categoria}>{categoria}</SelectItem>
                    ))}
                  </Select>
                  <Select
                    isRequired
                    classNames={selectClassNames}
                    label="Tutoriales / Tips"
                    labelPlacement="outside"
                    variant="bordered"
                    {...register("tutoriales_tips")}
                    errorMessage="Seleccione una opción"
                    radius="sm"
                    size="sm"
                  >
                    {tutorialesTips.map((tip) => (
                      <SelectItem key={tip}>{tip}</SelectItem>
                    ))}
                  </Select>
                </div>
                <div className="flex gap-2">
                  <Textarea
                    isRequired
                    classNames={inputClassNames}
                    label="Descripción de la clase"
                    placeholder="..."
                    variant="bordered"
                    labelPlacement="outside"
                    {...register("descripcion_clase")}
                    errorMessage="La descripción de la clase es obligatorio"
                    radius="sm"
                    size="sm"
                  />

                  <Textarea
                    isRequired
                    classNames={inputClassNames}
                    label="Descripción de la clase (en inglés)"
                    placeholder="..."
                    variant="bordered"
                    labelPlacement="outside"
                    {...register("descripcion_clase_en")}
                    errorMessage="La descripción de la clase es obligatorio"
                    radius="sm"
                    size="sm"
                  />
                </div>
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
