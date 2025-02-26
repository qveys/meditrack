import React from 'react';
import { X, ChevronLeft } from 'lucide-react';
import { useTheme } from '../../../ThemeContext';
import { StepIndicator } from './StepIndicator';

interface FormLayoutProps {
  children: React.ReactNode;
  onClose: () => void;
  onBack?: () => void;
  currentStep: number;
  totalSteps: number;
  footer: React.ReactNode;
}

export function FormLayout({
  children,
  onClose,
  onBack,
  currentStep,
  totalSteps,
  footer
}: FormLayoutProps) {
  const { isDark } = useTheme();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div 
        className={`w-full max-w-md rounded-lg shadow-lg transition-colors duration-150 ${
          isDark ? 'bg-gray-800' : 'bg-white'
        } max-h-[90vh] flex flex-col`}
      >
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <button
            onClick={currentStep > 1 ? onBack : onClose}
            className={`p-2 rounded-full transition-colors duration-150 ${
              isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
            }`}
          >
            {currentStep > 1 ? <ChevronLeft className="w-5 h-5" /> : <X className="w-5 h-5" />}
          </button>
          <StepIndicator currentStep={currentStep} totalSteps={totalSteps} />
          <div className="w-9" />
        </div>

        <div className="p-6 overflow-y-auto flex-1">
          {children}
        </div>

        <div className="p-6 border-t border-gray-200">
          {footer}
        </div>
      </div>
    </div>
  );
}