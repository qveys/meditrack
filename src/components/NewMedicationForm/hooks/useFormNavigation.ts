import { useState, useCallback } from 'react';
import { MedicationForm } from '../types';

interface UseFormNavigationProps {
  formData: MedicationForm;
}

export function useFormNavigation({ formData }: UseFormNavigationProps) {
  const [step, setStep] = useState(1);

  const shouldShowTimesPerDay = formData.frequency === 'Chaque jour';
  const shouldShowWeekDays = formData.frequency === 'Certains jours de la semaine';
  const shouldShowCycle = formData.frequency === 'Cycle récurrent';

  const getTotalSteps = useCallback(() => {
    let steps = 5; // Base steps
    if (shouldShowTimesPerDay) steps++;
    if (shouldShowWeekDays) steps++;
    if (shouldShowCycle) steps++;
    return steps;
  }, [shouldShowTimesPerDay, shouldShowWeekDays, shouldShowCycle]);

  const getAdjustedStep = useCallback(() => {
    let adjusted = step;
    if (step > 3) {
      if (!shouldShowTimesPerDay && !shouldShowWeekDays && !shouldShowCycle && step > 3) adjusted++;
      if (shouldShowWeekDays && !shouldShowTimesPerDay && step > 4) adjusted++;
      if (!shouldShowWeekDays && shouldShowTimesPerDay && step > 4) adjusted++;
      if (shouldShowCycle && step > 4) adjusted++;
    }
    return adjusted;
  }, [step, shouldShowTimesPerDay, shouldShowWeekDays, shouldShowCycle]);

  const handleNext = useCallback(() => {
    if (step === 3) {
      if (!shouldShowTimesPerDay && !shouldShowWeekDays && !shouldShowCycle) {
        setStep(5); // Skip to time selection
      } else {
        setStep(step + 1);
      }
    } else {
      setStep(step + 1);
    }
  }, [step, shouldShowTimesPerDay, shouldShowWeekDays, shouldShowCycle]);

  const handleBack = useCallback(() => {
    if (step > 1) {
      if (step === 5 && !shouldShowTimesPerDay && !shouldShowWeekDays && !shouldShowCycle) {
        setStep(3); // Skip back over step 4
      } else {
        setStep(step - 1);
      }
    }
  }, [step, shouldShowTimesPerDay, shouldShowWeekDays, shouldShowCycle]);

  return {
    step,
    totalSteps: getTotalSteps(),
    adjustedStep: getAdjustedStep(),
    handleNext,
    handleBack,
    setStep,
  };
}