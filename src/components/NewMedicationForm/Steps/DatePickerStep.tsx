import React from 'react';
import { Calendar } from 'lucide-react';
import { useTheme } from '../../../ThemeContext';
import { StepProps } from '../types';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

export function DatePickerStep({ formData, setFormData }: StepProps) {
  const { isDark } = useTheme();
  const [selectedDate, setSelectedDate] = React.useState(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today;
  });

  const months = Array.from({ length: 12 }, (_, i) => {
    const date = new Date();
    date.setMonth(date.getMonth() + i);
    return {
      number: date.getDate(),
      name: format(date, 'MMMM', { locale: fr }),
      year: format(date, 'yyyy'),
    };
  });

  const handleDateSelect = (month: string, year: string) => {
    const newDate = new Date(`${month} 1, ${year}`);
    setSelectedDate(newDate);
    setFormData({ ...formData, startDate: newDate.toISOString() });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-cyan-500/10">
          <Calendar className="w-6 h-6 text-cyan-500" />
        </div>
        <h3 className="text-lg font-semibold">Quand devez-vous prendre la prochaine dose ?</h3>
      </div>

      <div className="relative">
        <div className={`rounded-lg overflow-hidden ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
          <div className="h-64 overflow-y-auto snap-y snap-mandatory">
            {months.map((month, index) => (
              <button
                key={`${month.name}-${month.year}`}
                onClick={() => handleDateSelect(month.name, month.year)}
                className={`w-full p-4 flex justify-between items-center snap-start transition-colors duration-150 ${
                  format(selectedDate, 'MMMM yyyy', { locale: fr }) === `${month.name} ${month.year}`
                    ? isDark
                      ? 'bg-gray-700'
                      : 'bg-white'
                    : 'hover:bg-opacity-50'
                }`}
              >
                <span className="text-2xl font-light">{month.name}</span>
                <span className="text-2xl font-light">{month.year}</span>
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={() => {
            const today = new Date();
            setSelectedDate(today);
            setFormData({ ...formData, startDate: today.toISOString() });
          }}
          className={`mt-4 w-full p-3 rounded-lg text-center transition-colors duration-150 ${
            isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
          }`}
        >
          Aujourd'hui
        </button>
      </div>
    </div>
  );
}