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
import { motion } from "framer-motion";

type LoginFormInputs = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const onSubmit = async (data: LoginFormInputs) => {
    setIsLoading(true);
    try {
      await login(data.email, data.password);
      toast.success("Bienvenido de nuevo");
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
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // Fondo con gradiente dinámico de la marca
    <section className="relative flex items-center justify-center min-h-screen bg-[#f8fafc] overflow-hidden">
      {/* Elementos decorativos de fondo */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-cyan-100/50 blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-pink-100/50 blur-[120px]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="z-10 w-full max-w-[420px] px-4"
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white/80 backdrop-blur-xl p-8 flex flex-col items-center gap-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white rounded-[2.5rem]"
        >
          {/* Logo con brillo sutil */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-pink-400 blur-2xl opacity-20 group-hover:opacity-40 transition-opacity" />
            <Image
              className="relative w-[160px] drop-shadow-sm"
              src="/img/logo.png"
              alt="Team Crafter Web Logo"
              height={100}
              width={200}
              priority
            />
          </div>

          <div className="text-center space-y-1">
            <h2 className="text-2xl font-black text-slate-800 tracking-tight">
              ¡Hola de nuevo!
            </h2>
            <p className="text-slate-500 text-sm font-medium">
              Ingresa tus credenciales para acceder
            </p>
          </div>

          <div className="w-full space-y-4">
            <Input
              label="Correo electrónico"
              classNames={{
                ...inputClassNames,
                inputWrapper:
                  "bg-slate-50 border-slate-200 hover:border-cyan-400 focus-within:!border-cyan-500 transition-colors shadow-none",
                label: "text-slate-600 font-bold",
              }}
              labelPlacement="outside"
              variant="bordered"
              type="email"
              placeholder="nombre@ejemplo.com"
              {...register("email", {
                required: "El email es obligatorio",
              })}
              isInvalid={!!errors.email}
              errorMessage={errors.email?.message}
              radius="lg"
              size="lg"
            />

            <Input
              label="Contraseña"
              classNames={{
                ...inputClassNames,
                inputWrapper:
                  "bg-slate-50 border-slate-200 hover:border-pink-400 focus-within:!border-pink-500 transition-colors shadow-none",
                label: "text-slate-600 font-bold",
              }}
              labelPlacement="outside"
              variant="bordered"
              placeholder="••••••••"
              {...register("password", {
                required: "La contraseña es obligatoria",
              })}
              isInvalid={!!errors.password}
              errorMessage={errors.password?.message}
              radius="lg"
              size="lg"
              type={showPassword ? "text" : "password"}
              endContent={
                <button
                  className="focus:outline-none p-2"
                  type="button"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <FaEyeSlash className="text-xl text-slate-400 hover:text-pink-500 transition-colors" />
                  ) : (
                    <FaEye className="text-xl text-slate-400 hover:text-cyan-500 transition-colors" />
                  )}
                </button>
              }
            />
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="w-full p-3 bg-rose-50 border border-rose-100 rounded-xl"
            >
              <p className="text-xs text-rose-600 font-bold text-center">
                {error}
              </p>
            </motion.div>
          )}

          <Button
            isLoading={isLoading}
            className="w-full h-14 bg-gradient-to-r from-[#48D1CC] to-[#FF69B4] text-white font-bold text-lg shadow-lg shadow-pink-200/50 hover:scale-[1.02] active:scale-[0.98] transition-all rounded-2xl border-0"
            type="submit"
          >
            Entrar al Panel
          </Button>

          <p className="text-xs text-slate-400 font-medium pt-2">
            Team Crafter Web &copy; 2026
          </p>
        </form>
      </motion.div>
    </section>
  );
}
