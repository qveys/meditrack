import { useState, useCallback } from 'react';
import { MedicationForm } from '../types';

interface UseFormSubmissionProps {
  onAdd: (medication: {
    name: string;
    dosage: string;
    icon: string;
    color: string;
  }) => Promise<any>;
  onClose: () => void;
  formData: MedicationForm;
}

export function useFormSubmission({ onAdd, onClose, formData }: UseFormSubmissionProps) {
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formatDosageText = useCallback((formData: MedicationForm) => {
    const timesText = formData.times
      .map(t => `${t.dose} ${formData.form}${t.dose !== '1' ? 's' : ''} à ${t.time}`)
      .join(', ');

    const frequencyText = getFrequencyText(formData);
    const durationText = getDurationText(formData);
    const instructionsText = formData.additionalInstructions 
      ? ` - ${formData.additionalInstructions}` 
      : '';

    return `${timesText}${frequencyText}${durationText}${instructionsText}`;
  }, []);

  const getFrequencyText = (formData: MedicationForm): string => {
    if (formData.frequency === 'Certains jours de la semaine') {
      return ` les ${formData.selectedDays.join(', ')}`;
    }
    if (formData.frequency === 'Cycle récurrent') {
      return ` pendant ${formData.cycleLength} jours, puis pause de ${formData.cycleFrequency} jours`;
    }
    return '';
  };

  const getDurationText = (formData: MedicationForm): string => {
    if (formData.treatmentDurationOption === 'days') {
      return ` pendant ${formData.treatmentDuration} jours`;
    }
    if (formData.treatmentDurationOption === 'endDate' && formData.endDate) {
      return ` jusqu'au ${formData.endDate}`;
    }
    return '';
  };

  const handleSubmit = useCallback(async () => {
    if (isSubmitting) return;

    try {
      setError(null);
      setIsSubmitting(true);

      const result = await onAdd({
        name: formData.name,
        dosage: formatDosageText(formData),
        icon: formData.icon,
        color: formData.color,
      });

      if (result) {
        onClose();
      } else {
        setError('Échec de la création du médicament. Veuillez réessayer.');
      }
    } catch (err) {
      setError('Une erreur inattendue est survenue. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, onAdd, onClose, isSubmitting, formatDosageText]);

  return {
    error,
    isSubmitting,
    handleSubmit,
  };
}