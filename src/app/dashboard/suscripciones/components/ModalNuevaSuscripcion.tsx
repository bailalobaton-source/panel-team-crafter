import Loading from "@/src/components/Loading";
import { SubscriptionType } from "@/src/interfaces/suscripcion.interface";
import { User } from "@/src/interfaces/user.type";
import { postSuscripcion } from "@/src/service/suscripcion.service"; // <-- Asegúrate de tener este servicio
import { inputClassNames, selectClassNames } from "@/utils/classNames";
import { handleAxiosError } from "@/utils/errorHandler";
import { useNumericInput } from "@/utils/onInputs";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Button,
  Input,
  Select,
  SelectItem,
  Autocomplete,
  AutocompleteItem,
} from "@heroui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface Props {
  isOpen: boolean;
  onOpenChange: () => void;
  gfindSuscripcion: () => void;
  usuarios: User[]; // <-- Añadimos los usuarios como prop
}

export default function ModalNuevaSuscripcion({
  isOpen,
  onOpenChange,
  gfindSuscripcion,
  usuarios,
}: Props) {
  const { register, handleSubmit, reset, setValue } =
    useForm<SubscriptionType>();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: SubscriptionType) => {
    try {
      setLoading(true);

      // Limpiamos strings vacíos de los IDs de pago para evitar errores en DB
      const payload = {
        ...data,
        suscripcion_id_paypal: data.suscripcion_id_paypal || null,
        flow_subscription_id: data.flow_subscription_id || null,
      };

      await postSuscripcion(payload); // <-- Llamada al servicio correcto

      toast.success("La suscripción se creó correctamente");
      reset();
      gfindSuscripcion();
      onOpenChange(); // Cierra el modal
    } catch (err) {
      handleAxiosError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="2xl">
      {loading && <Loading />}

      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="pb-0 text-slate-800 font-extrabold">
              Nueva Suscripción
            </ModalHeader>
            <ModalBody>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-4 py-2"
              >
                {/* FILA 1: Usuario */}
                <div className="w-full">
                  <Autocomplete
                    isRequired
                    label="Usuario"
                    placeholder="Buscar por nombre o correo"
                    size="sm"
                    labelPlacement="outside"
                    variant="bordered"
                    onSelectionChange={(key) =>
                      setValue("user_id", key ? key.toString() : "")
                    }
                    inputProps={{
                      classNames: {
                        input: "text-sm text-slate-700",
                        inputWrapper:
                          "min-h-10 border-1 border-slate-300 bg-slate-50 hover:border-[#48D1CC] focus-within:border-[#48D1CC] shadow-sm transition-colors",
                        label:
                          "pb-1 text-[0.8rem] text-slate-600 font-semibold",
                      },
                    }}
                  >
                    {usuarios.map((user) => (
                      <AutocompleteItem
                        key={user.id}
                        textValue={`${user.nombre} ${user.apellidos || ""} - ${user.correo}`}
                      >
                        <div className="flex flex-col py-0.5">
                          <span className="text-sm font-semibold text-slate-700">
                            {user.nombre} {user.apellidos}
                          </span>
                          <span className="text-xs text-slate-400">
                            {user.correo}
                          </span>
                        </div>
                      </AutocompleteItem>
                    ))}
                  </Autocomplete>
                </div>

                {/* FILA 2: Plan, Estado, Precio */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <Select
                    isRequired
                    classNames={selectClassNames}
                    label="Plan"
                    labelPlacement="outside"
                    variant="bordered"
                    {...register("plan_id")}
                    radius="sm"
                    size="sm"
                    className="w-full sm:w-1/3"
                  >
                    <SelectItem key="1">Plan Básico</SelectItem>
                    <SelectItem key="2">Plan Estándar</SelectItem>
                    <SelectItem key="3">Plan Pro Crafter</SelectItem>
                    <SelectItem key="4">Plan Básico $1</SelectItem>
                  </Select>

                  <Select
                    isRequired
                    classNames={selectClassNames}
                    label="Estado"
                    labelPlacement="outside"
                    variant="bordered"
                    {...register("status")}
                    radius="sm"
                    size="sm"
                    className="w-full sm:w-1/3"
                  >
                    <SelectItem key="pendiente">Pendiente</SelectItem>
                    <SelectItem key="activa">Activa</SelectItem>
                    <SelectItem key="expirada">Expirada</SelectItem>
                    <SelectItem key="cancelada">Cancelada</SelectItem>
                  </Select>

                  <Input
                    isRequired
                    classNames={inputClassNames}
                    label="Precio ($)"
                    placeholder="Ej. 19.99"
                    variant="bordered"
                    labelPlacement="outside"
                    {...register("precio", { valueAsNumber: true })}
                    radius="sm"
                    size="sm"
                    onInput={useNumericInput}
                    className="w-full sm:w-1/3"
                  />
                </div>

                {/* FILA 3: Fechas */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <Input
                    isRequired
                    classNames={inputClassNames}
                    label="Fecha Inicio"
                    type="date"
                    variant="bordered"
                    labelPlacement="outside"
                    {...register("startDate")}
                    radius="sm"
                    size="sm"
                    className="w-full sm:w-1/2"
                  />
                  <Input
                    isRequired
                    classNames={inputClassNames}
                    label="Fecha Fin"
                    type="date"
                    variant="bordered"
                    labelPlacement="outside"
                    {...register("endDate")}
                    radius="sm"
                    size="sm"
                    className="w-full sm:w-1/2"
                  />
                </div>

                {/* FILA 4: IDs de Pasarelas */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <Input
                    classNames={inputClassNames}
                    label="ID PayPal (Opcional)"
                    placeholder="I-XXXXXXXXXXXX"
                    variant="bordered"
                    labelPlacement="outside"
                    {...register("suscripcion_id_paypal")}
                    radius="sm"
                    size="sm"
                    className="w-full sm:w-1/2"
                  />
                  <Input
                    classNames={inputClassNames}
                    label="ID Flow (Opcional)"
                    placeholder="flow_XXXXXX"
                    variant="bordered"
                    labelPlacement="outside"
                    {...register("flow_subscription_id")}
                    radius="sm"
                    size="sm"
                    className="w-full sm:w-1/2"
                  />
                </div>

                {/* BOTONES */}
                <div className="flex justify-end gap-3 mt-6">
                  <Button
                    color="danger"
                    variant="light"
                    type="button"
                    onPress={onClose}
                    size="sm"
                  >
                    Cancelar
                  </Button>
                  <Button
                    className="bg-gradient-to-r from-[#48D1CC] to-[#FF69B4] text-white font-bold shadow-md shadow-pink-200"
                    type="submit"
                    size="sm"
                  >
                    Guardar Suscripción
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
