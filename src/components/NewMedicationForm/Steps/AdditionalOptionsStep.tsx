import React from 'react';
import { Info, Calendar, Clock, ChevronRight, Pencil, Check } from 'lucide-react';
import { useTheme } from '../../../ThemeContext';
import { StepProps } from '../types';

export function AdditionalOptionsStep({ formData, setFormData }: StepProps) {
  const { isDark } = useTheme();

  const options = [
    {
      icon: Calendar,
      isChecked: ['days', 'endDate', 'ongoing'].includes(formData.treatmentDurationOption || ''),
      label: 'Définir la durée de traitement',
      action: () => setFormData({ ...formData, showTreatmentStartDate: true }),
    },
    {
      icon: Clock,
      isChecked: formData.renewalReminderCount && formData.remainingPills,
      label: 'Programmer un rappel de renouvellement',
      action: () => setFormData({ ...formData, showRemainingPills: true }),
    },
    /*
    {
      icon: Info,
      isChecked: false,
      label: 'Ajouter des instructions',
      action: () => setFormData({ ...formData, showInstructions: true }),
    },
    */
    {
      icon: Pencil,
      isChecked: false,
      label: 'Changer cette icône de médicament',
      action: () => setFormData({ ...formData, showIconPicker: true }),
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-cyan-500/10">
          <Info className="w-6 h-6 text-cyan-500" />
        </div>
        <h3 className="text-lg font-semibold">Options additionnelles</h3>
      </div>
      {options.map(({ icon: Icon, label, action, isChecked }) => (
        <button
          key={label}
          onClick={action}
          className={`w-full p-4 text-left rounded-lg transition-colors duration-150 flex items-center justify-between ${
            isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
          }`}
        >
          <div className="flex items-center gap-3">
            <Icon className="w-5 h-5" />
            <span>{label}</span>
          </div>
          {isChecked ? <Check className="w-5 h-5 text-lime-400" /> : <ChevronRight className="w-5 h-5" />}
        </button>
      ))}
    </div>
  );
}