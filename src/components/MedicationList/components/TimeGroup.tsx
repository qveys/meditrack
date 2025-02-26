import React from 'react';
import { ChevronDown } from 'lucide-react';
import { useTheme } from '../../../ThemeContext';
import { MedicationCard } from '../../MedicationCard';
import type { Medication } from '../../../types/medication';

interface TimeGroupProps {
  time: string;
  medications: Medication[];
  onMedicationAction: (id: string, action: 'take' | 'skip' | 'undo') => void;
}

export function TimeGroup({ time, medications, onMedicationAction }: TimeGroupProps) {
  const { isDark } = useTheme();

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours, 10);
    const period = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${period}`;
  };

  return (
    <div className={`rounded-lg shadow-sm transition-colors duration-150 ${
      isDark ? 'bg-gray-800/30' : 'border border-gray-300'
    }`}>
      <div className={`flex items-center justify-between px-4 py-2 border-b ${
        isDark ? 'border-gray-700' : 'border-gray-200'
      }`}>
        <h2 className={`text-sm font-semibold ${
          isDark ? 'text-cyan-400' : 'text-cyan-600'
        }`}>
          {formatTime(time)}
        </h2>
        <ChevronDown className={`w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
      </div>
      <div>
        {medications.map((medication) => (
          <MedicationCard
            key={medication.id}
            medication={medication}
            onAction={onMedicationAction}
          />
        ))}
      </div>
    </div>
  );
}