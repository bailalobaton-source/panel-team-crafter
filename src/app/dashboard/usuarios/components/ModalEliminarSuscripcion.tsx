import Loading from "@/src/components/Loading";
import { SubscriptionType } from "@/src/interfaces/suscripcion.interface";
import { deleteSuscripcion } from "@/src/service/suscripcion.service";
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
import { BsExclamationTriangle } from "react-icons/bs";

interface Props {
  isOpen: boolean;
  onOpenChange: () => void;
  suscripcion: SubscriptionType;
  gfindSuscripcion: () => void;
}

export default function ModalEliminarSuscripcion({
  isOpen,
  onOpenChange,
  suscripcion,
  gfindSuscripcion,
}: Props) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);
      await deleteSuscripcion(suscripcion.id);

      toast.success("La suscripción fue eliminada correctamente");
      gfindSuscripcion();
      onOpenChange();
    } catch (err) {
      handleAxiosError(err);
    } finally {
      setLoading(false);
    }
  };

  const nombreUsuario = suscripcion.usuario?.nombre
    ? `${suscripcion.usuario.nombre} ${suscripcion.usuario.apellidos || ""}`
    : `ID: ${suscripcion.user_id}`;

  const nombrePlan =
    suscripcion.plan?.nombre_plan || `Plan #${suscripcion.plan_id}`;

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      classNames={{
        base: "border border-rose-100", // Borde sutil
        closeButton: "hover:bg-rose-50 active:bg-rose-100", // Botón de cierre en tonos rojos
      }}
    >
      {loading && <Loading />}

      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 pb-2 pt-6">
              <div className="flex items-center gap-3">
                {/* Ícono de advertencia con fondo suave */}
                <div className="flex shrink-0 items-center justify-center w-12 h-12 rounded-full bg-rose-100 text-rose-600">
                  <BsExclamationTriangle className="text-xl" />
                </div>
                <div>
                  <h2 className="text-xl font-extrabold text-slate-800">
                    Eliminar Suscripción
                  </h2>
                  <p className="text-sm text-slate-500 font-medium">
                    ID de registro: #{suscripcion.id}
                  </p>
                </div>
              </div>
            </ModalHeader>

            <ModalBody className="py-4">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-3">
                <p className="text-slate-700 text-sm leading-relaxed">
                  ¿Está seguro de que desea eliminar la suscripción del{" "}
                  <span className="font-bold text-slate-900">{nombrePlan}</span>{" "}
                  perteneciente al usuario{" "}
                  <span className="font-bold text-slate-900">
                    {nombreUsuario}
                  </span>
                  ?
                </p>

                {/* Caja de alerta interna */}
                <div className="flex p-3 bg-rose-50/50 border border-rose-200/60 rounded-lg">
                  <p className="text-xs text-rose-600 font-medium leading-snug">
                    Esta acción es{" "}
                    <span className="font-bold">irreversible</span>. Los datos
                    de la suscripción se borrarán de forma permanente de la base
                    de datos.
                  </p>
                </div>
              </div>
            </ModalBody>

            <ModalFooter className="pt-2 pb-6">
              <Button
                variant="light"
                onPress={onClose}
                className="text-slate-500 hover:text-slate-700 hover:bg-slate-100 font-medium"
              >
                Mantener suscripción
              </Button>
              <Button
                color="danger"
                onPress={handleDelete}
                className="font-bold shadow-md shadow-rose-200 bg-rose-600 hover:bg-rose-700 text-white"
                startContent={<BsExclamationTriangle className="text-sm" />}
              >
                Sí, eliminar
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
