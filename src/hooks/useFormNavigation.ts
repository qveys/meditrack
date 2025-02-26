import { useState, useCallback } from 'react';
import { MedicationForm } from '../types';

interface UseFormNavigationProps {
  formData: MedicationForm;
}

export function useFormNavigation({ formData }: UseFormNavigationProps) {
  const [step, setStep] = useState(1);

  // Extraire les conditions fréquemment utilisées
  const isFrequencyCycle = formData.frequency === 'Cycle récurrent';
  const isTimesPerDayCycle = formData.timesPerDay === 'Cycle récurrent';
  const isMoreThan3Times = formData.timesPerDay === 'Plus de 3 fois par jour';
  const isHourlyInterval = formData.timesPerDay === 'Toutes les x heures';
  const isStandardCycle = (isFrequencyCycle || isTimesPerDayCycle) && 
    formData.cycleLength === 28 && formData.cycleFrequency === 0;

  const getTotalSteps = useCallback(() => {
    // Déterminer le nombre total d'étapes en fonction du type de traitement
    if (isFrequencyCycle || isTimesPerDayCycle || isMoreThan3Times || isHourlyInterval) {
      if (!isStandardCycle && isTimesPerDayCycle) return 9;
      if (!isStandardCycle && isFrequencyCycle) return 8;
      return 7;
    }
    return 6;
  }, [isFrequencyCycle, isTimesPerDayCycle, isMoreThan3Times, isHourlyInterval, isStandardCycle]);

  const getAdjustedStep = useCallback(() => {
    if (!isFrequencyCycle && !isTimesPerDayCycle) return step;

    // Ajuster l'étape pour les cycles standards (28+0)
    if (isStandardCycle) {
      const stepMapping = {
        5: 5, // CycleStep
        6: 6, // TimeAndDose
        7: 7, // Additional
      };
      return stepMapping[step] || step;
    }

    return step;
  }, [step, isFrequencyCycle, isTimesPerDayCycle, isStandardCycle]);

  const handleNext = useCallback(() => {
    setStep(prev => prev + 1);
  }, []);

  const handleBack = useCallback(() => {
    setStep(prev => Math.max(1, prev - 1));
  }, []);

  return {
    step,
    totalSteps: getTotalSteps(),
    adjustedStep: getAdjustedStep(),
    handleNext,
    handleBack,
    setStep,
  };
}