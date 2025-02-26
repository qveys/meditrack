import { useCallback } from 'react';
import { MedicationForm } from '../types';
import { 
  validateName, 
  validateForm, 
  validateFrequency,
  validateSelectedDays,
  validateInterval,
  validateTimes,
  validateCustomTimes,
  validateTreatmentDuration,
  validateRenewalReminder
} from '../utils/validationUtils';
import { 
  DAILY_INTERVAL_OPTIONS,
  WEEKLY_INTERVAL_OPTIONS,
  MONTHLY_INTERVAL_OPTIONS
} from '../constants';

export function useFormValidation() {
  const validateStep = useCallback((step: number, formData: MedicationForm): boolean => {
    // Validation des étapes de durée de traitement
    if (formData.showTreatmentStartDate) {
      return validateTreatmentDuration(formData);
    }

    // Validation des étapes de rappel de renouvellement
    if (formData.showRemainingPills) {
      return validateRenewalReminder(formData);
    }

    // Validation des étapes principales
    switch (step) {
      case 1: 
        return validateName(formData.name);
      
      case 2: 
        return validateForm(formData.form);
      
      case 3: 
        return validateFrequency(formData.frequency);
      
      case 4:
        if (formData.frequency === 'Certains jours de la semaine') {
          return validateSelectedDays(formData.selectedDays);
        }
        if (formData.frequency === 'Tous les X jours') {
          return validateInterval(formData.interval, DAILY_INTERVAL_OPTIONS.min, DAILY_INTERVAL_OPTIONS.max);
        }
        if (formData.frequency === 'Toutes les X semaines') {
          return validateInterval(formData.weekInterval, WEEKLY_INTERVAL_OPTIONS.min, WEEKLY_INTERVAL_OPTIONS.max);
        }
        if (formData.frequency === 'Tous les X mois') {
          return validateInterval(formData.monthInterval, MONTHLY_INTERVAL_OPTIONS.min, MONTHLY_INTERVAL_OPTIONS.max);
        }
        return formData.timesPerDay.length > 0;

      case 5:
        if (formData.timesPerDay === 'Plus de 3 fois par jour') {
          return validateCustomTimes(formData.customTimes);
        }
        if (formData.frequency === 'Cycle récurrent') {
          return typeof formData.usePlacebo === 'boolean';
        }
        return validateTimes(formData.times);

      case 6:
      case 7:
      case 8:
      case 9:
        return validateTimes(formData.times);

      default:
        return true;
    }
  }, []);

  return { validateStep };
}