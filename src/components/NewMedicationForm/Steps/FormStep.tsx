import React from 'react';
import { useTheme } from '../../../ThemeContext';
import { StepProps } from '../types';
import { MEDICATION_FORMS } from '../constants';

export function FormStep({ formData, setFormData }: StepProps) {
  const { isDark } = useTheme();

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-cyan-500/10">
          <div className={`${formData.color} p-2 rounded-md`}>
            {formData.icon}
          </div>
        </div>
        <h3 className="text-lg font-semibold">{formData.name}</h3>
      </div>
      <h4 className="font-medium mb-3">Quelle est la forme du médicament ?</h4>
      <div className="space-y-2">
        {MEDICATION_FORMS.map(form => (
          <button
            key={form}
            onClick={() => setFormData({ ...formData, form })}
            className={`w-full p-3 text-left rounded-lg transition-colors duration-150 ${
              formData.form === form
                ? 'bg-cyan-500 text-white'
                : isDark
                ? 'bg-gray-700 hover:bg-gray-600'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            {form}
          </button>
        ))}
      </div>
    </div>
  );
}