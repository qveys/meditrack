import React from 'react';
import { useTheme } from '../../../ThemeContext';

interface StepFooterProps {
  onNext: () => void;
  isSubmitting?: boolean;
  isLastStep?: boolean;
  canProceed: boolean;
}

export function StepFooter({ onNext, isSubmitting, isLastStep, canProceed }: StepFooterProps) {
  const { isDark } = useTheme();

  return (
    <button
      onClick={onNext}
      disabled={!canProceed || (isLastStep && isSubmitting)}
      className={`w-full py-3 px-4 rounded-lg transition-colors duration-150 ${
        !canProceed || (isLastStep && isSubmitting)
          ? 'bg-gray-200 cursor-not-allowed'
          : 'bg-cyan-500 text-white hover:bg-cyan-600'
      }`}
    >
      {isLastStep 
        ? (isSubmitting ? 'Enregistrement...' : 'Enregistrer')
        : 'Suivant'
      }
    </button>
  );
}