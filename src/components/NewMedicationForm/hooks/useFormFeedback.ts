import { useState, useCallback } from 'react';
import { MedicationForm } from '../types';

interface FormFeedback {
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
}

export function useFormFeedback() {
  const [feedback, setFeedback] = useState<FormFeedback | null>(null);

  const showFeedback = useCallback((type: FormFeedback['type'], message: string) => {
    setFeedback({ type, message });
    
    // Auto-hide feedback after 3 seconds
    setTimeout(() => {
      setFeedback(null);
    }, 3000);
  }, []);

  const clearFeedback = useCallback(() => {
    setFeedback(null);
  }, []);

  const validateStep = useCallback((step: number, formData: MedicationForm) => {
    switch (step) {
      case 1:
        if (!formData.name.trim()) {
          showFeedback('error', 'Le nom du médicament est requis');
          return false;
        }
        break;
      case 2:
        if (!formData.form) {
          showFeedback('error', 'La forme du médicament est requise');
          return false;
        }
        break;
      case 3:
        if (!formData.frequency) {
          showFeedback('error', 'La fréquence de prise est requise');
          return false;
        }
        break;
      case 4:
        if (formData.frequency === 'Certains jours de la semaine' && formData.selectedDays.length === 0) {
          showFeedback('error', 'Veuillez sélectionner au moins un jour');
          return false;
        }
        break;
      case 5:
        if (formData.times.some(t => !t.time || !t.dose)) {
          showFeedback('error', 'Les heures et doses sont requises');
          return false;
        }
        break;
    }
    return true;
  }, [showFeedback]);

  return {
    feedback,
    showFeedback,
    clearFeedback,
    validateStep,
  };
}