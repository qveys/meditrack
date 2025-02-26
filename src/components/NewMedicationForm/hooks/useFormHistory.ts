import { useState, useCallback } from 'react';
import { MedicationForm } from '../types';

interface FormHistoryEntry {
  formData: MedicationForm;
  step: number;
  timestamp: number;
}

export function useFormHistory() {
  const [history, setHistory] = useState<FormHistoryEntry[]>([]);
  const [currentIndex, setCurrentIndex] = useState(-1);

  const addToHistory = useCallback((formData: MedicationForm, step: number) => {
    setHistory(prev => {
      // Remove any future history if we're not at the end
      const newHistory = prev.slice(0, currentIndex + 1);
      return [...newHistory, {
        formData: JSON.parse(JSON.stringify(formData)), // Deep clone
        step,
        timestamp: Date.now()
      }];
    });
    setCurrentIndex(prev => prev + 1);
  }, [currentIndex]);

  const undo = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      return history[currentIndex - 1];
    }
    return null;
  }, [currentIndex, history]);

  const redo = useCallback(() => {
    if (currentIndex < history.length - 1) {
      setCurrentIndex(prev => prev + 1);
      return history[currentIndex + 1];
    }
    return null;
  }, [currentIndex, history]);

  const canUndo = currentIndex > 0;
  const canRedo = currentIndex < history.length - 1;

  return {
    addToHistory,
    undo,
    redo,
    canUndo,
    canRedo,
  };
}