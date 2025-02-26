import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTheme } from '../../ThemeContext';
import type { CalendarDate } from '../../hooks/useCalendar';

interface DateSelectorProps {
  dates: CalendarDate[];
  onDateSelect: (date: Date) => void;
  onNavigateWeek: (direction: 'prev' | 'next') => void;
}

export function DateSelector({ dates, onDateSelect, onNavigateWeek }: DateSelectorProps) {
  const { isDark } = useTheme();

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between px-2">
        <button
          onClick={() => onNavigateWeek('prev')}
          className={`p-2 rounded-full transition-colors duration-150 ${
            isDark ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-200 text-gray-600'
          }`}
          aria-label="Previous week"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        
        <div className="grid grid-cols-7 flex-1 gap-1">
          {dates.map((date, index) => (
            <div key={date.fullDate} className="flex flex-col items-center">
              <span className={`text-xs mb-1 font-medium ${
                isDark ? 'text-gray-400' : 'text-gray-500'
              }`}>
                {date.day}
              </span>
              <button
                onClick={() => onDateSelect(new Date(date.fullDate))}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm transition-all duration-150 ${
                  date.isSelected
                    ? 'bg-cyan-500 text-white shadow-lg scale-110'
                    : date.isToday
                    ? `${isDark ? 'bg-gray-700 text-cyan-400' : 'bg-gray-100 text-cyan-600'}`
                    : `${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`
                }`}
              >
                {date.date}
              </button>
            </div>
          ))}
        </div>

        <button
          onClick={() => onNavigateWeek('next')}
          className={`p-2 rounded-full transition-colors duration-150 ${
            isDark ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-200 text-gray-600'
          }`}
          aria-label="Next week"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}