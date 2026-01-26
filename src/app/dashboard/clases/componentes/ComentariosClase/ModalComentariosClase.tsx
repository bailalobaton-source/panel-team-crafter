import { Clase } from "@/src/interfaces/clase.interface";
import { ComentarioClase } from "@/src/interfaces/comentario.interface";
import { getComentariosClase } from "@/src/service/comentarios.service";
import { handleAxiosError } from "@/utils/errorHandler";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";
import { useCallback, useEffect, useState } from "react";
import ComentarioItem from "./ComentariosItem/ComentariosItem";

interface Props {
  open: boolean;
  onClose: () => void;
  selectedClase: Clase;
}

export default function ModalComentariosClase({
  open,
  onClose,
  selectedClase,
}: Props) {
  const [comentarios, setComentarios] = useState<ComentarioClase[]>([]);

  const findComentarios = useCallback(async () => {
    try {
      const res = await getComentariosClase(selectedClase.id);
      setComentarios(res);
    } catch (err) {
      handleAxiosError(err);
    }
  }, [selectedClase]);

  useEffect(() => {
    findComentarios();
  }, [findComentarios, selectedClase.id]);

  return (
    <Modal isOpen={open} onOpenChange={onClose} size="3xl">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="pb-0">
              Comentarios Clase:{" "}
              <span className="ml-1 font-semibold">
                {selectedClase.titulo_clase}
              </span>
            </ModalHeader>
            <ModalBody>
              <div className="space-y-8">
                {comentarios.map((comentario) => (
                  <ComentarioItem
                    key={comentario.id}
                    comentario={comentario}
                    findComentarios={findComentarios}
                  />
                ))}
              </div>{" "}
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onPress={onClose}>
                Cerrar
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
