import { MedicationForm } from '../types';

export const validateName = (name: string): boolean => {
  return name.trim().length > 0;
};

export const validateForm = (form: string): boolean => {
  return form.length > 0;
};

export const validateFrequency = (frequency: string): boolean => {
  return frequency.length > 0;
};

export const validateSelectedDays = (days: string[]): boolean => {
  return days.length > 0;
};

export const validateInterval = (interval: number, min: number, max: number): boolean => {
  return interval >= min && interval <= max;
};

export const validateTimes = (times: { time: string; dose: string }[]): boolean => {
  return times.every(t => t.time && t.dose);
};

export const validateCustomTimes = (customTimes: number): boolean => {
  return customTimes > 0;
};

export const validateTreatmentDuration = (formData: MedicationForm): boolean => {
  if (formData.showTreatmentEndDate) {
    return !!formData.endDate;
  }
  if (formData.showCustomDuration) {
    return !!formData.treatmentDuration && formData.treatmentDuration > 0;
  }
  return !!formData.treatmentDurationOption;
};

export const validateRenewalReminder = (formData: MedicationForm): boolean => {
  if (formData.showRenewalReminder) {
    return !!formData.renewalReminderCount && formData.renewalReminderCount > 0;
  }
  if (formData.showRemainingPills) {
    return !!formData.remainingPills && formData.remainingPills > 0;
  }
  return true;
};