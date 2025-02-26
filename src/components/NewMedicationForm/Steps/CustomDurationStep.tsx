import React from 'react';
import { Calendar } from 'lucide-react';
import { useTheme } from '../../../ThemeContext';
import { StepProps } from '../types';

export function CustomDurationStep({ formData, setFormData }: StepProps) {
  const { isDark } = useTheme();
  const [duration, setDuration] = React.useState(formData.treatmentDuration?.toString() || '');

  const handleDurationChange = (value: string) => {
    // Permettre uniquement les nombres
    if (!/^\d*$/.test(value)) return;
    
    setDuration(value);
    if (value) {
      setFormData({
        ...formData,
        treatmentDuration: parseInt(value, 10),
        treatmentDurationOption: 'days'
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-cyan-500/10">
          <Calendar className="w-6 h-6 text-cyan-500" />
        </div>
        <h3 className="text-lg font-semibold">Quelle est la durée de ce traitement ?</h3>
      </div>

      <div className="space-y-4">
        <p className="text-sm text-center">Définir le nombre de jours (à compter de la date de début)</p>

        <div className="flex flex-col items-center gap-4">
          <input
            type="text"
            inputMode="numeric"
            pattern="\d*"
            value={duration}
            onChange={(e) => handleDurationChange(e.target.value)}
            className={`w-32 h-16 text-2xl text-center rounded-lg border transition-colors duration-150 ${
              isDark 
                ? 'bg-gray-700 border-gray-600 text-white focus:border-cyan-500' 
                : 'bg-white border-gray-300 focus:border-cyan-500'
            }`}
            placeholder="0"
          />

          <p className="text-lg text-cyan-500">jours de traitement</p>
        </div>
      </div>
    </div>
  );
}