import Loading from "@/src/components/Loading";
import { Banner } from "@/src/interfaces/banner.interface";
import { updateBanner } from "@/src/service/banner.service";
import { inputClassNames } from "@/utils/classNames";
import { handleAxiosError } from "@/utils/errorHandler";
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
  gfindBanner: () => void;
  selectedBanner: Banner;
}

export default function ModalEditarBanner({
  open,
  onClose,
  gfindBanner,
  selectedBanner,
}: Props) {
  const { register, handleSubmit, reset } = useForm<Banner>();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: Banner) => {
    setLoading(true);
    try {
      const formData = new FormData();

      if (data.url_banner && data?.url_banner[0]) {
        formData.append("img", data?.url_banner[0]);
      }

      await updateBanner(formData, selectedBanner.id);

      toast.success("La notificación se edito correctamente");
      reset();
      gfindBanner();
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
            <ModalHeader className="pb-0 ">Editar Banner</ModalHeader>
            <ModalBody>
              <img
                className="w-full  object-cover rounded-xl"
                src={`${process.env.NEXT_PUBLIC_API_URL_UPLOADS}/${selectedBanner.url_banner}`}
                alt="ps y ai"
              />
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-2"
              >
                <Input
                  isRequired
                  classNames={inputClassNames}
                  label="Imagen del banner"
                  placeholder="..."
                  variant="bordered"
                  labelPlacement="outside"
                  type="file"
                  accept="image/*"
                  {...register("url_banner")}
                  errorMessage="La imagen del banner es obligatorio"
                  radius="sm"
                  size="sm"
                />

                <div className="flex justify-end gap-3 mt-4">
                  <Button color="danger" type="button" onPress={onClose}>
                    Cancelar
                  </Button>
                  <Button color="primary" type="submit">
                    Agregar
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
