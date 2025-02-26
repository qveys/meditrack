import React from 'react';
import { useFormNavigation } from './hooks/useFormNavigation';
import { useFormSubmission } from './hooks/useFormSubmission';
import { FormLayout } from './components/FormLayout';
import {
  NameStep,
  FormStep,
  FrequencyStep,
  CycleStep,
  CycleOptionsStep,
  CustomTimesStep,
  PlaceboStep,
  WeekdaysStep,
  TimesPerDayStep,
  TimeAndDoseStep,
  AdditionalOptionsStep,
  IntervalTimesStep,
  DailyIntervalStep,
  WeeklyIntervalStep,
  MonthlyIntervalStep,
  DatePickerStep,
  RemainingPillsStep,
  RenewalReminderStep,
  TreatmentDurationStep,
  TreatmentEndDateStep,
  TreatmentStartDateStep,
  CustomDurationStep,
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
    interval: 2,
    weekInterval: 2,
    monthInterval: 1,
    customTimes: 4,
    icon: ICON_OPTIONS[0],
    color: COLOR_OPTIONS[0],
    startDate: new Date().toISOString().split('T')[0],
  });

  const { step, totalSteps, adjustedStep, handleNext, handleBack } = useFormNavigation({ formData });
  const { error, isSubmitting, handleSubmit } = useFormSubmission({ onAdd, onClose, formData });

  const renderStep = () => {
    const props = { formData, setFormData };

    // Si on a cliqué sur "Définir la durée de traitement"
    if (formData.showTreatmentStartDate) {
      if (formData.showTreatmentDuration) {
        if (formData.showTreatmentEndDate) {
          return <TreatmentEndDateStep {...props} />;
        }
        if (formData.showCustomDuration) {
          return <CustomDurationStep {...props} />;
        }
        return <TreatmentDurationStep {...props} />;
      }
      return <TreatmentStartDateStep {...props} />;
    }

    if (formData.showRemainingPills) {
      if (formData.showRenewalReminder) {
        return <RenewalReminderStep {...props} />;
      }
      return <RemainingPillsStep {...props} />;
    }

    switch (adjustedStep) {
      case 1: return <NameStep {...props} />;
      case 2: return <FormStep {...props} />;
      case 3: return <FrequencyStep {...props} />;
      case 4:
        if (formData.frequency === 'Cycle récurrent') return <CycleOptionsStep {...props} />;
        if (formData.frequency === 'Certains jours de la semaine') return <WeekdaysStep {...props} />;
        if (formData.frequency === 'Un jour sur deux') return <DatePickerStep {...props} />;
        if (formData.frequency === 'Tous les X jours') return <DailyIntervalStep {...props} />;
        if (formData.frequency === 'Toutes les X semaines') return <WeeklyIntervalStep {...props} />;
        if (formData.frequency === 'Tous les X mois') return <MonthlyIntervalStep {...props} />;
        return <TimesPerDayStep {...props} />;
      case 5:
        if (formData.timesPerDay === 'Cycle récurrent') {
          return <CycleOptionsStep {...props} />;
        } else if (formData.timesPerDay === 'Plus de 3 fois par jour') {
          return <CustomTimesStep {...props} />;
        } else if (formData.timesPerDay === 'Toutes les x heures') {
          return <IntervalTimesStep {...props} />;
        }
        
        if (formData.frequency === 'Cycle récurrent') {
          if (formData.cycleLength === 28 && formData.cycleFrequency === 0) {
            return <CycleStep {...props} />;
          }
          return <PlaceboStep {...props} />;
        }
        
        return <TimeAndDoseStep {...props} />;
      case 6:
        if (formData.timesPerDay === 'Cycle récurrent') {
          if (formData.cycleLength === 28 && formData.cycleFrequency === 0) {
            return <CycleStep {...props} />;
          }
          return <PlaceboStep {...props} />;
        } else if (formData.timesPerDay === 'Plus de 3 fois par jour' || formData.timesPerDay === 'Toutes les x heures') {
          return <TimeAndDoseStep {...props} />;
        }

        if (formData.frequency === 'Cycle récurrent') {
          if (formData.cycleLength !== 28) {
            return <CycleStep {...props} />;
          }
          return <TimeAndDoseStep {...props} />;
        }
        
        return <AdditionalOptionsStep {...props} />;
      case 7:
        if (formData.timesPerDay === 'Cycle récurrent') {
          if (formData.cycleLength !== 28) {
            return <CycleStep {...props} />;
          }
          return <TimeAndDoseStep {...props} />;
        }

        if (formData.frequency === 'Cycle récurrent') {
          if (formData.cycleLength !== 28) {
            return <TimeAndDoseStep {...props} />;
          }
        }
        
        return <AdditionalOptionsStep {...props} />;
      case 8:
        if (formData.timesPerDay === 'Cycle récurrent' && formData.cycleLength !== 28) {
          return <TimeAndDoseStep {...props} />;
        }

        if (formData.frequency === 'Cycle récurrent' && formData.cycleLength !== 28) {
          return <AdditionalOptionsStep {...props} />;
        }
        return null;
      case 9:
        if (formData.timesPerDay === 'Cycle récurrent' && formData.cycleLength !== 28) {
          return <AdditionalOptionsStep {...props} />;
        }        
        return null;
      default: return null;
    }
  };

  const canProceed = () => {
    // Si on est sur les étapes de durée de traitement
    if (formData.showTreatmentDuration) {
      if (formData.showTreatmentEndDate) {
        return !!formData.endDate;
      }
      if (formData.showCustomDuration) {
        return !!formData.treatmentDuration && formData.treatmentDuration > 0;
      }
      return !!formData.treatmentDurationOption;
    }

   if (formData.showRemainingPills) {
      if (formData.showRenewalReminder) {
        return !!formData.renewalReminderCount;
      }
      return !!formData.remainingPills;
    }

    switch (adjustedStep) {
      case 1: return formData.name.trim().length > 0;
      case 2: return formData.form.length > 0;
      case 3: return formData.frequency.length > 0;
      case 4:
        if (formData.frequency === 'Cycle récurrent') return true;
        if (formData.frequency === 'Certains jours de la semaine') return formData.selectedDays.length > 0;
        if (formData.frequency === 'Un jour sur deux') return true;
        if (formData.frequency === 'Tous les X jours') return formData.interval >= 2 && formData.interval <= 60;
        if (formData.frequency === 'Toutes les X semaines') return formData.weekInterval > 0;
        if (formData.frequency === 'Tous les X mois') return formData.monthInterval > 0;
        return formData.timesPerDay.length > 0;
      case 5:
        if (formData.timesPerDay === 'Cycle récurrent') {
          return true;
        } else if (formData.timesPerDay === 'Plus de 3 fois par jour') {
          return formData.customTimes > 0;
        }
        
        if (formData.frequency === 'Cycle récurrent') {
          if (formData.cycleLength === 28 && formData.cycleFrequency === 0) {
            return true; // CycleStep
          }
          return typeof formData.usePlacebo === 'boolean'; // PlaceboStep
        }
        
        return formData.times.every(t => t.time && t.dose);
      case 6:
        if (formData.timesPerDay === 'Cycle récurrent') {
          if (formData.cycleLength === 28 && formData.cycleFrequency === 0) {
            return true; // CycleStep
          }
          return typeof formData.usePlacebo === 'boolean'; // PlaceboStep
        } else if (formData.timesPerDay === 'Plus de 3 fois par jour') {
          return formData.times.every(t => t.time && t.dose); //TimeAndDoseStep
        }

        if (formData.frequency === 'Cycle récurrent') {
          if (formData.cycleLength !== 28) {
            return true; // CycleStep
          }
          return formData.times.every(t => t.time && t.dose); //TimeAndDoseStep
        }
        
        return true; // AdditionalOptionsStep
      case 7:
        if (formData.timesPerDay === 'Cycle récurrent') {
          if (formData.cycleLength !== 28) {
             return true; // CycleStep
          }
          return formData.times.every(t => t.time && t.dose); //TimeAndDoseStep
        }

        if (formData.frequency === 'Cycle récurrent') {
          if (formData.cycleLength !== 28) {
            return formData.times.every(t => t.time && t.dose); //TimeAndDoseStep
          }
        }

        return true;
       case 8:
        if (formData.timesPerDay === 'Cycle récurrent' && formData.cycleLength !== 28) {
          return formData.times.every(t => t.time && t.dose); //TimeAndDoseStep
        }
        return true;
      case 9: return true;
      default: return true;
    }
  };

  const handleNextStep = () => {
    // Si on est sur les étapes de durée de traitement
    if (formData.showTreatmentStartDate) {
      if (formData.showTreatmentDuration) {
        if (formData.showTreatmentEndDate) {
          setFormData({ ...formData, showTreatmentStartDate: false, showTreatmentDuration: false, showCustomDuration: false, showTreatmentEndDate: false });
        } else if (formData.treatmentDurationOption === 'days' && !formData.showCustomDuration && formData.mustShowCustomDuration) {
          setFormData({ ...formData, showCustomDuration: true });
        } else if (formData.treatmentDurationOption === 'endDate') {
          setFormData({ ...formData, showTreatmentEndDate: true });
        } else {
          setFormData({ ...formData, showTreatmentStartDate: false, showTreatmentDuration: false, showCustomDuration: false });
        }
      } else {
        setFormData({ ...formData, showTreatmentDuration: true });
      }
      return;
    }

    if (formData.showRemainingPills) {
      if (formData.showRenewalReminder) {
        setFormData({ ...formData, showRenewalReminder: false, showRemainingPills: false });
      } else {
        setFormData({ ...formData, showRenewalReminder: true });
      }
      return;
    }
    
    handleNext();
  };

  const handleBackStep = () => {
    // Si on est sur les étapes de durée de traitement
    if (formData.showTreatmentStartDate) {
      if (formData.showTreatmentDuration) {
        if (formData.showTreatmentEndDate) {
          setFormData({ ...formData, showTreatmentEndDate: false, treatmentDurationOption: null });
        } else if (formData.showCustomDuration) {
          setFormData({ ...formData, showCustomDuration: false, treatmentDurationOption: null, treatmentDuration: null });
        } else {
          setFormData({ ...formData, showTreatmentDuration: false });
        }
      } else {
        setFormData({ ...formData, showTreatmentStartDate: false });
      }
      return;
    }

    if (formData.showRemainingPills) {
      if (formData.showRenewalReminder) {
        setFormData({ ...formData, showRenewalReminder: false });
      } else {
        setFormData({ ...formData, showRemainingPills: false });
      }
      return;
    }

    handleBack();
  };

  const footer = (
    <button
      onClick={adjustedStep === totalSteps && !formData.showTreatmentStartDate && !formData.showTreatmentDuration && !formData.showTreatmentEndDate && !formData.showCustomDuration && !formData.showRenewalReminder && !formData.showRemainingPills ? handleSubmit : handleNextStep}
      disabled={!canProceed() || (adjustedStep === totalSteps && isSubmitting)}
      className={`w-full py-3 px-4 rounded-lg transition-colors duration-150 ${
        !canProceed() || (adjustedStep === totalSteps && isSubmitting)
          ? 'bg-gray-200 cursor-not-allowed'
          : 'bg-cyan-500 text-white hover:bg-cyan-600'
      }`}
    >
      {adjustedStep === totalSteps && !formData.showTreatmentStartDate && !formData.showTreatmentDuration && !formData.showTreatmentEndDate && !formData.showCustomDuration && !formData.showRenewalReminder && !formData.showRemainingPills
        ? (isSubmitting ? 'Enregistrement...' : 'Enregistrer')
        : 'Suivant'
      }
    </button>
  );

  return (
    <FormLayout
      onClose={onClose}
      onBack={handleBackStep}
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