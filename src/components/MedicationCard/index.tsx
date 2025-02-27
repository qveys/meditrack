import { useTheme } from '../../ThemeContext';
import { MedicationIcon } from './components/MedicationIcon';
import { MedicationInfo } from './components/MedicationInfo';
import { ActionButtons } from './components/ActionButtons';
import type { Medication } from '@/types/medication.ts';

interface MedicationCardProps {
  medication: Medication;
  onAction: (id: string, action: 'take' | 'skip' | 'undo') => void;
}

export function MedicationCard({ medication, onAction }: MedicationCardProps) {
  const { isDark } = useTheme();

  const getStatusStyles = (status?: string) => {
    switch (status) {
      case 'taken':
        return `${isDark ? 'bg-green-700/25' : 'bg-green-100'} border-l-4 border-green-500`;
      case 'skipped':
        return `${isDark ? 'bg-yellow-700/25' : 'bg-yellow-100'} border-l-4 border-yellow-500`;
      default:
        return isDark ? 'bg-gray-800/20' : '';
    }
  };

  return (
    <div className={`px-4 py-3 transition-all duration-300 ${getStatusStyles(medication.status)}`}>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <MedicationIcon
            icon={medication.icon}
            color={medication.color}
            status={medication.status}
          />
          <MedicationInfo
            name={medication.name}
            dosage={medication.dosage}
            status={medication.status}
          />
        </div>
        <div className="flex items-center gap-2">
          <ActionButtons
            status={medication.status || 'pending'}
            onAction={(action) => onAction(medication.id, action)}
          />
        </div>
      </div>
    </div>
  );
}