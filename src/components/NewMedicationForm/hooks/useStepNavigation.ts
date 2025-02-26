import { useCallback } from 'react';
import type { MedicationForm } from '../types';

interface UseStepNavigationProps {
  formData: MedicationForm;
  updateFormData: (updates: Partial<MedicationForm>) => void;
}

export function useStepNavigation({ formData, updateFormData }: UseStepNavigationProps) {
  const handleTreatmentDuration = useCallback(() => {
    if (formData.showTreatmentDuration) {
      if (formData.showTreatmentEndDate) {
        resetTreatmentDuration();
      } else if (shouldShowCustomDuration()) {
        updateFormData({ showCustomDuration: true });
      } else if (formData.treatmentDurationOption === 'endDate') {
        updateFormData({ showTreatmentEndDate: true });
      } else {
        resetTreatmentDuration();
      }
    } else {
      updateFormData({ showTreatmentDuration: true });
    }
  }, [formData]);

  const handleRenewalReminder = useCallback(() => {
    if (formData.showRenewalReminder) {
      resetRenewalReminder();
    } else {
      updateFormData({ showRenewalReminder: true });
    }
  }, [formData]);

  const resetTreatmentDuration = useCallback(() => {
    updateFormData({
      showTreatmentStartDate: false,
      showTreatmentDuration: false,
      showCustomDuration: false,
      showTreatmentEndDate: false
    });
  }, [updateFormData]);

  const resetRenewalReminder = useCallback(() => {
    updateFormData({
      showRenewalReminder: false,
      showRemainingPills: false
    });
  }, [updateFormData]);

  const shouldShowCustomDuration = useCallback(() => {
    return formData.treatmentDurationOption === 'days' && 
           !formData.showCustomDuration && 
           formData.mustShowCustomDuration;
  }, [formData]);

  const handleBack = useCallback(() => {
    if (formData.showTreatmentStartDate) {
      handleTreatmentDurationBack();
    } else if (formData.showRemainingPills) {
      handleRenewalReminderBack();
    }
  }, [formData]);

  const handleTreatmentDurationBack = useCallback(() => {
    if (formData.showTreatmentDuration) {
      if (formData.showTreatmentEndDate) {
        updateFormData({ 
          showTreatmentEndDate: false, 
          treatmentDurationOption: null 
        });
      } else if (formData.showCustomDuration) {
        updateFormData({ 
          showCustomDuration: false, 
          treatmentDurationOption: null, 
          treatmentDuration: null 
        });
      } else {
        updateFormData({ showTreatmentDuration: false });
      }
    } else {
      updateFormData({ showTreatmentStartDate: false });
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
    handleTreatmentDuration,
    handleRenewalReminder,
    handleBack,
  };
}