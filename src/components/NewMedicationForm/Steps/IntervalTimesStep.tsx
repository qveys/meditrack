import React from 'react';
import { Clock } from 'lucide-react';
import { useTheme } from '../../../ThemeContext';
import { StepProps } from '../types';

export function IntervalTimesStep({ formData, setFormData }: StepProps) {
  const { isDark } = useTheme();
  const [selectedInterval, setSelectedInterval] = React.useState(formData.interval || 1);

  const intervals = [1, 2, 3, 4, 6, 8, 12];

  const handleIntervalSelect = (interval: number) => {
    setSelectedInterval(interval);
    
    // Calculer les heures de prise en fonction de l'intervalle
    const startHour = 8; // Commencer à 8h
    const numberOfDoses = Math.ceil((24 - 8) / interval);
    
    const newTimes = Array.from({ length: numberOfDoses }, (_, index) => {
      const hour = (startHour + (index * interval)) % 24;
      const formattedHour = hour.toString().padStart(2, '0');
      return {
        time: `${formattedHour}:00`,
        dose: '1'
      };
    });

    setFormData({ ...formData, times: newTimes, interval: interval });
  };

  // Initialiser avec l'intervalle de 4 heures par défaut si aucun temps n'est défini
  React.useEffect(() => {
    if (formData.times.length === 0) {
      handleIntervalSelect(4);
    } else {
      // Si on revient en arrière, calculer l'intervalle à partir des temps existants
      const times = formData.times.map(t => parseInt(t.time.split(':')[0]));
      if (times.length > 1) {
        const interval = times[1] - times[0];
        setSelectedInterval(interval);
      }
    }
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-cyan-500/10">
          <Clock className="w-6 h-6 text-cyan-500" />
        </div>
        <h3 className="text-lg font-semibold">Configurer les intervalles d'heures</h3>
      </div>

      <div className="flex flex-col items-center">
        <p className="text-lg mb-6 text-cyan-500">Tous / toutes les</p>
        
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          {intervals.map((interval) => (
            <button
              key={interval}
              onClick={() => handleIntervalSelect(interval)}
              className={`w-16 h-16 rounded-lg text-2xl font-semibold transition-all duration-150 ${
                selectedInterval === interval
                  ? 'bg-cyan-500 text-white scale-110 shadow-lg'
                  : isDark
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {interval}
            </button>
          ))}
        </div>

        <p className="text-lg text-cyan-500">heures</p>
      </div>
    </div>
  );
}