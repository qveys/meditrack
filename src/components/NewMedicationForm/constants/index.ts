// Types de médicaments
export const MEDICATION_FORMS = [
  'Pilule',
  'Injection',
  'Solution (Liquide)',
  'Gouttes',
  'Inhalateur',
  'Poudre',
  'Autres'
] as const;

// Fréquences de prise
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

// Nombre de prises par jour
export const TIMES_PER_DAY = [
  'Une fois par jour',
  'Deux fois par jour',
  '3 fois par jour',
  'Plus de 3 fois par jour',
  'Toutes les x heures',
  'Cycle récurrent',
  'Seulement au besoin'
] as const;

// Jours de la semaine
export const WEEKDAYS = [
  'Lundi',
  'Mardi',
  'Mercredi',
  'Jeudi',
  'Vendredi',
  'Samedi',
  'Dimanche'
] as const;

// Options de cycle
export const CYCLE_OPTIONS = [
  { treatment: 21, pause: 7, label: '21+7' },
  { treatment: 24, pause: 4, label: '24+4' },
  { treatment: 28, pause: 0, label: '28+0' },
  { treatment: 3, pause: 1, label: '3+1' },
  { treatment: 84, pause: 7, label: '84+7' },
  { treatment: 14, pause: 14, label: '14+14' },
  { treatment: 63, pause: 7, label: '63+7' },
  { treatment: 26, pause: 2, label: '26+2' },
] as const;

// Options de durée de traitement prédéfinies
export const DURATION_OPTIONS = [
  { value: 5, label: '5 jours de traitement' },
  { value: 7, label: '7 jours de traitement' },
  { value: 10, label: '10 jours de traitement' },
  { value: 30, label: '30 jours de traitement' },
] as const;

// Options d'intervalle horaire
export const HOUR_INTERVALS = [1, 2, 3, 4, 6, 8, 12] as const;

// Nombre de prises personnalisées
export const CUSTOM_TIMES_OPTIONS = {
  min: 4,
  max: 23,
  itemsPerPage: 4,
} as const;

// Intervalles de jours
export const DAILY_INTERVAL_OPTIONS = {
  min: 2,
  max: 60,
  itemsPerPage: 4,
} as const;

// Intervalles de semaines
export const WEEKLY_INTERVAL_OPTIONS = {
  min: 1,
  max: 21,
  itemsPerPage: 4,
} as const;

// Intervalles de mois
export const MONTHLY_INTERVAL_OPTIONS = {
  min: 1,
  max: 12,
  itemsPerPage: 4,
} as const;

// Types exportés
export type MedicationFormType = typeof MEDICATION_FORMS[number];
export type FrequencyType = typeof FREQUENCIES[number];
export type TimesPerDayType = typeof TIMES_PER_DAY[number];
export type WeekdayType = typeof WEEKDAYS[number];
export type CycleOptionType = typeof CYCLE_OPTIONS[number];
export type DurationOptionType = typeof DURATION_OPTIONS[number];
export type HourIntervalType = typeof HOUR_INTERVALS[number];