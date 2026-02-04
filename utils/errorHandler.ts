// src/utils/errorHandler.ts
import axios from "axios";
import { toast } from "sonner";
import { removeToken } from "./authUtils";

export const handleAxiosError = (err: unknown) => {
  if (axios.isAxiosError(err)) {
    const status = err.response?.status;
    const message = err.response?.data?.message || "Error inesperado";

    if (status === 401) {
      removeToken();
      // Si es un 401, limpiar token y redirigir
      toast.error("Tu sesión ha expirado, inicia sesión nuevamente");
      window.location.reload();
    } else {
      toast.error(message);
    }

    return message;
  } else {
    toast.error("Ocurrió un error inesperado");
    return "Ocurrió un error inesperado";
  }
};
