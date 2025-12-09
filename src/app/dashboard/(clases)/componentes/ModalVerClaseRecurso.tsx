import VideoPlayer from "@/src/components/VideoPlayer";
import { Clase } from "@/src/interfaces/clase.interface";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";
import Image from "next/image";

interface Props {
  open: boolean;
  onClose: () => void;
  selectedClase: Clase;
}

export default function ModalVerClaseRecurso({
  open,
  onClose,
  selectedClase,
}: Props) {
  return (
    <Modal isOpen={open} onOpenChange={onClose} size="3xl">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="pb-0">
              Clase:{" "}
              <span className="ml-1 font-semibold">
                {selectedClase.titulo_clase}
              </span>
            </ModalHeader>
            <ModalBody>
              <Card shadow="sm" className="rounded-xl border border-gray-200">
                <CardHeader className="flex gap-3 items-center">
                  <div className="w-32">
                    <VideoPlayer
                      hlsUrl={selectedClase.video_clase}
                      ThumbnailUrl={selectedClase.poster_url}
                      mode="poster"
                    />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold">
                      {selectedClase.titulo_clase}
                    </h2>
                    <p className="text-sm text-gray-500">
                      {selectedClase.categoria_clase}
                    </p>
                  </div>
                </CardHeader>
                <Divider />
                <CardBody>
                  <p className="text-sm text-gray-700">
                    {selectedClase.descripcion_clase}
                  </p>
                  <p className="mt-2 text-sm">
                    <strong>Duración:</strong> {selectedClase.duracion_video}
                  </p>
                  <p className="text-sm">
                    <strong>Tutorial:</strong> {selectedClase.tutoriales_tips}
                  </p>
                  <p className="text-sm">
                    <strong>Likes:</strong> {selectedClase.nro_likes} ·{" "}
                    <strong>Reproducciones:</strong>{" "}
                    {selectedClase.nro_reproducciones}
                  </p>

                  {/* Video */}
                  <div className="mt-4 w-60">
                    <VideoPlayer hlsUrl={selectedClase.video_clase} />
                  </div>

                  {/* Recurso */}
                  {selectedClase.recurso && (
                    <div className="mt-4 border p-3 rounded-lg bg-gray-50">
                      <h3 className="text-base font-semibold">
                        Recurso disponible
                      </h3>
                      <p className="text-sm text-gray-600">
                        {selectedClase.recurso.nombre_recurso}
                      </p>
                      <p className="text-sm text-gray-600">
                        Categoría: {selectedClase.recurso.categoria_recurso} ·
                        Tipo: {selectedClase.recurso.tipo_recurso}
                      </p>
                      <p className="text-sm text-gray-600">
                        Fecha de caducidad:{" "}
                        {selectedClase.recurso.fecha_caducidad} ·
                      </p>
                      <a
                        href={`${process.env.NEXT_PUBLIC_API_URL_UPLOADS}/doc/${selectedClase.recurso.link_recurso}`}
                        download
                        target="_blank"
                        className="mt-2 inline-flex items-center gap-2 px-3 py-1.5 text-sm rounded-md bg-primary text-white hover:bg-primary-600 transition"
                      >
                        Descargar recurso (ZIP)
                      </a>
                    </div>
                  )}
                </CardBody>
              </Card>
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
