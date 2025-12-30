import Loading from "@/src/components/Loading";
import {
  CategoriaClase,
  TipClase,
} from "@/src/interfaces/ajustes/categoriasTipsClase.interface";
import { Clase } from "@/src/interfaces/clase.interface";
import { FormRecurso } from "@/src/interfaces/recurso.interface";
import { postRecursoLibre } from "@/src/service/recursos.service";
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
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface Props {
  open: boolean;
  onClose: () => void;
  gfindClases: () => void;
  selectedClase?: Clase;
  clases: Clase[];
  categorias: CategoriaClase[];
  tips: TipClase[];
}

const categoriasRecurso = [
  "Cake Toppers",
  "Cajitas Temáticas",
  "Cartonaje",
  "Tarjetas Invitación",
  "Proyectos Varios",
];

const tiposRecurso = ["Exclusivos", "Adicionales"];

export default function ModalAgregarRecurso({
  open,
  onClose,
  gfindClases,
  clases,
  categorias,
  tips,
}: Props) {
  const { register, handleSubmit, reset } = useForm<FormRecurso>();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: FormRecurso) => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("nombre_recurso", data.nombre_recurso);
      formData.append("nombre_recurso_en", data.nombre_recurso_en);
      formData.append("fecha_caducidad", data.fecha_caducidad);
      formData.append("tipo_recurso_id", data.tipo_recurso_id);
      formData.append("categoria_recurso_id", data.categoria_recurso_id);
      formData.append("link_recurso", data.link_recurso);

      if (data.clase_id) {
        formData.append("clase_id", data.clase_id);
      }

      // 👇 importante: archivo de la imagen
      if (data.link_recurso && data?.link_recurso[0]) {
        formData.append("doc", data?.link_recurso[0]);
      }

      if (data.img_recurso && data?.img_recurso[0]) {
        formData.append("img", data?.img_recurso[0]);
      }

      await postRecursoLibre(formData);

      toast.success("El recurso se creo  correctamente");
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
    <Modal isOpen={open} onOpenChange={onClose} size="2xl">
      {loading && <Loading />}

      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="pb-0">Agregar recurso</ModalHeader>
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
                <Input
                  isRequired
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

                <Input
                  isRequired
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

                <div className="flex gap-2">
                  <Select
                    isRequired
                    classNames={selectClassNames}
                    label="Categoría"
                    labelPlacement="outside"
                    variant="bordered"
                    {...register("categoria_recurso_id")}
                    errorMessage="Seleccione una categoría"
                    radius="sm"
                    size="sm"
                    selectionMode="multiple"
                  >
                    {categorias.map((categoria) => (
                      <SelectItem key={categoria.id}>
                        {categoria.nombre_es}
                      </SelectItem>
                    ))}
                  </Select>
                  <Select
                    isRequired
                    classNames={selectClassNames}
                    label="Tutoriales / Tips"
                    labelPlacement="outside"
                    variant="bordered"
                    {...register("tipo_recurso_id")}
                    errorMessage="Seleccione una opción"
                    radius="sm"
                    size="sm"
                    selectionMode="multiple"
                  >
                    {tips.map((tip) => (
                      <SelectItem key={tip.id}>{tip.nombre_es}</SelectItem>
                    ))}
                  </Select>
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
