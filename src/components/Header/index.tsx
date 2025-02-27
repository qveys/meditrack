import { Plus, Sun, Moon, LogOut } from 'lucide-react';
import { useTheme } from '../../ThemeContext';
import { useAuth } from '@/hooks/useAuth.ts';
import { DateSelector } from '../DateSelector';
import type { User } from '@supabase/supabase-js';
import { Calendar } from "@/types/calendar.ts";

interface HeaderProps {
  onAddMedication: () => void;
  calendar: Calendar;
  user: User;
}

export function Header({ onAddMedication, calendar, user }: HeaderProps) {
  const { isDark, toggleTheme } = useTheme();
  const { signOut } = useAuth();

  return (
    <header className={`p-4 transition-colors duration-150 ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-cyan-500 flex items-center justify-center text-white">
            {user.email?.[0].toUpperCase()}
          </div>
          <span className="text-lg font-medium">{user.email}</span>
        </div>
        <div className="flex gap-2">
          <button 
            className={`p-2 rounded-full transition-colors duration-150 ${
              isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
            }`}
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {isDark ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </button>
          <button 
            className={`p-2 rounded-full transition-colors duration-150 ${
              isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
            }`}
            onClick={onAddMedication}
            aria-label="Add medication"
          >
            <Plus className="w-5 h-5" />
          </button>
          <button 
            className={`p-2 rounded-full transition-colors duration-150 ${
              isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
            }`}
            onClick={() => signOut()}
            aria-label="Sign out"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>

      <DateSelector 
        dates={calendar.dates}
        onDateSelect={calendar.setSelectedDate}
        onNavigateWeek={calendar.navigateWeek}
      />
    </header>
  );
}