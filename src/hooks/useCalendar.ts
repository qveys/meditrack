import { useState, useCallback } from 'react';

export interface CalendarDate {
  day: string;
  date: number;
  fullDate: string;
  isSelected: boolean;
  isToday: boolean;
}

const WEEK_DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export function useCalendar() {
  const [currentWeekStart, setCurrentWeekStart] = useState(() => {
    const today = new Date();
    const day = today.getDay();
    const diff = today.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(today.setDate(diff));
  });

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [slideDirection, setSlideDirection] = useState<'left' | 'right' | null>(null);

  const getWeekDates = useCallback((startDate: Date): CalendarDate[] => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      
      const fullDate = date.toISOString().split('T')[0];
      const selected = selectedDate.toISOString().split('T')[0] === fullDate;
      const isToday = date.getTime() === today.getTime();

      return {
        day: WEEK_DAYS[i],
        date: date.getDate(),
        fullDate,
        isSelected: selected,
        isToday,
      };
    });
  }, [selectedDate]);

  const dates = getWeekDates(currentWeekStart);

  const handleDateSelection = (date: Date) => {

    console.log("use");
    console.log(date);
    
    const currentDateStr = selectedDate.toISOString().split('T')[0];
    const newDateStr = date.toISOString().split('T')[0];
    
    if (currentDateStr === newDateStr) {
      return;
    }

    const currentDate = selectedDate.getTime();
    const newDate = date.getTime();
    
    setSlideDirection(newDate > currentDate ? 'left' : 'right');
    setSelectedDate(date);

    setTimeout(() => {
      setSlideDirection(null);
    }, 150);
  };

  const navigateWeek = (direction: 'prev' | 'next') => {
    const newStart = new Date(currentWeekStart);
    newStart.setDate(currentWeekStart.getDate() + (direction === 'next' ? 7 : -7));
    setCurrentWeekStart(newStart);
    
    const selectedTime = selectedDate.getTime();
    const weekStart = newStart.getTime();
    const weekEnd = new Date(newStart).setDate(newStart.getDate() + 6);
    
    if (selectedTime < weekStart || selectedTime > weekEnd) {
      setSelectedDate(new Date(newStart));
    }
  };

  return {
    selectedDate,
    setSelectedDate: handleDateSelection,
    slideDirection,
    dates,
    navigateWeek,
    currentWeekStart,
  };
}