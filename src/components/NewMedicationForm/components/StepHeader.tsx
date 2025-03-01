import { DivideIcon as LucideIcon } from 'lucide-react';

interface StepHeaderProps {
  icon: typeof LucideIcon;
  title: string;
}

export function StepHeader({ icon: Icon, title }: StepHeaderProps) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="w-10 h-10 flex items-center justify-center rounded-full bg-cyan-500/10">
        <Icon className="w-6 h-6 text-cyan-500" />
      </div>
      <h3 className="text-lg font-semibold">{title}</h3>
    </div>
  );
}