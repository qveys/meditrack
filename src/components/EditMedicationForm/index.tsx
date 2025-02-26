import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useTheme } from '../../ThemeContext';
import { ICON_OPTIONS, COLOR_OPTIONS } from '../../constants';
import type { Medication } from '../../types/medication';

interface EditMedicationFormProps {
  medication: Medication;
  onClose: () => void;
  onUpdate: (medicationId: string, updates: {
    name: string;
    dosage: string;
    icon: string;
    color: string;
  }) => Promise<{ error: any }>;
}

export function EditMedicationForm({ medication, onClose, onUpdate }: EditMedicationFormProps) {
  const { isDark } = useTheme();
  const [formData, setFormData] = useState({
    name: medication.name,
    dosage: medication.dosage,
    icon: medication.icon,
    color: medication.color,
  });
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const { error } = await onUpdate(medication.medicationId, formData);

    if (error) {
      setError('Failed to update medication. Please try again.');
      return;
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <form 
        onSubmit={handleSubmit}
        className={`w-full max-w-md rounded-lg shadow-lg transition-colors duration-150 ${
          isDark ? 'bg-gray-800' : 'bg-white'
        } max-h-[90vh] flex flex-col overflow-hidden`}
      >
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Edit Medication</h2>
            <button
              type="button"
              onClick={onClose}
              className={`p-2 rounded-full transition-colors duration-150 ${
                isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
              }`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto flex-1">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className={`w-full p-2 rounded-md border transition-colors duration-150 ${
                  isDark ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
                }`}
                placeholder="Medication name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Dosage</label>
              <input
                type="text"
                required
                value={formData.dosage}
                onChange={(e) => setFormData({...formData, dosage: e.target.value})}
                className={`w-full p-2 rounded-md border transition-colors duration-150 ${
                  isDark ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
                }`}
                placeholder="Dosage instructions"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Icon</label>
              <div className="flex gap-2 flex-wrap">
                {ICON_OPTIONS.map((icon) => (
                  <button
                    type="button"
                    key={icon}
                    onClick={() => setFormData({...formData, icon})}
                    className={`p-2 rounded-md transition-colors duration-150 ${
                      formData.icon === icon
                        ? 'bg-cyan-500 text-white'
                        : isDark
                        ? 'bg-gray-700 hover:bg-gray-600'
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    {icon}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Color</label>
              <div className="flex gap-2 flex-wrap">
                {COLOR_OPTIONS.map((color) => (
                  <button
                    type="button"
                    key={color}
                    onClick={() => setFormData({...formData, color})}
                    className={`w-8 h-8 rounded-full ${color} transition-transform duration-150 ${
                      formData.color === color ? 'scale-110 ring-2 ring-cyan-500' : ''
                    }`}
                  />
                ))}
              </div>
            </div>

            {error && (
              <div className="text-red-500 text-sm">{error}</div>
            )}
          </div>
        </div>

        <div className="p-6 border-t border-gray-200">
          <button
            type="submit"
            className="w-full py-2 px-4 bg-cyan-500 text-white rounded-md hover:bg-cyan-600 transition-colors duration-150"
          >
            Update Medication
          </button>
        </div>
      </form>
    </div>
  );
}