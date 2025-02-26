import React from 'react';
import { Home, Calendar, Pill, MoreHorizontal } from 'lucide-react';
import { useTheme } from '../../ThemeContext';

interface NavigationProps {
  currentView: 'home' | 'medications';
  onViewChange: (view: 'home' | 'medications') => void;
}

export function Navigation({ currentView, onViewChange }: NavigationProps) {
  const { isDark } = useTheme();

  return (
    <nav className={`fixed bottom-0 w-full transition-colors duration-150 ${
      isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
    } border-t p-4`}>
      <div className="flex justify-around">
        <button
          onClick={() => onViewChange('home')}
          className={`flex flex-col items-center transition-colors duration-150 ${
            currentView === 'home' ? 'text-cyan-500' : isDark ? 'text-gray-400' : 'text-gray-500'
          }`}
        >
          <Home className="w-6 h-6" />
          <span className="text-xs mt-1">Home</span>
        </button>
        <button className={`flex flex-col items-center transition-colors duration-150 ${
          isDark ? 'text-gray-400' : 'text-gray-500'
        }`}>
          <Calendar className="w-6 h-6" />
          <span className="text-xs mt-1">Updates</span>
        </button>
        <button
          onClick={() => onViewChange('medications')}
          className={`flex flex-col items-center transition-colors duration-150 ${
            currentView === 'medications' ? 'text-cyan-500' : isDark ? 'text-gray-400' : 'text-gray-500'
          }`}
        >
          <Pill className="w-6 h-6" />
          <span className="text-xs mt-1">Medications</span>
        </button>
        <button className={`flex flex-col items-center transition-colors duration-150 ${
          isDark ? 'text-gray-400' : 'text-gray-500'
        }`}>
          <MoreHorizontal className="w-6 h-6" />
          <span className="text-xs mt-1">More</span>
        </button>
      </div>
    </nav>
  );
}