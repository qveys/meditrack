import { useTheme } from '@/ThemeContext.tsx';

interface DateButtonProps {
  day: string;
  date: number;
  isSelected: boolean;
  isToday: boolean;
  onClick: () => void;
}

export function DateButton({ day, date, isSelected, isToday, onClick }: DateButtonProps) {
  const { isDark } = useTheme();

  return (
    <div className="flex flex-col items-center">
      <span className={`text-xs mb-1 font-medium ${
        isDark ? 'text-gray-400' : 'text-gray-500'
      }`}>
        {day}
      </span>
      <button
        onClick={onClick}
        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm transition-all duration-150 ${
          isSelected
            ? 'bg-cyan-500 text-white shadow-lg scale-110'
            : isToday
            ? `${isDark ? 'bg-gray-700 text-cyan-400' : 'bg-gray-100 text-cyan-600'}`
            : `${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`
        }`}
      >
        {date}
      </button>
    </div>
  );
}