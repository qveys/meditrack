import React from 'react';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTheme } from '@/ThemeContext.tsx';
import { StepProps } from '../types';

export function DailyIntervalStep({ formData, setFormData }: StepProps) {
  const { isDark } = useTheme();
  const [interval, setInterval] = React.useState(formData.interval || 2);
  const [currentPage, setCurrentPage] = React.useState(0);

  // Générer les options de 2 à 60 jours
  const intervals = Array.from({ length: 59 }, (_, i) => i + 2);
  const itemsPerPage = 4;
  const totalPages = Math.ceil(intervals.length / itemsPerPage);

  const handleIntervalChange = (value: number) => {
    setInterval(value);
    setFormData({ ...formData, interval: value });
  };

  const getCurrentPageItems = () => {
    const start = currentPage * itemsPerPage;
    return intervals.slice(start, start + itemsPerPage);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-cyan-500/10">
          <Calendar className="w-6 h-6 text-cyan-500" />
        </div>
        <h3 className="text-lg font-semibold">Configurer les intervalles de jours</h3>
      </div>

      <div className="flex flex-col items-center">
        <p className="text-lg mb-6 text-cyan-500">Tous les</p>
        
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
            disabled={currentPage === 0}
            className={`p-2 rounded-full transition-colors duration-150 ${
              currentPage === 0
                ? isDark
                  ? 'text-gray-600 cursor-not-allowed'
                  : 'text-gray-300 cursor-not-allowed'
                : isDark
                ? 'hover:bg-gray-700 text-gray-300'
                : 'hover:bg-gray-200 text-gray-600'
            }`}
            aria-label="Page précédente"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div className="flex gap-4">
            {getCurrentPageItems().map((value) => (
              <button
                key={value}
                onClick={() => handleIntervalChange(value)}
                className={`w-16 h-16 rounded-lg text-2xl font-semibold transition-all duration-150 ${
                  interval === value
                    ? 'bg-cyan-500 text-white scale-110 shadow-lg'
                    : isDark
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {value}
              </button>
            ))}
          </div>

          <button
            onClick={() => setCurrentPage(Math.min(totalPages - 1, currentPage + 1))}
            disabled={currentPage === totalPages - 1}
            className={`p-2 rounded-full transition-colors duration-150 ${
              currentPage === totalPages - 1
                ? isDark
                  ? 'text-gray-600 cursor-not-allowed'
                  : 'text-gray-300 cursor-not-allowed'
                : isDark
                ? 'hover:bg-gray-700 text-gray-300'
                : 'hover:bg-gray-200 text-gray-600'
            }`}
            aria-label="Page suivante"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        <div className="flex flex-col items-center gap-2">
          <p className="text-lg text-cyan-500">jours</p>
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            {currentPage + 1} / {totalPages}
          </p>
        </div>
      </div>
    </div>
  );
}