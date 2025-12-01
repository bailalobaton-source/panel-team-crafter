import Loading from "@/src/components/Loading";
import { Banner } from "@/src/interfaces/banner.interface";
import { deleteBanner } from "@/src/service/banner.service";
import { handleAxiosError } from "@/utils/errorHandler";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Button,
  ModalFooter,
} from "@heroui/react";
import { useState } from "react";
import { toast } from "sonner";

interface Props {
  open: boolean;
  onClose: () => void;
  gfindBanner: () => void;
  selectedBanner: Banner;
}

export default function ModalEliminarBanner({
  open,
  onClose,
  gfindBanner,
  selectedBanner,
}: Props) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);

      await deleteBanner(selectedBanner.id);

      toast.success("La notificacion  fue eliminado correctamente");
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
            <ModalHeader className="pb-0">Eliminar Banner</ModalHeader>
            <ModalBody>
              <img
                className="w-full  object-cover rounded-xl"
                src={`${process.env.NEXT_PUBLIC_API_URL_UPLOADS}/${selectedBanner.url_banner}`}
                alt="ps y ai"
              />
              <p>
                ¿Está seguro de que desea eliminar el Banner? Esta acción no se
                puede deshacer.
              </p>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onPress={onClose}>
                Cancelar
              </Button>
              <Button color="danger" onPress={handleDelete}>
                Eliminar
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
