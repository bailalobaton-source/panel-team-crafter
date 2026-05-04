export const formatCreatedAtDate = (createdAt: string): string => {
  const createdAtDate = new Date(createdAt);
  const day = String(createdAtDate.getDate()).padStart(2, "0"); // Asegura dos dígitos para el día
  const month = String(createdAtDate.getMonth() + 1).padStart(2, "0"); // Asegura dos dígitos para el mes
  const year = createdAtDate.getFullYear();

  return `${day}/${month}/${year}`;
};

export const formatDate = (dateInput: string) => {
  if (!dateInput) return;

  const separator = dateInput.includes("-") ? "-" : "/";
  const [year, month, day] = dateInput.split(separator).map(Number);

  const date = new Date(year, month - 1, day);

  if (isNaN(date.getTime())) {
    return "Fecha inválida";
  }

  const formattedDay = String(date.getDate()).padStart(2, "0");
  const formattedMonth = String(date.getMonth() + 1).padStart(2, "0");
  const formattedYear = date.getFullYear();

  return `${formattedDay}/${formattedMonth}/${formattedYear}`;
};

export const formatDateForInput = (date: Date = new Date()): string => {
  return date.toISOString().split("T")[0];
};

export const formatDateTimeFull = (isoString: string) => {
  if (!isoString) return "";

  const date = new Date(isoString);

  if (isNaN(date.getTime())) return "Fecha inválida";

  // Configuramos el formateador para español
  const formatter = new Intl.DateTimeFormat("es-ES", {
    day: "2-digit",
    month: "short", // "long" para nombre completo, "short" para abreviado
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true, // Habilita el formato AM/PM
  });

  // El resultado será algo como: "28 de febrero de 2026, 5:00 p. m."
  return formatter.format(date);
};
