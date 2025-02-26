import React from 'react';
import { Pill } from 'lucide-react';
import { useTheme } from '../../../ThemeContext';
import { StepProps } from '../types';

export function RemainingPillsStep({ formData, setFormData }: StepProps) {
  const { isDark } = useTheme();
  const [pillCount, setPillCount] = React.useState(formData.remainingPills?.toString() || '');

  const handlePillCountChange = (value: string) => {
    // Permettre uniquement les nombres
    if (!/^\d*$/.test(value)) return;
    
    setPillCount(value);
    if (value) {
      setFormData({
        ...formData,
        remainingPills: parseInt(value, 10)
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-cyan-500/10">
          <Pill className="w-6 h-6 text-cyan-500" />
        </div>
        <h3 className="text-lg font-semibold">Combien de {formData.form}(s) vous reste-t-il ?</h3>
      </div>

      <div className="flex flex-col items-center gap-4">
        <input
          type="text"
          inputMode="numeric"
          pattern="\d*"
          value={pillCount}
          onChange={(e) => handlePillCountChange(e.target.value)}
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