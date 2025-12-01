import Loading from "@/src/components/Loading";
import { Notificacion } from "@/src/interfaces/notificaciones.interface";
import { updateNotificaciones } from "@/src/service/notificaciones.service";
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
  gfindNotificaciones: () => void;
  selectedNotificacion: Notificacion;
}

export default function ModalEditarNotificacion({
  open,
  onClose,
  gfindNotificaciones,
  selectedNotificacion,
}: Props) {
  const { register, handleSubmit, reset } = useForm<Notificacion>();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: Notificacion) => {
    try {
      setLoading(true);

      await updateNotificaciones(data, selectedNotificacion.id); // <-- ahora se envía como multipart/form-data

      toast.success("La notificación se edito correctamente");
      reset();
      gfindNotificaciones();
      onClose();
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
            <ModalHeader className="pb-0 ">Editar Notifación</ModalHeader>
            <ModalBody>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-2"
              >
                <Input
                  isRequired
                  classNames={inputClassNames}
                  label="Titulo "
                  placeholder="..."
                  variant="bordered"
                  labelPlacement="outside"
                  {...register("titulo")}
                  errorMessage="El titulo de la notifiacaion es obligatorio"
                  radius="sm"
                  size="sm"
                  defaultValue={selectedNotificacion.titulo}
                />
                <Input
                  classNames={inputClassNames}
                  label="Url notificacion"
                  placeholder="..."
                  variant="bordered"
                  labelPlacement="outside"
                  {...register("url_notificacion")}
                  radius="sm"
                  size="sm"
                  defaultValue={selectedNotificacion.url_notificacion}
                />

                <Select
                  isRequired
                  classNames={selectClassNames}
                  label=" Tipo Notificación"
                  labelPlacement="outside"
                  {...register("tipo_notificacion")}
                  errorMessage="Seleccione un tipo de Notificación"
                  radius="sm"
                  size="sm"
                  defaultSelectedKeys={[selectedNotificacion.tipo_notificacion]}
                >
                  <SelectItem key="noticias">noticias</SelectItem>
                  <SelectItem key="promociones">promociones</SelectItem>
                </Select>

                <Textarea
                  isRequired
                  classNames={inputClassNames}
                  label="Contenido de la notifiacaion"
                  placeholder="..."
                  variant="bordered"
                  labelPlacement="outside"
                  {...register("contenido")}
                  errorMessage="El contenido de la notifiacaion es obligatorio"
                  radius="sm"
                  size="sm"
                  defaultValue={selectedNotificacion.contenido}
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
