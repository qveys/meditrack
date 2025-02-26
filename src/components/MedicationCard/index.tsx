import React from 'react';
import { Check, Undo2, X } from 'lucide-react';
import { useTheme } from '../../ThemeContext';
import type { Medication } from '../../types/medication';

interface MedicationCardProps {
  medication: Medication;
  onAction: (id: string, action: 'take' | 'skip' | 'undo') => void;
}

export function MedicationCard({ medication, onAction }: MedicationCardProps) {
  const { isDark } = useTheme();

  const getStatusStyles = (status?: string) => {
    switch (status) {
      case 'taken':
        return `${isDark ? 'bg-green-700/25' : 'bg-green-100'} border-l-4 border-green-500`;
      case 'skipped':
        return `${isDark ? 'bg-yellow-700/25' : 'bg-yellow-100'} border-l-4 border-yellow-500`;
      default:
        return isDark ? 'bg-gray-800/20' : '';
    }
  };

  return (
    <div
      className={`px-4 py-3 transition-all duration-300 ${getStatusStyles(medication.status)}`}
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <span className={`${medication.color} p-2 rounded-md relative`}>
            {medication.icon}
            {medication.status === 'taken' && (
              <span className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-0.5">
                <Check className="w-3 h-3 text-white" />
              </span>
            )}
            {medication.status === 'skipped' && (
              <span className="absolute -bottom-1 -right-1 bg-yellow-500 rounded-full p-0.5">
                <X className="w-3 h-3 text-white" />
              </span>
            )}
          </span>
          <div>
            <h3 className={`font-medium ${
              medication.status === 'taken' ? 'text-green-500 font-bold' : ''
            }`}>
              {medication.name}
            </h3>
            <p className={`text-sm transition-colors duration-150 ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}>
              {medication.dosage}
            </p>
            {medication.status && medication.status !== 'pending' && (
              <div className="flex items-center gap-2 mt-1">
                <span className={`text-xs ${
                  medication.status === 'taken' 
                    ? 'text-green-500' 
                    : 'text-yellow-500'
                }`}>
                  {medication.status.charAt(0).toUpperCase() + medication.status.slice(1)}
                </span>
                <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                  {new Date().toLocaleTimeString()}
                </span>
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {medication.status === 'pending' ? (
            <>
              <button 
                onClick={() => onAction(medication.id, 'skip')}
                className={`px-3 py-1 rounded-full text-sm transition-colors duration-150 ${
                  isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                Skip
              </button>
              <button 
                onClick={() => onAction(medication.id, 'take')}
                className="px-3 py-1 rounded-full text-sm bg-cyan-500 text-white hover:bg-cyan-600 transition-colors duration-150"
              >
                Take
              </button>
            </>
          ) : (
            <button
              onClick={() => onAction(medication.id, 'undo')}
              className={`p-2 rounded-full transition-colors duration-150 ${
                isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              <Undo2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}