// Types communs pour les options de date
export interface BaseOptionType {
  value: number;
  label: string | number;
}

// Type pour les parties de la date
export type DatePartType = 'day' | 'month' | 'year';

// Interface pour les propriétés liées au thème
export interface ThemeProps {
  isDark: boolean;
}

// Interface pour le sélecteur de date
export interface DateSelectorProps extends ThemeProps {
  label: string;
  value: number;
  options: BaseOptionType[];
  onChange: (value: number) => void;
}

// Interface pour le composant principal
export interface DatePickerProps {
  onDateChange: (date: Date) => void;
}