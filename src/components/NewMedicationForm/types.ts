import React from "react";

export interface MedicationBasicInfo {
  name: string;
  form: string;
  color: string;
  icon: string;
  additionalInstructions?: string;
}

export interface MedicationSchedule extends MedicationBasicInfo {
  customTimes: number;
  cycleFrequency: number;
  cycleLength: number;
  frequency: string;
  interval: number;
  monthInterval: number;
  selectedDays: string[];
  times: Array<{ time: string; dose: string }>;
  timesPerDay: string;
  weekInterval: number;
}

export interface MedicationForm extends MedicationSchedule {
  // Propriétés de base héritées de MedicationBasicInfo

  // Dates et durée
  startDate?: string;
  endDate?: string;
  treatmentDuration?: number;
  treatmentDurationOption?: 'days' | 'endDate' | 'ongoing';

  // Gestion des pilules et renouvellement
  remainingPills?: number;
  renewalReminderCount?: number;
  usePlacebo?: boolean;

  // Drapeaux d'affichage (maintenus au niveau racine pour compatibilité)
  showAdditionalInstructions?: boolean;
  showCustomDuration?: boolean;
  showCycleFrequency?: boolean;
  showCycleLength?: boolean;
  showEndDate?: boolean;
  showIconPicker?: boolean;
  showInstructions?: boolean;
  showInterval?: boolean;
  showMonthInterval?: boolean;
  showMustShowCustomDuration?: boolean;
  showRemainingPills?: boolean;
  showRenewalReminder?: boolean;
  showStartDate?: boolean;
  showTreatmentDuration?: boolean;
  showTreatmentDurationEndDate?: boolean;
  showTreatmentDurationOption?: boolean;
  showTreatmentEndDate?: boolean;
  showTreatmentStartDate?: boolean;
  showWeekInterval?: boolean;
  mustShowCustomDuration?: boolean;
}


export interface StepProps {
  formData: MedicationForm;
  setFormData: (data: MedicationForm) => void;
}

export interface FormStep {
  component: React.ComponentType<StepProps>;
  canProceed: (formData: MedicationForm) => boolean;
}