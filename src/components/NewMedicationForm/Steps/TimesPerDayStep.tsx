import React from 'react';
import { Clock } from 'lucide-react';
import { useTheme } from '../../../ThemeContext';
import { StepProps } from '../types';
import { TIMES_PER_DAY } from '../constants';

export function TimesPerDayStep({ formData, setFormData }: StepProps) {
  const { isDark } = useTheme();

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-cyan-500/10">
          <Clock className="w-6 h-6 text-cyan-500" />
        </div>
        <h3 className="text-lg font-semibold">Nombre de prises par jour</h3>
      </div>
      <div className="space-y-2">
        {TIMES_PER_DAY.map(times => (
          <button
            key={times}
            onClick={() => setFormData({ ...formData, timesPerDay: times })}
            className={`w-full p-3 text-left rounded-lg transition-colors duration-150 ${
              formData.timesPerDay === times
                ? 'bg-cyan-500 text-white'
                : isDark
                ? 'bg-gray-700 hover:bg-gray-600'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            {times}
          </button>
        ))}
      </div>
    </div>
  );
}