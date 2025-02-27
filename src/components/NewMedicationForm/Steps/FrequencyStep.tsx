import { Calendar } from 'lucide-react';
import { useTheme } from '@/ThemeContext.tsx';
import { StepProps } from '../types';
import { FREQUENCIES } from '../constants';

export function FrequencyStep({ formData, setFormData }: StepProps) {
  const { isDark } = useTheme();

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-cyan-500/10">
          <Calendar className="w-6 h-6 text-cyan-500" />
        </div>
        <h3 className="text-lg font-semibold">Fréquence de prise</h3>
      </div>
      <div className="space-y-2">
        {FREQUENCIES.map(freq => (
          <button
            key={freq}
            onClick={() => {
              // Reset related fields when changing frequency
              const updates = { frequency: freq } as Partial<typeof formData>;
              if (formData.frequency === 'Chaque jour' && freq !== 'Chaque jour') {
                updates.timesPerDay = '';
              } else if (formData.frequency === 'Certains jours de la semaine' && freq !== 'Certains jours de la semaine') {
                updates.selectedDays = [];
              }
              setFormData({ ...formData, ...updates });
            }}
            className={`w-full p-3 text-left rounded-lg transition-colors duration-150 ${
              formData.frequency === freq
                ? 'bg-cyan-500 text-white'
                : isDark
                ? 'bg-gray-700 hover:bg-gray-600'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            {freq}
          </button>
        ))}
      </div>
    </div>
  );
}