import React from 'react';
import { Calendar } from 'lucide-react';
import { useTheme } from '../../../ThemeContext';
import { StepProps } from '../types';

export function WeeklyIntervalStep({ formData, setFormData }: StepProps) {
  const { isDark } = useTheme();
  const [weekInterval, setWeekInterval] = React.useState(formData.weekInterval || 2);

  const handleIntervalChange = (value: number) => {
    setWeekInterval(value);
    setFormData({ ...formData, weekInterval: value });
  };

  const intervals = [1, 2, 3, 4, 5];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-cyan-500/10">
          <Calendar className="w-6 h-6 text-cyan-500" />
        </div>
        <h3 className="text-lg font-semibold">Configurer les intervalles de semaines</h3>
      </div>

      <div className="flex flex-col items-center">
        <p className="text-lg mb-6 text-cyan-500">Tous / toutes les</p>
        
        <div className="flex gap-4 mb-6">
          {intervals.map((value) => (
            <button
              key={value}
              onClick={() => handleIntervalChange(value)}
              className={`w-16 h-16 rounded-lg text-2xl font-semibold transition-all duration-150 ${
                weekInterval === value
                  ? 'bg-cyan-500 text-white scale-110 shadow-lg'
                  : isDark
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {value}
            </button>
          ))}
        </div>

        <p className="text-lg text-cyan-500">semaines</p>

        <div className={`mt-8 p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
          <p className="text-sm">
            Vous prendrez ce médicament toutes les <strong>{weekInterval} semaine{weekInterval > 1 ? 's' : ''}</strong>.
          </p>
        </div>
      </div>
    </div>
  );
}