import React from 'react';
import { useTheme } from '../../../ThemeContext';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export function StepIndicator({ currentStep, totalSteps }: StepIndicatorProps) {
  const { isDark } = useTheme();

  return (
    <div className="flex gap-1">
      {Array.from({ length: totalSteps }).map((_, i) => (
        <div
          key={i}
          className={`w-6 h-1 rounded-full transition-colors duration-150 ${
            i + 1 === currentStep
              ? 'bg-cyan-500'
              : i + 1 < currentStep
              ? isDark
                ? 'bg-gray-600'
                : 'bg-gray-300'
              : isDark
              ? 'bg-gray-700'
              : 'bg-gray-200'
          }`}
        />
      ))}
    </div>
  );
}