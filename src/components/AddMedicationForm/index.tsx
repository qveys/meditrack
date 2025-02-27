import React, { useState } from 'react';
import { X, ChevronDown } from 'lucide-react';
import { useTheme } from '../../ThemeContext';
import { useMedications } from '@/hooks/useMedications.ts';
import type { Medication } from '@/types/medication.ts';

interface AddMedicationFormProps {
  onClose: () => void;
  onAdd: (medicationId: string, date: string, time: string) => Promise<void>;
  selectedDate: string;
}

export function AddMedicationForm({ onClose, onAdd, selectedDate }: AddMedicationFormProps) {
  const { isDark } = useTheme();
  const { medications } = useMedications();
  const [selectedMedication, setSelectedMedication] = useState<Medication | null>(null);
  const [date, setDate] = useState(selectedDate);
  const [time, setTime] = useState('09:00');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Get unique medications
  const uniqueMedications = medications.reduce((acc, med) => {
    if (!acc[med.medicationId]) {
      acc[med.medicationId] = med;
    }
    return acc;
  }, {} as Record<string, Medication>);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMedication || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await onAdd(selectedMedication.medicationId, date, time);
      onClose();
    } catch (error) {
      console.error('Error adding reminder:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className={`w-full max-w-md rounded-lg shadow-lg transition-colors duration-150 ${
            isDark ? 'bg-gray-800' : 'bg-white'
        }`}>
          <div className="p-4 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Add Reminder</h2>
              <button
                  type="button"
                  onClick={onClose}
                  className={`p-2 rounded-full transition-colors duration-150 ${
                      isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                  }`}
              >
                <X className="w-5 h-5"/>
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-4 space-y-4">
            <div className="relative">
              <label className="block text-sm font-medium mb-1">Select Medication</label>
              <button
                  type="button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className={`w-full p-3 rounded-md border transition-colors duration-150 flex items-center justify-between ${
                      isDark ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
                  }`}
              >
                {selectedMedication ? (
                    <div className="flex items-center gap-3">
                  <span className={`${selectedMedication.color} p-2 rounded-md`}>
                    {selectedMedication.icon}
                  </span>
                      <div className="text-left">
                        <div className="font-medium">{selectedMedication.name}</div>
                        <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                          {selectedMedication.dosage}
                        </div>
                      </div>
                    </div>
                ) : (
                    <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                  Choose a medication
                </span>
                )}
                <ChevronDown className={`w-5 h-5 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}/>
              </button>

              {isDropdownOpen && (
                  <div className={`absolute z-10 mt-1 w-full rounded-md shadow-lg ${
                      isDark ? 'bg-gray-700' : 'bg-white'
                  } max-h-48 overflow-auto`}>
                    {Object.values(uniqueMedications).length === 0 ? (
                        <div className="p-4 text-center text-sm text-gray-500">
                          No medications available. Please add a medication first.
                        </div>
                    ) : (
                        Object.values(uniqueMedications).map((medication) => (
                            <button
                                key={medication.medicationId}
                                type="button"
                                onClick={() => {
                                  setSelectedMedication(medication);
                                  setIsDropdownOpen(false);
                                }}
                                className={`w-full p-3 flex items-center gap-3 transition-colors duration-150 ${
                                    isDark
                                        ? 'hover:bg-gray-600'
                                        : 'hover:bg-gray-100'
                                }`}
                            >
                      <span className={`${medication.color} p-2 rounded-md`}>
                        {medication.icon}
                      </span>
                              <div className="text-left">
                                <div className="font-medium">{medication.name}</div>
                                <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                  {medication.dosage}
                                </div>
                              </div>
                            </button>
                        ))
                    )}
                  </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Date</label>
                <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className={`w-full p-2 rounded-md border transition-colors duration-150 ${
                        isDark ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
                    }`}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Time</label>
                <input
                    type="time"
                    required
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className={`w-full p-2 rounded-md border transition-colors duration-150 ${
                        isDark ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
                    }`}
                />
              </div>
            </div>

            <button
                type="submit"
                disabled={!selectedMedication || isSubmitting}
                className={`w-full py-2 px-4 rounded-md transition-colors duration-150 ${
                    selectedMedication && !isSubmitting
                        ? 'bg-cyan-500 text-white hover:bg-cyan-600'
                        : `${isDark ? 'bg-gray-700' : 'bg-gray-200'} cursor-not-allowed`
                }`}
            >
              {isSubmitting ? 'Adding...' : 'Add Reminder'}
            </button>
          </form>
        </div>
      </div>
  );
}