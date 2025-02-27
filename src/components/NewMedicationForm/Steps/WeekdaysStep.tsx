import { Calendar } from 'lucide-react';
import { useTheme } from '@/ThemeContext.tsx';
import { StepProps } from '../types';
import { WEEKDAYS } from '../constants';

export function WeekdaysStep({ formData, setFormData }: StepProps) {
  const { isDark } = useTheme();

  const toggleWeekday = (day: string) => {
    const selectedDays = formData.selectedDays.includes(day)
      ? formData.selectedDays.filter((d: string) => d !== day)
      : [...formData.selectedDays, day];
    setFormData({ ...formData, selectedDays });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-cyan-500/10">
          <Calendar className="w-6 h-6 text-cyan-500" />
        </div>
        <h3 className="text-lg font-semibold">Quel(s) jour(s) souhaitez-vous recevoir un rappel ?</h3>
      </div>
      <div className="space-y-2">
        {WEEKDAYS.map(day => (
          <button
            key={day}
            onClick={() => toggleWeekday(day)}
            className={`w-full p-3 text-left rounded-lg transition-colors duration-150 ${
              formData.selectedDays.includes(day)
                ? 'bg-cyan-500 text-white'
                : isDark
                ? 'bg-gray-700 hover:bg-gray-600'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            {day}
          </button>
        ))}
      </div>
    </div>
  );
}