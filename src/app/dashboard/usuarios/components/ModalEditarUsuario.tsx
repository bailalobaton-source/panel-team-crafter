import Loading from "@/src/components/Loading";
import { User } from "@/src/interfaces/user.type";
import { updateUser } from "@/src/service/user.service";
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
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { LuEye, LuEyeOff } from "react-icons/lu"; // Importamos los íconos

interface Props {
  isOpen: boolean;
  onOpenChange: () => void;
  gfindUsuarios: () => void;
  usuario: User;
}

interface FormValues extends User {
  newPassword?: string;
}

export default function ModalEditarUsuario({
  isOpen,
  onOpenChange,
  gfindUsuarios,
  usuario,
}: Props) {
  const { register, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: usuario,
  });

  const [loading, setLoading] = useState(false);

  // Estado para controlar la visibilidad de la contraseña
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  useEffect(() => {
    if (usuario) {
      reset({ ...usuario, newPassword: "" });
      setIsVisible(false); // Reiniciamos la visibilidad al abrir
    }
  }, [usuario, reset]);

  const onSubmit = async (data: FormValues) => {
    try {
      setLoading(true);

      const payload = {
        ...data,
        emailVerified: String(data.emailVerified) === "true",
      };

      await updateUser(usuario.id, payload);

      toast.success("El usuario se actualizó correctamente");
      gfindUsuarios();
      onOpenChange();
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
              Editar Usuario
            </ModalHeader>
            <ModalBody>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-4 py-2"
              >
                {/* FILA 1: Nombre y Apellidos */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <Input
                    isRequired
                    classNames={inputClassNames}
                    label="Nombre(s)"
                    placeholder="Ej. Juan"
                    variant="bordered"
                    labelPlacement="outside"
                    {...register("nombre")}
                    radius="sm"
                    size="sm"
                    className="w-full sm:w-1/2"
                  />
                  <Input
                    isRequired
                    classNames={inputClassNames}
                    label="Apellidos"
                    placeholder="Ej. Pérez"
                    variant="bordered"
                    labelPlacement="outside"
                    {...register("apellidos")}
                    radius="sm"
                    size="sm"
                    className="w-full sm:w-1/2"
                  />
                </div>

                {/* FILA 2: Correo y Teléfono */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <Input
                    isRequired
                    type="email"
                    classNames={inputClassNames}
                    label="Correo Electrónico"
                    placeholder="correo@ejemplo.com"
                    variant="bordered"
                    labelPlacement="outside"
                    {...register("correo")}
                    radius="sm"
                    size="sm"
                    className="w-full sm:w-1/2"
                  />
                  <Input
                    classNames={inputClassNames}
                    label="Teléfono"
                    placeholder="Ej. +51 987654321"
                    variant="bordered"
                    labelPlacement="outside"
                    {...register("telefono")}
                    radius="sm"
                    size="sm"
                    className="w-full sm:w-1/2"
                  />
                </div>

                {/* FILA 3: País, Código de País y DNI */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <Input
                    classNames={inputClassNames}
                    label="País"
                    placeholder="Ej. Perú"
                    variant="bordered"
                    labelPlacement="outside"
                    {...register("pais")}
                    radius="sm"
                    size="sm"
                    className="w-full sm:w-1/3"
                  />
                  <Input
                    classNames={inputClassNames}
                    label="Código de País"
                    placeholder="Ej. PE"
                    variant="bordered"
                    labelPlacement="outside"
                    {...register("codigo_pais")}
                    radius="sm"
                    size="sm"
                    className="w-full sm:w-1/3"
                  />
                  <Input
                    classNames={inputClassNames}
                    label="DNI / ID / CE"
                    placeholder="Número de documento"
                    variant="bordered"
                    labelPlacement="outside"
                    {...register("dni_id_ce")}
                    radius="sm"
                    size="sm"
                    className="w-full sm:w-1/3"
                  />
                </div>

                {/* FILA 4: Estado y Verificación */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <Select
                    isRequired
                    classNames={selectClassNames}
                    label="Estado de la Cuenta"
                    labelPlacement="outside"
                    variant="bordered"
                    {...register("status")}
                    defaultSelectedKeys={[usuario.status]}
                    radius="sm"
                    size="sm"
                    className="w-full sm:w-1/2"
                  >
                    <SelectItem key="active">Activo</SelectItem>
                    <SelectItem key="disabled">Deshabilitado</SelectItem>
                    <SelectItem key="bloqued">Bloqueado</SelectItem>
                  </Select>

                  <Select
                    isRequired
                    classNames={selectClassNames}
                    label="Verificación de Correo"
                    labelPlacement="outside"
                    variant="bordered"
                    {...register("emailVerified")}
                    defaultSelectedKeys={[String(usuario.emailVerified)]}
                    radius="sm"
                    size="sm"
                    className="w-full sm:w-1/2"
                  >
                    <SelectItem key="true">Verificado</SelectItem>
                    <SelectItem key="false">Pendiente</SelectItem>
                  </Select>
                </div>

                {/* FILA 5: SEGURIDAD (Cambio de Contraseña) */}
                <div className="flex flex-col mt-2 pt-4 border-t border-slate-100">
                  <h3 className="text-sm font-bold text-slate-700 mb-3">
                    Seguridad
                  </h3>
                  <Input
                    type={isVisible ? "text" : "password"} // Cambia el tipo según el estado
                    classNames={inputClassNames}
                    label="Nueva Contraseña (Opcional)"
                    placeholder="Dejar en blanco para mantener la actual"
                    variant="bordered"
                    labelPlacement="outside"
                    {...register("newPassword")}
                    radius="sm"
                    size="sm"
                    className="w-full sm:w-1/2"
                    endContent={
                      <button
                        className="focus:outline-none"
                        type="button"
                        onClick={toggleVisibility}
                        aria-label="toggle password visibility"
                      >
                        {isVisible ? (
                          <LuEyeOff className="text-xl text-slate-400 pointer-events-none" />
                        ) : (
                          <LuEye className="text-xl text-slate-400 pointer-events-none" />
                        )}
                      </button>
                    }
                  />
                  <p className="text-xs text-slate-400 mt-1">
                    Solo llena este campo si deseas forzar un cambio de
                    contraseña para el usuario.
                  </p>
                </div>

                {/* BOTONES */}
                <div className="flex justify-end gap-3 mt-4">
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
                    Actualizar Usuario
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
