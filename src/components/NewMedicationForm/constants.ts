export const MEDICATION_FORMS = [
  'Pilule',
  'Injection',
  'Solution (Liquide)',
  'Gouttes',
  'Inhalateur',
  'Poudre',
  'Autres'
] as const;

export const FREQUENCIES = [
  'Chaque jour',
  'Un jour sur deux',
  'Certains jours de la semaine',
  'Cycle récurrent',
  'Tous les X jours',
  'Toutes les X semaines',
  'Tous les X mois',
  'Seulement au besoin'
] as const;

export const TIMES_PER_DAY = [
  'Une fois par jour',
  'Deux fois par jour',
  '3 fois par jour',
  'Plus de 3 fois par jour',
  'Toutes les x heures',
  'Cycle récurrent',
  'Seulement au besoin'
] as const;

export const WEEKDAYS = [
  'Lundi',
  'Mardi',
  'Mercredi',
  'Jeudi',
  'Vendredi',
  'Samedi',
  'Dimanche'
] as const;

export type MedicationFormType = typeof MEDICATION_FORMS[number];
export type FrequencyType = typeof FREQUENCIES[number];
export type TimesPerDayType = typeof TIMES_PER_DAY[number];
export type WeekdayType = typeof WEEKDAYS[number];