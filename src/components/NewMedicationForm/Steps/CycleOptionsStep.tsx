import { Calendar } from 'lucide-react';
import { useTheme } from '@/ThemeContext.tsx';
import { StepProps } from '../types';

const CYCLE_OPTIONS = [
  { treatment: 21, pause: 7 },
  { treatment: 24, pause: 4 },
  { treatment: 28, pause: 0 },
  { treatment: 3, pause: 1 },
  { treatment: 84, pause: 7 },
  { treatment: 14, pause: 14 },
  { treatment: 63, pause: 7 },
  { treatment: 26, pause: 2 },
];

export function CycleOptionsStep({ formData, setFormData }: StepProps) {
  const { isDark } = useTheme();

  const handleCycleSelect = (treatment: number, pause: number) => {
    setFormData({
      ...formData,
      cycleLength: treatment,
      cycleFrequency: pause,
      times: [{ time: '08:00', dose: '1' }]
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-cyan-500/10">
          <Calendar className="w-6 h-6 text-cyan-500" />
        </div>
        <h3 className="text-lg font-semibold">Régler les jours du cycle</h3>
      </div>

      <div className="space-y-2">
        {CYCLE_OPTIONS.map(({ treatment, pause }, index) => (
          <button
            key={index}
            onClick={() => handleCycleSelect(treatment, pause)}
            className={`w-full p-4 text-left rounded-lg transition-colors duration-150 ${
              formData.cycleLength === treatment && formData.cycleFrequency === pause
                ? 'bg-cyan-500 text-white'
                : isDark
                ? 'bg-gray-700 hover:bg-gray-600'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            {treatment}+{pause}
          </button>
        ))}

        <button
          onClick={() => handleCycleSelect(formData.cycleLength, formData.cycleFrequency)}
          className={`w-full p-4 text-left rounded-lg transition-colors duration-150 ${
            isDark
              ? 'bg-gray-700 hover:bg-gray-600'
              : 'bg-gray-100 hover:bg-gray-200'
          }`}
        >
          Régler le cycle
        </button>
      </div>
    </div>
  );
}