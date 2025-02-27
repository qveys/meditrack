import { Clock } from 'lucide-react';
import { useTheme } from '@/ThemeContext.tsx';
import { StepProps } from '../types';
import { TIMES_PER_DAY } from '../constants';

export function TimesPerDayStep({ formData, setFormData }: StepProps) {
  const { isDark } = useTheme();

  // Initialiser les prises en fonction de l'option sélectionnée
  const initializeTimes = (option: string) => {
    let times: any[];
    switch (option) {
      case 'Deux fois par jour':
        times = [
          { time: '08:00', dose: '1' },
          { time: '20:00', dose: '1' }
        ];
        break;
      case '3 fois par jour':
        times = [
          { time: '08:00', dose: '1' },
          { time: '14:00', dose: '1' },
          { time: '20:00', dose: '1' }
        ];
        break;
      default:
        times = [{ time: '08:00', dose: '1' }];
    }
    return times;
  };

  const handleOptionSelect = (option: string) => {
    const times = initializeTimes(option);
    setFormData({ ...formData, timesPerDay: option, times });
  };

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
            onClick={() => handleOptionSelect(times)}
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