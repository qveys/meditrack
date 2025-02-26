import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

export const formatDateToISO = (date: Date): string => {
  return format(date, 'yyyy-MM-dd');
};

export const getMonthName = (date: Date): string => {
  return format(date, 'MMMM', { locale: fr });
};

export const getDaysInMonth = (year: number, month: number): number => {
  return new Date(year, month + 1, 0).getDate();
};

export const getDaysBetweenDates = (start: Date, end: Date): number => {
  const startTime = start.setHours(0, 0, 0, 0);
  const endTime = end.setHours(0, 0, 0, 0);
  return Math.ceil((endTime - startTime) / (1000 * 60 * 60 * 24));
};

export const generateYearOptions = (startYear: number, count: number): number[] => {
  return Array.from({ length: count }, (_, i) => startYear + i);
};

export const generateMonthOptions = () => {
  return Array.from({ length: 12 }, (_, i) => ({
    value: i,
    label: format(new Date(2024, i, 1), 'MMMM', { locale: fr })
  }));
};

export const generateDayOptions = (year: number, month: number): number[] => {
  const daysInMonth = getDaysInMonth(year, month);
  return Array.from({ length: daysInMonth }, (_, i) => i + 1);
};