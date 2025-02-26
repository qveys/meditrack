import { useState, useCallback } from 'react';
import { MedicationForm } from '../types';

interface UseFormNavigationProps {
  formData: MedicationForm;
}

export function useFormNavigation({ formData }: UseFormNavigationProps) {
  const [step, setStep] = useState(1);

  const isFrequencyCycleRecurrent = formData.frequency === 'Cycle récurrent';
  const isTimesPerDayCycleRecurrent = formData.timesPerDay === 'Cycle récurrent';
  const isTimesPerDayPlusDe3Fois = formData.timesPerDay === 'Plus de 3 fois par jour';
  const isTimesPerDayToutesHeures = formData.timesPerDay === 'Toutes les x heures';
  const isStandardCycle = (isFrequencyCycleRecurrent || isTimesPerDayCycleRecurrent) && formData.cycleLength === 28 && formData.cycleFrequency === 0;

  const getTotalSteps = useCallback(() => {
    if (isFrequencyCycleRecurrent || isTimesPerDayCycleRecurrent || isTimesPerDayPlusDe3Fois || isTimesPerDayToutesHeures) {
      return !isStandardCycle && isTimesPerDayCycleRecurrent ? 9 : (!isStandardCycle && isFrequencyCycleRecurrent ? 8 : 7);
    }
    return 6; // Étapes par défaut
  }, [isFrequencyCycleRecurrent, isTimesPerDayCycleRecurrent, isTimesPerDayPlusDe3Fois, isTimesPerDayToutesHeures, isStandardCycle]);

  const getAdjustedStep = useCallback(() => {
    if (!isFrequencyCycleRecurrent && !isTimesPerDayCycleRecurrent) return step;

    // Pour le cycle 28+0:
    // 1. Name
    // 2. Form
    // 3. Frequency
    // 4. CycleOptions
    // 5. CycleStep
    // 6. TimeAndDose
    // 7. Additional

    if (isStandardCycle) {
      switch (step) {
        case 5: return 5; // CycleStep
        case 6: return 6; // TimeAndDose
        case 7: return 7; // Additional
        default: return step;
      }
    }

    return step;
  }, [step, isFrequencyCycleRecurrent, isTimesPerDayCycleRecurrent, isStandardCycle]);

  const handleNext = useCallback(() => {
    setStep(step + 1);
  }, [step]);

  const handleBack = useCallback(() => {
    if (step > 1) {
      setStep(step - 1);
    }
  }, [step]);

  return {
    step,
    totalSteps: getTotalSteps(),
    adjustedStep: getAdjustedStep(),
    handleNext,
    handleBack,
    setStep,
  };
}