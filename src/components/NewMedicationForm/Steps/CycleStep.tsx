import React from 'react';
import { Calendar } from 'lucide-react';
import { useTheme } from '../../../ThemeContext';
import { StepProps } from '../types';

export function CycleStep({ formData, setFormData }: StepProps) {
  const { isDark } = useTheme();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-cyan-500/10">
          <Calendar className="w-6 h-6 text-cyan-500" />
        </div>
        <h3 className="text-lg font-semibold">Définir le cycle</h3>
      </div>
      
      <div className="space-y-2">
        <label className="block text-sm font-medium mb-1">
          Durée de prise (jours)
        </label>
        <input
          type="number"
          min="1"
          value={formData.cycleLength}
          onChange={(e) => setFormData({ ...formData, cycleLength: parseInt(e.target.value) })}
          className={`w-full p-3 rounded-lg border transition-colors duration-150 ${
            isDark ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
          }`}
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium mb-1">
          Durée de pause (jours)
        </label>
        <input
          type="number"
          min="1"
          value={formData.cycleFrequency}
          onChange={(e) => setFormData({ ...formData, cycleFrequency: parseInt(e.target.value) })}
          className={`w-full p-3 rounded-lg border transition-colors duration-150 ${
            isDark ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
          }`}
        />
      </div>

      <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
        <p className="text-sm">
          Vous prendrez ce médicament pendant <strong>{formData.cycleLength} jours</strong>,
          suivi d'une pause de <strong>{formData.cycleFrequency} jours</strong>.
        </p>
        <p className="text-sm mt-2">
          Le cycle complet dure <strong>{formData.cycleLength + formData.cycleFrequency} jours</strong>.
        </p>
      </div>
    </div>
  );
}