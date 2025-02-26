import React from 'react';
import { Calendar } from 'lucide-react';
import { useTheme } from '../../../ThemeContext';
import { StepProps } from '../types';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

export function CycleStep({ formData, setFormData }: StepProps) {
  const { isDark } = useTheme();
  const today = new Date();
  
  const [selectedDate, setSelectedDate] = React.useState(() => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    return date;
  });

  // Générer les options pour les sélecteurs
  const years = React.useMemo(() => {
    const currentYear = today.getFullYear();
    return Array.from({ length: 5 }, (_, i) => currentYear + i);
  }, []);

  const months = React.useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => {
      const date = new Date(2024, i, 1);
      return {
        value: i,
        label: format(date, 'MMMM', { locale: fr })
      };
    });
  }, []);

  const days = React.useMemo(() => {
    const daysInMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0).getDate();
    return Array.from({ length: daysInMonth }, (_, i) => i + 1);
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
    setFormData({
      ...formData,
      startDate: format(newDate, 'yyyy-MM-dd')
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-cyan-500/10">
          <Calendar className="w-6 h-6 text-cyan-500" />
        </div>
        <h3 className="text-lg font-semibold">Quand avez-vous pris votre première pilule?</h3>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-4">
          {/* Sélecteur de jour */}
          <div>
            <label className="block text-sm font-medium mb-2">Jour</label>
            <select
              value={selectedDate.getDate()}
              onChange={(e) => handleDateChange('day', parseInt(e.target.value))}
              className={`w-full p-3 rounded-lg border transition-colors duration-150 ${
                isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
              }`}
            >
              {days.map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </select>
          </div>

          {/* Sélecteur de mois */}
          <div>
            <label className="block text-sm font-medium mb-2">Mois</label>
            <select
              value={selectedDate.getMonth()}
              onChange={(e) => handleDateChange('month', parseInt(e.target.value))}
              className={`w-full p-3 rounded-lg border transition-colors duration-150 ${
                isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
              }`}
            >
              {months.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          {/* Sélecteur d'année */}
          <div>
            <label className="block text-sm font-medium mb-2">Année</label>
            <select
              value={selectedDate.getFullYear()}
              onChange={(e) => handleDateChange('year', parseInt(e.target.value))}
              className={`w-full p-3 rounded-lg border transition-colors duration-150 ${
                isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
              }`}
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          onClick={() => {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            setSelectedDate(today);
            setFormData({
              ...formData,
              startDate: format(today, 'yyyy-MM-dd')
            });
          }}
          className={`w-full p-3 rounded-lg text-center transition-colors duration-150 ${
            isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
          }`}
        >
          Aujourd'hui
        </button>
      </div>
    </div>
  );
}