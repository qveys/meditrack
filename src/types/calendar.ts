
export interface CalendarDate {
  day: string;
  date: number;
  fullDate: string;
  isSelected: boolean;
  isToday: boolean;
}

export interface Calendar {
  dates: CalendarDate[];
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  navigateWeek: (direction: 'prev' | 'next') => void;
  slideDirection: 'left' | 'right' | null;
  currentWeekStart: Date;
}