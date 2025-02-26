export interface Medication {
  id: string;
  medicationId: string;
  time: string;
  name: string;
  dosage: string;
  color: string;
  icon: string;
  status?: 'pending' | 'taken' | 'skipped';
  date: string; // YYYY-MM-DD format
}

export const INITIAL_MEDICATIONS: Medication[] = [];