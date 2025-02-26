import { useState, useCallback } from 'react';
import { MedicationForm } from '../types';
import { ICON_OPTIONS, COLOR_OPTIONS } from '../../../constants';
import { generateDefaultTimes } from '../utils/timeUtils';

const initialFormState: MedicationForm = {
  name: '',
  form: '',
  frequency: '',
  timesPerDay: '',
  times: [{ time: '08:00', dose: '1' }],
  selectedDays: [],
  cycleLength: 21,
  cycleFrequency: 7,
  interval: 2,
  weekInterval: 2,
  monthInterval: 1,
  customTimes: 4,
  icon: ICON_OPTIONS[0],
  color: COLOR_OPTIONS[0],
  startDate: new Date().toISOString().split('T')[0],
};

export function useFormState() {
  const [formData, setFormData] = useState<MedicationForm>(initialFormState);

  const updateFormData = useCallback((updates: Partial<MedicationForm>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  }, []);

  const resetForm = useCallback(() => {
    setFormData(initialFormState);
  }, []);

  const updateFrequency = useCallback((frequency: string) => {
    const updates: Partial<MedicationForm> = { frequency };

    // Réinitialiser les champs liés à la fréquence
    if (formData.frequency === 'Chaque jour' && frequency !== 'Chaque jour') {
      updates.timesPerDay = '';
    } else if (formData.frequency === 'Certains jours de la semaine' && frequency !== 'Certains jours de la semaine') {
      updates.selectedDays = [];
    } else if (frequency === 'Cycle récurrent') {
      updates.cycleLength = 21;
      updates.cycleFrequency = 7;
    }

    updateFormData(updates);
  }, [formData.frequency, updateFormData]);

  const updateTimesPerDay = useCallback((option: string) => {
    const times = generateDefaultTimes(option);
    updateFormData({ timesPerDay: option, times });
  }, [updateFormData]);

  const updateCycleOptions = useCallback((treatment: number, pause: number) => {
    updateFormData({
      cycleLength: treatment,
      cycleFrequency: pause,
      times: [{ time: '08:00', dose: '1' }]
    });
  }, [updateFormData]);

  const updateTreatmentDuration = useCallback((option: 'days' | 'endDate' | 'ongoing', duration?: number) => {
    updateFormData({
      treatmentDurationOption: option,
      treatmentDuration: duration,
      mustShowCustomDuration: option === 'days' && !duration
    });
  }, [updateFormData]);

  return {
    formData,
    updateFormData,
    resetForm,
    updateFrequency,
    updateTimesPerDay,
    updateCycleOptions,
    updateTreatmentDuration,
  };
}