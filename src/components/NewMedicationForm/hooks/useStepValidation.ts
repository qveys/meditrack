import { useCallback } from 'react';
import type { MedicationForm } from '../types';

interface ValidationRules {
  [key: string]: (formData: MedicationForm) => boolean;
}

export function useStepValidation() {
  const basicValidationRules: ValidationRules = {
    name: (formData) => formData.name.trim().length > 0,
    form: (formData) => formData.form.length > 0,
    frequency: (formData) => formData.frequency.length > 0,
    selectedDays: (formData) => formData.selectedDays.length > 0,
    interval: (formData) => formData.interval >= 2 && formData.interval <= 60,
    weekInterval: (formData) => formData.weekInterval > 0,
    monthInterval: (formData) => formData.monthInterval > 0,
    times: (formData) => formData.times.every(t => t.time && t.dose),
    customTimes: (formData) => formData.customTimes > 0,
  };

  const validateStep = useCallback((step: number, formData: MedicationForm): boolean => {
    if (formData.showTreatmentStartDate) {
      return validateTreatmentDuration(formData);
    }

    if (formData.showRemainingPills) {
      return validateRenewalReminder(formData);
    }

    return validateMainStep(step, formData);
  }, []);

  const validateMainStep = (step: number, formData: MedicationForm): boolean => {
    switch (step) {
      case 1: return basicValidationRules.name(formData);
      case 2: return basicValidationRules.form(formData);
      case 3: return basicValidationRules.frequency(formData);
      case 4: return validateFrequencyStep(formData);
      case 5: return validateTimingStep(formData);
      default: return true;
    }
  };

  const validateFrequencyStep = (formData: MedicationForm): boolean => {
    const { frequency } = formData;
    
    const frequencyValidations: ValidationRules = {
      'Certains jours de la semaine': basicValidationRules.selectedDays,
      'Tous les X jours': basicValidationRules.interval,
      'Toutes les X semaines': basicValidationRules.weekInterval,
      'Tous les X mois': basicValidationRules.monthInterval,
    };

    return frequencyValidations[frequency]?.(formData) ?? true;
  };

  const validateTimingStep = (formData: MedicationForm): boolean => {
    const { timesPerDay } = formData;
    
    if (timesPerDay === 'Plus de 3 fois par jour') {
      return basicValidationRules.customTimes(formData);
    }
    
    return basicValidationRules.times(formData);
  };

  const validateTreatmentDuration = (formData: MedicationForm): boolean => {
    if (formData.showTreatmentEndDate) {
      return !!formData.endDate;
    }
    if (formData.showCustomDuration) {
      return !!formData.treatmentDuration && formData.treatmentDuration > 0;
    }
    return !!formData.treatmentDurationOption;
  };

  const validateRenewalReminder = (formData: MedicationForm): boolean => {
    if (formData.showRenewalReminder) {
      return !!formData.renewalReminderCount && formData.renewalReminderCount > 0;
    }
    if (formData.showRemainingPills) {
      return !!formData.remainingPills && formData.remainingPills > 0;
    }
    return true;
  };

  return { validateStep };
}