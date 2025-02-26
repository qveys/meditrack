export interface MedicationForm {
  name: string;
  form: string;
  frequency: string;
  timesPerDay: string;
  times: { time: string; dose: string }[];
  selectedDays: string[];
  cycleLength: number;
  cycleFrequency: number;
  interval: number;
  weekInterval: number;
  monthInterval: number;
  customTimes: number;
  startDate?: string;
  endDate?: string;
  treatmentDuration?: number;
  icon: string;
  color: string;
  additionalInstructions?: string;
  treatmentDurationOption?: 'days' | 'endDate' | 'ongoing';
  showTreatmentDuration?: boolean;
  showTreatmentDurationEndDate?: boolean;
  showCustomDuration?: boolean;
  showRenewalReminder?: boolean;
  showInstructions?: boolean;
  showIconPicker?: boolean;
  usePlacebo?: boolean;
}

export interface StepProps {
  formData: MedicationForm;
  setFormData: (data: MedicationForm) => void;
}

export interface FormStep {
  component: React.ComponentType<StepProps>;
  canProceed: (formData: MedicationForm) => boolean;
}