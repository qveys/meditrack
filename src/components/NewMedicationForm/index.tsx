import React from 'react';
import { useFormNavigation } from './hooks/useFormNavigation';
import { useFormSubmission } from './hooks/useFormSubmission';
import { FormLayout } from './components/FormLayout';
import {
  NameStep,
  FormStep,
  FrequencyStep,
  CycleStep,
  WeekdaysStep,
  TimesPerDayStep,
  TimeAndDoseStep,
  AdditionalOptionsStep,
  IntervalStep,
  WeeklyIntervalStep,
  MonthlyIntervalStep,
  DatePickerStep,
} from './Steps';
import { ICON_OPTIONS, COLOR_OPTIONS } from '../../constants';
import type { MedicationForm } from './types';

interface NewMedicationFormProps {
  onClose: () => void;
  onAdd: (medication: {
    name: string;
    dosage: string;
    icon: string;
    color: string;
  }) => Promise<any>;
}

export function NewMedicationForm({ onClose, onAdd }: NewMedicationFormProps) {
  const [formData, setFormData] = React.useState<MedicationForm>({
    name: '',
    form: '',
    frequency: '',
    timesPerDay: '',
    times: [{ time: '08:00', dose: '1' }],
    selectedDays: [],
    cycleLength: 21,
    cycleFrequency: 7,
    interval: 28,
    weekInterval: 2,
    monthInterval: 1,
    icon: ICON_OPTIONS[0],
    color: COLOR_OPTIONS[0],
  });

  const { step, totalSteps, adjustedStep, handleNext, handleBack } = useFormNavigation({ formData });
  const { error, isSubmitting, handleSubmit } = useFormSubmission({ onAdd, onClose, formData });

  const renderStep = () => {
    const props = { formData, setFormData };

    switch (adjustedStep) {
      case 1: return <NameStep {...props} />;
      case 2: return <FormStep {...props} />;
      case 3: return <FrequencyStep {...props} />;
      case 4:
        if (formData.frequency === 'Cycle récurrent') return <CycleStep {...props} />;
        if (formData.frequency === 'Certains jours de la semaine') return <WeekdaysStep {...props} />;
        if (formData.frequency === 'Un jour sur deux') return <DatePickerStep {...props} />;
        if (formData.frequency === 'Tous les X jours') return <IntervalStep {...props} />;
        if (formData.frequency === 'Toutes les X semaines') return <WeeklyIntervalStep {...props} />;
        if (formData.frequency === 'Tous les X mois') return <MonthlyIntervalStep {...props} />;
        if (formData.frequency === 'Chaque jour') return <TimesPerDayStep {...props} />;
        return null;
      case 5: return <TimeAndDoseStep {...props} />;
      case 6: return <AdditionalOptionsStep {...props} />;
      default: return null;
    }
  };

  const canProceed = () => {
    switch (adjustedStep) {
      case 1: return formData.name.trim().length > 0;
      case 2: return formData.form.length > 0;
      case 3: return formData.frequency.length > 0;
      case 4:
        if (formData.frequency === 'Certains jours de la semaine') return formData.selectedDays.length > 0;
        if (formData.frequency === 'Chaque jour') return formData.timesPerDay.length > 0;
        if (formData.frequency === 'Cycle récurrent') return formData.cycleLength > 0 && formData.cycleFrequency > 0;
        if (formData.frequency === 'Un jour sur deux') return !!formData.startDate;
        if (formData.frequency === 'Tous les X jours') return formData.interval > 0;
        if (formData.frequency === 'Toutes les X semaines') return formData.weekInterval > 0;
        if (formData.frequency === 'Tous les X mois') return formData.monthInterval > 0;
        return true;
      case 5: return formData.times.every(t => t.time && t.dose);
      default: return true;
    }
  };

  const footer = step < totalSteps ? (
    <button
      onClick={handleNext}
      disabled={!canProceed()}
      className={`w-full py-3 px-4 rounded-lg transition-colors duration-150 ${
        canProceed()
          ? 'bg-cyan-500 text-white hover:bg-cyan-600'
          : 'bg-gray-200 cursor-not-allowed'
      }`}
    >
      Suivant
    </button>
  ) : (
    <button
      onClick={handleSubmit}
      disabled={isSubmitting}
      className={`w-full py-3 px-4 rounded-lg transition-colors duration-150 ${
        isSubmitting
          ? 'bg-gray-200 cursor-not-allowed'
          : 'bg-cyan-500 text-white hover:bg-cyan-600'
      }`}
    >
      {isSubmitting ? 'Enregistrement...' : 'Enregistrer'}
    </button>
  );

  return (
    <FormLayout
      onClose={onClose}
      onBack={handleBack}
      currentStep={adjustedStep}
      totalSteps={totalSteps}
      footer={footer}
    >
      {error && (
        <div className="mb-4 p-3 rounded-lg bg-red-100 text-red-700">
          {error}
        </div>
      )}
      {renderStep()}
    </FormLayout>
  );
}