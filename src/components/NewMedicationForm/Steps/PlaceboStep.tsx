import React from 'react';
import { Pill } from 'lucide-react';
import { useTheme } from '../../../ThemeContext';
import { StepProps } from '../types';

export function PlaceboStep({ formData, setFormData }: StepProps) {
  const { isDark } = useTheme();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-cyan-500/10">
          <Pill className="w-6 h-6 text-cyan-500" />
        </div>
        <h3 className="text-lg font-semibold">Prenez-vous un Placebo pendant la période de pause ?</h3>
      </div>

      <div className="space-y-2">
        <button
          onClick={() => setFormData({ ...formData, usePlacebo: true })}
          className={`w-full p-4 text-left rounded-lg transition-colors duration-150 ${
            formData.usePlacebo === true
              ? 'bg-cyan-500 text-white'
              : isDark
              ? 'bg-gray-700 hover:bg-gray-600'
              : 'bg-gray-100 hover:bg-gray-200'
          }`}
        >
          Oui
        </button>

        <button
          onClick={() => setFormData({ ...formData, usePlacebo: false })}
          className={`w-full p-4 text-left rounded-lg transition-colors duration-150 ${
            formData.usePlacebo === false
              ? 'bg-cyan-500 text-white'
              : isDark
              ? 'bg-gray-700 hover:bg-gray-600'
              : 'bg-gray-100 hover:bg-gray-200'
          }`}
        >
          Non
        </button>
      </div>
    </div>
  );
}