import React from 'react';
import { Clock } from 'lucide-react';
import { useTheme } from '@/ThemeContext.tsx';
import { StepProps } from '../types';

export function TimeAndDoseStep({ formData, setFormData }: StepProps) {
  const { isDark } = useTheme();

  // Initialiser les prises en fonction de l'option sélectionnée
  React.useEffect(() => {
    const numberOfTimes = getNumberOfTimes();
    if (formData.times.length !== numberOfTimes) {
      // Créer un nouveau tableau avec le bon nombre de prises
      const newTimes = Array.from({ length: numberOfTimes }, (_, index) => {
        // Garder les valeurs existantes si disponibles
        return formData.times[index] || {
          time: index === 0 ? '08:00' : index === 1 ? '14:00' : '20:00',
          dose: '1'
        };
      });
      setFormData({ ...formData, times: newTimes });
    }
  }, [formData.timesPerDay]);

  // Déterminer le nombre de prises en fonction de l'option sélectionnée
  const getNumberOfTimes = () => {
    switch (formData.timesPerDay) {
      case 'Une fois par jour':
        return 1;
      case 'Deux fois par jour':
        return 2;
      case '3 fois par jour':
        return 3;
      case 'Plus de 3 fois par jour':
        return formData.customTimes || 4;
      case 'Toutes les x heures':
        return Math.ceil((23 - 8) / formData.interval);
      default:
        return formData.times.length;
    }
  };

  const handleTimeChange = (index: number, value: string) => {
    const newTimes = [...formData.times];
    if (!newTimes[index]) {
      newTimes[index] = { time: '', dose: '1' };
    }
    newTimes[index].time = value;
    setFormData({ ...formData, times: newTimes });
  };

  const handleDoseChange = (index: number, value: string) => {
    const newTimes = [...formData.times];
    if (!newTimes[index]) {
      newTimes[index] = { time: '08:00', dose: '' };
    }
    newTimes[index].dose = value;
    setFormData({ ...formData, times: newTimes });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-cyan-500/10">
          <Clock className="w-6 h-6 text-cyan-500" />
        </div>
        <h3 className="text-lg font-semibold">Définir l'heure et la dose</h3>
      </div>

      {formData.times.map((time, index) => (
        <div key={index} className="space-y-3">
          <div className="flex items-center gap-2 mb-2">
            <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              {`Prise ${index + 1}`} 
            </span>
          </div>
          <div className="flex gap-3">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">Heure</label>
              <input
                type="time"
                value={time.time}
                onChange={(e) => handleTimeChange(index, e.target.value)}
                className={`w-full p-3 rounded-lg border transition-colors duration-150 ${
                  isDark ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
                }`}
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">Dose</label>
              <div className="flex gap-2 items-center">
                <input
                  type="number"
                  min="0.25"
                  step="0.25"
                  value={time.dose}
                  onChange={(e) => handleDoseChange(index, e.target.value)}
                  className={`w-20 p-3 rounded-lg border transition-colors duration-150 ${
                    isDark ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
                  }`}
                />
                <span>{formData.form}(s)</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}