import { useTheme } from "@/ThemeContext.tsx";
import React from "react";
import { format } from "date-fns";
import { fr } from 'date-fns/locale';
import { DatePickerProps, DateSelectorProps } from "./DatePickerTypes";

const commonSelectStyles = `w-full p-3 rounded-lg border transition-colors duration-150`;
const getDarkModeClasses = (isDark: boolean) =>
 isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300';

const DateSelector = ({label, value, options, onChange, isDark}: DateSelectorProps) => (
 <div>
   <label className="block text-sm font-medium mb-2">{label}</label>
   <select value={value}
           onChange={(e) => onChange(parseInt(e.target.value))}
           className={`${commonSelectStyles} ${getDarkModeClasses(isDark)}`}>
     {options.map((option) => (
         <option key={option.value} value={option.value}>
           {option.label}
         </option>
     ))}
   </select>
 </div>
);

export function DatePicker({onDateChange}: DatePickerProps) {
  const {isDark} = useTheme();
  const today = new Date();

  const [selectedDate, setSelectedDate] = React.useState(() => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    return date;
  });

  // Générer les options pour les sélecteurs
  const years = React.useMemo(() => {
    const currentYear = today.getFullYear();
    return Array.from({length: 5}, (_, i) => currentYear + i);
  }, []);

  const months = React.useMemo(() => {
    return Array.from({length: 12}, (_, i) => {
      const date = new Date(2024, i, 1);
      return {
        value: i,
        label: format(date, 'MMMM', {locale: fr})
      };
    });
  }, []);

  const days = React.useMemo(() => {
    const daysInMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0).getDate();
    return Array.from({length: daysInMonth}, (_, i) => i + 1);
  }, [selectedDate.getFullYear(), selectedDate.getMonth()]);

  const handleDateChange = (type: 'day' | 'month' | 'year', value: number) => {
    const newDate = new Date(selectedDate);

    switch (type) {
      case 'day':
        newDate.setDate(value);
        break;
      case 'month':
        newDate.setMonth(value);
        // Ajuster le jour si nécessaire (ex: 31 mars -> 30 avril)
        const daysInNewMonth = new Date(newDate.getFullYear(), value + 1, 0).getDate();
        if (newDate.getDate() > daysInNewMonth) {
          newDate.setDate(daysInNewMonth);
        }
        break;
      case 'year':
        newDate.setFullYear(value);
        break;
    }

    setSelectedDate(newDate);
    onDateChange(newDate);
  };

  return (
   <div className="space-y-4">
     <div className="grid grid-cols-3 gap-4">
       <DateSelector
        label="Jour"
        value={selectedDate.getDate()}
        options={days.map(day => ({value: day, label: day}))}
        onChange={(value) => handleDateChange('day', value)}
        isDark={isDark}
       />
       <DateSelector
        label="Mois"
        value={selectedDate.getMonth()}
        options={months}
        onChange={(value) => handleDateChange('month', value)}
        isDark={isDark}
       />
       <DateSelector
        label="Année"
        value={selectedDate.getFullYear()}
        options={years.map(year => ({value: year, label: year}))}
        onChange={(value) => handleDateChange('year', value)}
        isDark={isDark}
       />
     </div>
     <button
      onClick={() => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        setSelectedDate(today);
        onDateChange(today);
      }}
      className={`${commonSelectStyles} ${
       isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
      }`}
     >
       Aujourd'hui
     </button>
   </div>
  );
}