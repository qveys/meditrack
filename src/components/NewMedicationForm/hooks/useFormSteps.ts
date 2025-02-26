import { useCallback } from 'react';
import { MedicationForm } from '../types';

export function useFormSteps() {
  const getTotalSteps = useCallback((formData: MedicationForm): number => {
    const isFrequencyCycle = formData.frequency === 'Cycle récurrent';
    const isTimesPerDayCycle = formData.timesPerDay === 'Cycle récurrent';
    const isMoreThan3Times = formData.timesPerDay === 'Plus de 3 fois par jour';
    const isHourlyInterval = formData.timesPerDay === 'Toutes les x heures';
    const isStandardCycle = (isFrequencyCycle || isTimesPerDayCycle) && 
      formData.cycleLength === 28 && formData.cycleFrequency === 0;

    if (isFrequencyCycle || isTimesPerDayCycle || isMoreThan3Times || isHourlyInterval) {
      if (!isStandardCycle && isTimesPerDayCycle) return 9;
      if (!isStandardCycle && isFrequencyCycle) return 8;
      return 7;
    }
    return 6;
  }, []);

  const getAdjustedStep = useCallback((step: number, formData: MedicationForm): number => {
    const isFrequencyCycle = formData.frequency === 'Cycle récurrent';
    const isTimesPerDayCycle = formData.timesPerDay === 'Cycle récurrent';
    const isStandardCycle = (isFrequencyCycle || isTimesPerDayCycle) && 
      formData.cycleLength === 28 && formData.cycleFrequency === 0;

    if (!isFrequencyCycle && !isTimesPerDayCycle) return step;

    if (isStandardCycle) {
      const stepMapping = {
        5: 5, // CycleStep
        6: 6, // TimeAndDose
        7: 7, // Additional
      };
      return stepMapping[step] || step;
    }

    return step;
  }, []);

  return {
    getTotalSteps,
    getAdjustedStep,
  };
}