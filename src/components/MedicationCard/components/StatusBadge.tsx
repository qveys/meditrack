import { Check, X } from 'lucide-react';

interface StatusBadgeProps {
  status: 'taken' | 'skipped';
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const Icon = status === 'taken' ? Check : X;
  const bgColor = status === 'taken' ? 'bg-green-500' : 'bg-yellow-500';

  return (
    <span className={`absolute -bottom-1 -right-1 ${bgColor} rounded-full p-0.5`}>
      <Icon className="w-3 h-3 text-white" />
    </span>
  );
}