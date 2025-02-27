import { useTheme } from '@/ThemeContext.tsx';

interface NumberInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  suffix?: string;
}

export function NumberInput({ value, onChange, placeholder = '0', label, suffix }: NumberInputProps) {
  const { isDark } = useTheme();

  const handleChange = (value: string) => {
    // Permettre uniquement les nombres
    if (!/^\d*$/.test(value)) return;
    onChange(value);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {label && <p className="text-sm text-center">{label}</p>}

      <input
        type="text"
        inputMode="numeric"
        pattern="\d*"
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        className={`w-32 h-16 text-2xl text-center rounded-lg border transition-colors duration-150 ${
          isDark 
            ? 'bg-gray-700 border-gray-600 text-white focus:border-cyan-500' 
            : 'bg-white border-gray-300 focus:border-cyan-500'
        }`}
        placeholder={placeholder}
      />

      {suffix && <p className="text-lg text-cyan-500">{suffix}</p>}
    </div>
  );
}