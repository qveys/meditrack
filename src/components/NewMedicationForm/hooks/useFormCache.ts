import { useCallback } from 'react';
import { MedicationForm } from '../types';

const CACHE_KEY = 'medication_form_cache';

export function useFormCache() {
  const saveToCache = useCallback((formData: MedicationForm) => {
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify(formData));
    } catch (error) {
      console.error('Error saving form data to cache:', error);
    }
  }, []);

  const loadFromCache = useCallback((): MedicationForm | null => {
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      return cached ? JSON.parse(cached) : null;
    } catch (error) {
      console.error('Error loading form data from cache:', error);
      return null;
    }
  }, []);

  const clearCache = useCallback(() => {
    try {
      localStorage.removeItem(CACHE_KEY);
    } catch (error) {
      console.error('Error clearing form cache:', error);
    }
  }, []);

  return {
    saveToCache,
    loadFromCache,
    clearCache,
  };
}