"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Image from "next/image";
import { Button, Input } from "@heroui/react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { inputClassNames } from "@/utils/classNames";
import { toast } from "sonner";
import axios from "axios";
import { login } from "@/src/service/authService";

type LoginFormInputs = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false); // Estado para mostrar u ocultar la contraseña
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev); // Alterna entre mostrar y ocultar
  };

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      await login(data.email, data.password);

      router.push("/dashboard");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const message =
          err.response?.data?.message || "Error al iniciar sesión";
        toast.error(message);
        setError(message);
      } else {
        toast.error("Ocurrió un error inesperado");
        setError("Ocurrió un error inesperado");
      }
    }
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-gray-100 ">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-[400px] bg-white p-4 py-6 flex flex-col items-center gap-3  shadow-md shadow-stone-400 rounded-xl"
      >
        <Image
          className="w-[150px]"
          src="/img/logo.png"
          alt="Picture of the author"
          height={500}
          width={500}
          priority
        />
        <h2 className="text-xl text-stone-800 font-bold  pt-2">
          Iniciar sesión
        </h2>
        <Input
          label="Email"
          classNames={inputClassNames}
          labelPlacement="outside"
          variant="bordered"
          type="email"
          placeholder="ingrese su email"
          {...register("email", {
            required: "El email es obligatorio",
          })}
          isInvalid={!!errors.email}
          color={errors.email ? "danger" : "primary"}
          errorMessage={errors.email?.message}
          radius="sm"
          size="md"
        />
        {error.length > 2 && (
          <span className="text-sm text-red-500">{error}</span>
        )}
        <Input
          classNames={inputClassNames}
          labelPlacement="outside"
          variant="bordered"
          label="Contraseña"
          placeholder="ingrese su contraseña"
          {...register("password", {
            required: "La contraseña es obligatorio.",
          })}
          isInvalid={!!errors.password}
          color={errors.password ? "danger" : "primary"}
          errorMessage={errors.password?.message}
          radius="sm"
          size="md"
          id="password_login"
          type={showPassword ? "text" : "password"}
          endContent={
            <button
              className="focus:outline-none"
              type="button"
              onClick={togglePasswordVisibility}
              aria-label="toggle password visibility"
            >
              {showPassword ? (
                <FaEyeSlash className="text-2xl text-yellow-500 pointer-events-none flex-shrink-0" />
              ) : (
                <FaEye className="text-2xl text-yellow-500 pointer-events-none flex-shrink-0" />
              )}
            </button>
          }
        />

        <Button className="bg-black" color="primary" type="submit">
          Entrar
        </Button>
      </form>
    </section>
  );
}
