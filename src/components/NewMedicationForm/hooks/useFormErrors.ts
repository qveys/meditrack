import { useState, useCallback } from 'react';

interface FormError {
  field: string;
  message: string;
}

export function useFormErrors() {
  const [errors, setErrors] = useState<FormError[]>([]);

  const addError = useCallback((field: string, message: string) => {
    setErrors(prev => [...prev, { field, message }]);
  }, []);

  const removeError = useCallback((field: string) => {
    setErrors(prev => prev.filter(error => error.field !== field));
  }, []);

  const clearErrors = useCallback(() => {
    setErrors([]);
  }, []);

  const hasError = useCallback((field: string) => {
    return errors.some(error => error.field === field);
  }, [errors]);

  const getError = useCallback((field: string) => {
    return errors.find(error => error.field === field)?.message;
  }, [errors]);

  return {
    errors,
    addError,
    removeError,
    clearErrors,
    hasError,
    getError,
  };
}