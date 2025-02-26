import React from 'react';
import { Bell } from 'lucide-react';
import { useTheme } from '../../../ThemeContext';
import { StepProps } from '../types';

export function RenewalReminderStep({ formData, setFormData }: StepProps) {
  const { isDark } = useTheme();
  const [reminderCount, setReminderCount] = React.useState(formData.renewalReminderCount?.toString() || '');

  const handleReminderCountChange = (value: string) => {
    // Permettre uniquement les nombres
    if (!/^\d*$/.test(value)) return;
    
    setReminderCount(value);
    if (value) {
      setFormData({
        ...formData,
        renewalReminderCount: parseInt(value, 10)
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-cyan-500/10">
          <Bell className="w-6 h-6 text-cyan-500" />
        </div>
        <h3 className="text-lg font-semibold">Combien de médicaments doivent-ils rester avant de recevoir un rappel de renouvellement ?</h3>
      </div>

      <div className="flex flex-col items-center gap-4">
        <p className="text-sm text-center">Rappelez-moi lorsqu'il me reste</p>

        <input
          type="text"
          inputMode="numeric"
          pattern="\d*"
          value={reminderCount}
          onChange={(e) => handleReminderCountChange(e.target.value)}
          className={`w-32 h-16 text-2xl text-center rounded-lg border transition-colors duration-150 ${
            isDark 
              ? 'bg-gray-700 border-gray-600 text-white focus:border-cyan-500' 
              : 'bg-white border-gray-300 focus:border-cyan-500'
          }`}
          placeholder="0"
        />

        <p className="text-lg text-cyan-500">{formData.form}(s)</p>
      </div>
    </div>
  );
}