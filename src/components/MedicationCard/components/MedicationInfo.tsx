import React from 'react';
import { useTheme } from '../../../ThemeContext';

interface MedicationInfoProps {
  name: string;
  dosage: string;
  status?: string;
  takenTime?: string;
}

export function MedicationInfo({ name, dosage, status, takenTime }: MedicationInfoProps) {
  const { isDark } = useTheme();

  return (
    <div>
      <h3 className={`font-medium ${
        status === 'taken' ? 'text-green-500 font-bold' : ''
      }`}>
        {name}
      </h3>
      <p className={`text-sm transition-colors duration-150 ${
        isDark ? 'text-gray-400' : 'text-gray-600'
      }`}>
        {dosage}
      </p>
      {status && status !== 'pending' && (
        <div className="flex items-center gap-2 mt-1">
          <span className={`text-xs ${
            status === 'taken' 
              ? 'text-green-500' 
              : 'text-yellow-500'
          }`}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
          <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
            {takenTime || new Date().toLocaleTimeString()}
          </span>
        </div>
      )}
    </div>
  );
}