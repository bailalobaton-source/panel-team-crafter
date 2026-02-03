// utils/dateRanges.ts
import { startOfWeek, endOfWeek, startOfMonth, endOfMonth } from "date-fns";

export const getWeekRange = (date: Date) => ({
  from: startOfWeek(date, { weekStartsOn: 1 }),
  to: endOfWeek(date, { weekStartsOn: 1 }),
});

export const getMonthRange = (year: number, month: number) => ({
  from: startOfMonth(new Date(year, month)),
  to: endOfMonth(new Date(year, month)),
});
