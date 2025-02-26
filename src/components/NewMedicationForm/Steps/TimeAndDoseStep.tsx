import React from 'react';
import { Clock } from 'lucide-react';
import { useTheme } from '../../../ThemeContext';
import { StepProps } from '../types';

export function TimeAndDoseStep({ formData, setFormData }: StepProps) {
  const { isDark } = useTheme();

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
          <div className="flex gap-3">
            <input
              type="time"
              value={time.time}
              onChange={(e) => {
                const newTimes = [...formData.times];
                newTimes[index].time = e.target.value;
                setFormData({ ...formData, times: newTimes });
              }}
              className={`flex-1 p-3 rounded-lg border transition-colors duration-150 ${
                isDark ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
              }`}
            />
            <div className="flex-1 flex gap-2 items-center">
              <input
                type="number"
                min="0.25"
                step="0.25"
                value={time.dose}
                onChange={(e) => {
                  const newTimes = [...formData.times];
                  newTimes[index].dose = e.target.value;
                  setFormData({ ...formData, times: newTimes });
                }}
                className={`w-20 p-3 rounded-lg border transition-colors duration-150 ${
                  isDark ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
                }`}
              />
              <span>{formData.form}(s)</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}