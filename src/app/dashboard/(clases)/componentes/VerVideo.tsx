import VideoPlayer from "@/src/components/VideoPlayer";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  urlVideo: string;
}

export default function VerVideo({ isOpen, onClose, urlVideo }: Props) {
  return (
    <Modal isOpen={isOpen} onOpenChange={onClose} size="3xl">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>Vista previa del video</ModalHeader>
            <ModalBody>
              <VideoPlayer hlsUrl={urlVideo} />
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Cerrar
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
