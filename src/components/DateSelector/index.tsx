import React from 'react';
import { NavigationButton } from './components/NavigationButton';
import { DateButton } from './components/DateButton';
import type { CalendarDate } from '../../hooks/useCalendar';

interface DateSelectorProps {
  dates: CalendarDate[];
  onDateSelect: (date: Date) => void;
  onNavigateWeek: (direction: 'prev' | 'next') => void;
}

export function DateSelector({ dates, onDateSelect, onNavigateWeek }: DateSelectorProps) {
  const handleNavigateWeek = (direction: 'prev' | 'next') => {
    onNavigateWeek(direction);
    const newDate = new Date(dates[0].fullDate);
    if (direction === 'next') {
      newDate.setDate(newDate.getDate() + 7);
    } else {
      newDate.setDate(newDate.getDate() - 7);
    }
    onDateSelect(newDate);
  };

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between px-2">
        <NavigationButton
          direction="prev"
          onClick={() => handleNavigateWeek('prev')}
        />
        
        <div className="grid grid-cols-7 flex-1 gap-1">
          {dates.map((date) => (
            <DateButton
              key={date.fullDate}
              day={date.day}
              date={date.date}
              isSelected={date.isSelected}
              isToday={date.isToday}
              onClick={() => onDateSelect(new Date(date.fullDate))}
            />
          ))}
        </div>

        <NavigationButton
          direction="next"
          onClick={() => handleNavigateWeek('next')}
        />
      </div>
    </div>
  );
}