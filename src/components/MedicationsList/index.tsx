import React, { useState } from 'react';
import { useTheme } from '../../ThemeContext';
import { useMedications } from '../../hooks/useMedications';
import { Edit2, Trash2, Plus } from 'lucide-react';
import { EditMedicationForm } from '../EditMedicationForm';
import { NewMedicationForm } from '../NewMedicationForm/index';
import type { Medication } from '../../types/medication';

export function MedicationsList() {
  const { isDark } = useTheme();
  const { medications, updateMedication, deleteMedication, addMedication } = useMedications();
  const [editingMedication, setEditingMedication] = useState<Medication | null>(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState<string | null>(null);
  const [showNewMedForm, setShowNewMedForm] = useState(false);

  // Group medications by medicationId to get unique medications
  const uniqueMedications = medications.reduce((acc, med) => {
    if (!acc[med.medicationId]) {
      acc[med.medicationId] = med;
    }
    return acc;
  }, {} as Record<string, Medication>);

  const handleDelete = async (medicationId: string) => {
    const { error } = await deleteMedication(medicationId);
    if (!error) {
      setDeleteConfirmation(null);
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-150 ${
      isDark ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
    }`}>
      <header className={`p-4 transition-colors duration-150 ${
        isDark ? 'bg-gray-800' : 'bg-white'
      } shadow-md`}>
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">My Medications</h1>
          <button
            onClick={() => setShowNewMedForm(true)}
            className="p-2 rounded-full bg-cyan-500 text-white hover:bg-cyan-600 transition-colors duration-150"
            aria-label="Add new medication"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </header>

      <main className="p-4 pb-24">
        <div className="space-y-4">
          {Object.values(uniqueMedications).length === 0 ? (
            <div className={`text-center py-8 ${
              isDark ? 'text-gray-400' : 'text-gray-500'
            }`}>
              No medications added yet
            </div>
          ) : (
            Object.values(uniqueMedications).map((medication) => (
              <div
                key={medication.medicationId}
                className={`rounded-lg shadow-sm transition-colors duration-150 ${
                  isDark ? 'bg-gray-800/30' : 'bg-white border border-gray-200'
                }`}
              >
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className={`${medication.color} p-2 rounded-md`}>
                        {medication.icon}
                      </span>
                      <div>
                        <h3 className="font-medium">{medication.name}</h3>
                        <p className={`text-sm ${
                          isDark ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          {medication.dosage}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setEditingMedication(medication)}
                        className={`p-2 rounded-full transition-colors duration-150 ${
                          isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                        }`}
                        aria-label="Edit medication"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setDeleteConfirmation(medication.medicationId)}
                        className={`p-2 rounded-full transition-colors duration-150 ${
                          isDark ? 'hover:bg-gray-700 text-red-400' : 'hover:bg-gray-100 text-red-500'
                        }`}
                        aria-label="Delete medication"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {deleteConfirmation === medication.medicationId && (
                  <div className={`p-4 border-t ${
                    isDark ? 'border-gray-700' : 'border-gray-200'
                  }`}>
                    <p className="text-sm mb-3">Are you sure you want to delete this medication? This will also delete all reminders associated with it.</p>
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => setDeleteConfirmation(null)}
                        className={`px-3 py-1 rounded-md text-sm transition-colors duration-150 ${
                          isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
                        }`}
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleDelete(medication.medicationId)}
                        className="px-3 py-1 rounded-md text-sm bg-red-500 text-white hover:bg-red-600 transition-colors duration-150"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </main>

      {editingMedication && (
        <EditMedicationForm
          medication={editingMedication}
          onClose={() => setEditingMedication(null)}
          onUpdate={updateMedication}
        />
      )}

      {showNewMedForm && (
        <NewMedicationForm
          onClose={() => setShowNewMedForm(false)}
          onAdd={addMedication}
        />
      )}
    </div>
  );
}