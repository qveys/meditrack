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
  startDate?: string;
  icon: string;
  color: string;
  additionalInstructions?: string;
  treatmentDuration?: string;
  renewalReminder?: boolean;
}

export interface StepProps {
  formData: MedicationForm;
  setFormData: (data: MedicationForm) => void;
}

export interface FormStep {
  component: React.ComponentType<StepProps>;
  canProceed: (formData: MedicationForm) => boolean;
}