import { FormEvent } from "react";
export const useNumericInput = (e: React.ChangeEvent<HTMLInputElement>) => {
  e.target.value = e.target.value.replace(/[^0-9]/g, "");
};

// utils/handleDecimalInput.ts

export const handleDecimalInput = (
  e: FormEvent<HTMLInputElement>,
  maxDecimals: number = 2
): void => {
  const input = e.currentTarget;
  const value = input.value.replace(",", "."); // opcional

  const regex = new RegExp(`^\\d*\\.?\\d{0,${maxDecimals}}$`);

  if (!regex.test(value)) {
    input.value = value.slice(0, -1);
  }
};
