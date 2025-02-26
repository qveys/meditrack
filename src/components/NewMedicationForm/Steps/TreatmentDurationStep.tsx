import React from 'react';
import { Calendar } from 'lucide-react';
import { useTheme } from '../../../ThemeContext';
import { StepProps } from '../types';

const DURATION_OPTIONS = [
  { value: 5, label: '5 jours de traitement' },
  { value: 7, label: '7 jours de traitement' },
  { value: 10, label: '10 jours de traitement' },
  { value: 30, label: '30 jours de traitement' },
];

export function TreatmentDurationStep({ formData, setFormData }: StepProps) {
  const { isDark } = useTheme();

  const handleOptionSelect = (option: 'days' | 'endDate' | 'ongoing', duration?: number) => {
    setFormData({ 
      ...formData,
      treatmentDurationOption: option, 
      treatmentDuration: duration,
      mustShowCustomDuration: option === 'days' && !duration
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-cyan-500/10">
          <Calendar className="w-6 h-6 text-cyan-500" />
        </div>
        <h3 className="text-lg font-semibold">Quelle est la durée de ce traitement ?</h3>
      </div>

      <div className="space-y-2">
        {DURATION_OPTIONS.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => handleOptionSelect('days', value)}
            className={`w-full p-4 text-left rounded-lg transition-colors duration-150 ${
              formData.treatmentDurationOption === 'days' && formData.treatmentDuration === value
                ? 'bg-cyan-500 text-white'
                : isDark
                ? 'bg-gray-700 hover:bg-gray-600'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            {label}
          </button>
        ))}

        <button
          onClick={() => handleOptionSelect('days')}
          className={`w-full p-4 text-left rounded-lg transition-colors duration-150 ${
            formData.treatmentDurationOption === 'days' && !DURATION_OPTIONS.find(opt => opt.value === formData.treatmentDuration)
              ? 'bg-cyan-500 text-white'
              : isDark
              ? 'bg-gray-700 hover:bg-gray-600'
              : 'bg-gray-100 hover:bg-gray-200'
          }`}
        >
          Définir le nombre de jours
        </button>

        <button
          onClick={() => handleOptionSelect('endDate')}
          className={`w-full p-4 text-left rounded-lg transition-colors duration-150 ${
            formData.treatmentDurationOption === 'endDate'
              ? 'bg-cyan-500 text-white'
              : isDark
              ? 'bg-gray-700 hover:bg-gray-600'
              : 'bg-gray-100 hover:bg-gray-200'
          }`}
        >
          Définir la date de fin
        </button>

        <button
          onClick={() => handleOptionSelect('ongoing')}
          className={`w-full p-4 text-left rounded-lg transition-colors duration-150 ${
            formData.treatmentDurationOption === 'ongoing'
              ? 'bg-cyan-500 text-white'
              : isDark
              ? 'bg-gray-700 hover:bg-gray-600'
              : 'bg-gray-100 hover:bg-gray-200'
          }`}
        >
          Traitement en cours
        </button>
      </div>
    </div>
  );
}