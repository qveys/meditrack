import React from 'react';
import { useTheme } from '../../../ThemeContext';

export function EmptyState() {
  const { isDark } = useTheme();

  return (
    <div className={`text-center py-8 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
      No medications scheduled for this day
    </div>
  );
}