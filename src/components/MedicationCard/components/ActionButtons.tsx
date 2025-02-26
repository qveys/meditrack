import React from 'react';
import { Undo2 } from 'lucide-react';
import { useTheme } from '../../../ThemeContext';

interface ActionButtonsProps {
  status: string;
  onAction: (action: 'take' | 'skip' | 'undo') => void;
}

export function ActionButtons({ status, onAction }: ActionButtonsProps) {
  const { isDark } = useTheme();

  if (status !== 'pending') {
    return (
      <button
        onClick={() => onAction('undo')}
        className={`p-2 rounded-full transition-colors duration-150 ${
          isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
        }`}
      >
        <Undo2 className="w-4 h-4" />
      </button>
    );
  }

  return (
    <>
      <button 
        onClick={() => onAction('skip')}
        className={`px-3 py-1 rounded-full text-sm transition-colors duration-150 ${
          isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
        }`}
      >
        Skip
      </button>
      <button 
        onClick={() => onAction('take')}
        className="px-3 py-1 rounded-full text-sm bg-cyan-500 text-white hover:bg-cyan-600 transition-colors duration-150"
      >
        Take
      </button>
    </>
  );
}