import { useCallback } from 'react';
import { MedicationForm } from '../types';

export function useFormProgress() {
  const calculateProgress = useCallback((step: number, totalSteps: number, formData: MedicationForm): number => {
    // Calculer le pourcentage de progression
    let progress = (step / totalSteps) * 100;

    // Ajouter du poids pour les champs optionnels remplis
    if (formData.treatmentDurationOption) progress += 5;
    if (formData.remainingPills) progress += 5;
    if (formData.renewalReminderCount) progress += 5;
    if (formData.additionalInstructions) progress += 5;

    // Limiter à 100%
    return Math.min(progress, 100);
  }, []);

  const getStepLabel = useCallback((step: number, formData: MedicationForm): string => {
    if (formData.showTreatmentStartDate) {
      if (formData.showTreatmentDuration) {
        if (formData.showTreatmentEndDate) return 'Date de fin';
        if (formData.showCustomDuration) return 'Durée personnalisée';
        return 'Durée du traitement';
      }
      return 'Date de début';
    }

    if (formData.showRemainingPills) {
      if (formData.showRenewalReminder) return 'Rappel de renouvellement';
      return 'Médicaments restants';
    }

    const labels: { [key: number]: string } = {
      1: 'Nom',
      2: 'Forme',
      3: 'Fréquence',
      4: 'Configuration',
      5: 'Horaires',
      6: 'Options',
    };

    return labels[step] || `Étape ${step}`;
  }, []);

  return {
    calculateProgress,
    getStepLabel,
  };
}