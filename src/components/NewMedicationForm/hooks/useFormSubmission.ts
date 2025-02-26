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

  const handleSubmit = useCallback(async () => {
    if (isSubmitting) return;

    setError(null);
    setIsSubmitting(true);

    try {
      const dosageText = formData.times.map(t => 
        `${t.dose} ${formData.form}${t.dose !== '1' ? 's' : ''} à ${t.time}`
      ).join(', ');

      let frequencyText = '';
      if (formData.frequency === 'Certains jours de la semaine') {
        frequencyText = ` les ${formData.selectedDays.join(', ')}`;
      } else if (formData.frequency === 'Cycle récurrent') {
        frequencyText = ` pendant ${formData.cycleLength} jours, puis pause de ${formData.cycleFrequency} jours`;
      }

      const result = await onAdd({
        name: formData.name,
        dosage: `${dosageText}${frequencyText}${formData.additionalInstructions ? ` - ${formData.additionalInstructions}` : ''}`,
        icon: formData.icon,
        color: formData.color,
      });

      if (result) {
        onClose();
      } else {
        setError('Failed to create medication. Please try again.');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, onAdd, onClose, isSubmitting]);

  return {
    error,
    isSubmitting,
    handleSubmit,
  };
}