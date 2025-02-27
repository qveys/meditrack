import { useCallback } from 'react';
import { MedicationForm } from '../types';

interface UseFormFlowProps {
  formData: MedicationForm;
  updateFormData: (updates: Partial<MedicationForm>) => void;
}

export function useFormFlow({ formData, updateFormData }: UseFormFlowProps) {
  const showTreatmentDurationFlow = useCallback(() => {
    updateFormData({ timesPerDay: "", showTreatmentStartDate: true });
  }, [updateFormData]);

  const showRenewalReminderFlow = useCallback(() => {
    updateFormData({ showRemainingPills: true });
  }, [updateFormData]);

  const handleTreatmentDurationNext = useCallback(() => {
    if (formData.showTreatmentDuration) {
      if (formData.showTreatmentEndDate) {
        updateFormData({
          showTreatmentStartDate: false,
          showTreatmentDuration: false,
          showCustomDuration: false,
          showTreatmentEndDate: false
        });
      } else if (formData.treatmentDurationOption === 'days' && !formData.showCustomDuration && formData.mustShowCustomDuration) {
        updateFormData({ showCustomDuration: true });
      } else if (formData.treatmentDurationOption === 'endDate') {
        updateFormData({ showTreatmentEndDate: true });
      } else {
        updateFormData({
          showTreatmentStartDate: false,
          showTreatmentDuration: false,
          showCustomDuration: false
        });
      }
    } else {
      updateFormData({ showTreatmentDuration: true });
    }
  }, [formData, updateFormData]);

  const handleTreatmentDurationBack = useCallback(() => {
    if (formData.showTreatmentDuration) {
      if (formData.showTreatmentEndDate) {
        updateFormData({
          showTreatmentEndDate: false,
          treatmentDurationOption: undefined
        });
      } else if (formData.showCustomDuration) {
        updateFormData({
          showCustomDuration: false,
          treatmentDurationOption: undefined,
          treatmentDuration: undefined
        });
      } else {
        updateFormData({ showTreatmentDuration: false });
      }
    } else {
      updateFormData({ showTreatmentStartDate: false });
    }
  }, [formData, updateFormData]);

  const handleRenewalReminderNext = useCallback(() => {
    if (formData.showRenewalReminder) {
      updateFormData({
        showRenewalReminder: false,
        showRemainingPills: false
      });
    } else {
      updateFormData({ showRenewalReminder: true });
    }
  }, [formData, updateFormData]);

  const handleRenewalReminderBack = useCallback(() => {
    if (formData.showRenewalReminder) {
      updateFormData({ showRenewalReminder: false });
    } else {
      updateFormData({ showRemainingPills: false });
    }
  }, [formData, updateFormData]);

  return {
    showTreatmentDurationFlow,
    showRenewalReminderFlow,
    handleTreatmentDurationNext,
    handleTreatmentDurationBack,
    handleRenewalReminderNext,
    handleRenewalReminderBack,
  };
}