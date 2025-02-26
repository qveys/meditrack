import React from 'react';
import { StatusBadge } from './StatusBadge';

interface MedicationIconProps {
  icon: string;
  color: string;
  status?: string;
}

export function MedicationIcon({ icon, color, status }: MedicationIconProps) {
  return (
    <span className={`${color} p-2 rounded-md relative`}>
      {icon}
      {status && status !== 'pending' && (
        <StatusBadge status={status as 'taken' | 'skipped'} />
      )}
    </span>
  );
}