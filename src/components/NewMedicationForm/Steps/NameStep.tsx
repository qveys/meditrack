import { useTheme } from '@/ThemeContext.tsx';
import { StepProps } from '../types';

export function NameStep({ formData, setFormData }: StepProps) {
  const { isDark } = useTheme();

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-4">Nom du médicament</h3>
      <input
        type="text"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        className={`w-full p-3 rounded-lg border transition-colors duration-150 ${
          isDark ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
        }`}
        placeholder="Ex: Xanaxx"
      />
    </div>
  );
}