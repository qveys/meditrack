import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTheme } from '@/ThemeContext.tsx';

interface NavigationButtonProps {
  direction: 'prev' | 'next';
  onClick: () => void;
}

export function NavigationButton({ direction, onClick }: NavigationButtonProps) {
  const { isDark } = useTheme();
  const Icon = direction === 'prev' ? ChevronLeft : ChevronRight;

  return (
    <button
      onClick={onClick}
      className={`p-2 rounded-full transition-colors duration-150 ${
        isDark ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-200 text-gray-600'
      }`}
      aria-label={`${direction === 'prev' ? 'Previous' : 'Next'} week`}
    >
      <Icon className="w-5 h-5" />
    </button>
  );
}