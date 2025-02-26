import { useCallback } from 'react';
import { MedicationForm } from '../types';
import { generateDefaultTimes, generateTimeSlots, generateHourlyIntervalTimes } from '../utils/timeUtils';

export function useFormActions() {
  const handleFrequencyChange = useCallback((
    frequency: string,
    formData: MedicationForm,
    updateFormData: (data: Partial<MedicationForm>) => void
  ) => {
    const updates: Partial<MedicationForm> = { frequency };

    if (formData.frequency === 'Chaque jour' && frequency !== 'Chaque jour') {
      updates.timesPerDay = '';
    } else if (formData.frequency === 'Certains jours de la semaine' && frequency !== 'Certains jours de la semaine') {
      updates.selectedDays = [];
    } else if (frequency === 'Cycle récurrent') {
      updates.cycleLength = 21;
      updates.cycleFrequency = 7;
      updates.times = [{ time: '08:00', dose: '1' }];
    }

    updateFormData(updates);
  }, []);

  const handleTimesPerDayChange = useCallback((
    option: string,
    updateFormData: (data: Partial<MedicationForm>) => void
  ) => {
    const times = generateDefaultTimes(option);
    updateFormData({ timesPerDay: option, times });
  }, []);

  const handleCustomTimesChange = useCallback((
    count: number,
    updateFormData: (data: Partial<MedicationForm>) => void
  ) => {
    const times = generateTimeSlots(count);
    updateFormData({ customTimes: count, times });
  }, []);

  const handleHourlyIntervalChange = useCallback((
    interval: number,
    updateFormData: (data: Partial<MedicationForm>) => void
  ) => {
    const times = generateHourlyIntervalTimes(interval);
    updateFormData({ interval, times });
  }, []);

  return {
    handleFrequencyChange,
    handleTimesPerDayChange,
    handleCustomTimesChange,
    handleHourlyIntervalChange,
  };
}