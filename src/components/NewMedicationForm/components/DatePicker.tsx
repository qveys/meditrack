import React from 'react';
import { useTheme } from '@/ThemeContext.tsx';
import { generateYearOptions, generateMonthOptions, generateDayOptions } from '../utils/dateUtils';

interface DatePickerProps {
  selectedDate: Date;
  onChange: (type: 'day' | 'month' | 'year', value: number) => void;
  yearCount?: number;
}

export function DatePicker({ selectedDate, onChange, yearCount = 5 }: DatePickerProps) {
  const { isDark } = useTheme();
  const today = new Date();

  const years = React.useMemo(() => 
    generateYearOptions(today.getFullYear(), yearCount), [today, yearCount]);

  const months = React.useMemo(() => 
    generateMonthOptions(), []);

  const days = React.useMemo(() => 
    generateDayOptions(selectedDate.getFullYear(), selectedDate.getMonth()), 
    [selectedDate]);

  return (
    <div className="grid grid-cols-3 gap-4">
      <div>
        <label className="block text-sm font-medium mb-2">Jour</label>
        <select
          value={selectedDate.getDate()}
          onChange={(e) => onChange('day', parseInt(e.target.value))}
          className={`w-full p-3 rounded-lg border transition-colors duration-150 ${
            isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
          }`}
        >
          {days.map((day) => (
            <option key={day} value={day}>{day}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Mois</label>
        <select
          value={selectedDate.getMonth()}
          onChange={(e) => onChange('month', parseInt(e.target.value))}
          className={`w-full p-3 rounded-lg border transition-colors duration-150 ${
            isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
          }`}
        >
          {months.map(({ value, label }) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Année</label>
        <select
          value={selectedDate.getFullYear()}
          onChange={(e) => onChange('year', parseInt(e.target.value))}
          className={`w-full p-3 rounded-lg border transition-colors duration-150 ${
            isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
          }`}
        >
          {years.map((year) => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>
    </div>
  );
}