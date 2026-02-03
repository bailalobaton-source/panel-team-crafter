import {
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear,
} from "date-fns";

export const normalizeWeek = (date: Date) => ({
  from: startOfWeek(date, { weekStartsOn: 1 }),
  to: endOfWeek(date, { weekStartsOn: 1 }),
});

export const normalizeMonth = (date: Date) => ({
  from: startOfMonth(date),
  to: endOfMonth(date),
});

export const normalizeYear = (date: Date) => ({
  from: startOfYear(date),
  to: endOfYear(date),
});
