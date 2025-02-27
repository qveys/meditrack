import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTheme } from '@/ThemeContext.tsx';

interface PageControlsProps {
  currentPage: number;
  totalPages: number;
  onPrevPage: () => void;
  onNextPage: () => void;
}

export function PageControls({ currentPage, totalPages, onPrevPage, onNextPage }: PageControlsProps) {
  const { isDark } = useTheme();

  return (
    <div className="flex items-center gap-4">
      <button
        onClick={onPrevPage}
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

      <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>
        {currentPage + 1} / {totalPages}
      </span>

      <button
        onClick={onNextPage}
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
  );
}