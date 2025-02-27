import { useCallback } from 'react';

interface FormAnalytics {
  stepStartTime: number;
  stepCompletionTimes: Record<number, number>;
  totalErrors: number;
  fieldInteractions: Record<string, number>;
}

export function useFormAnalytics() {
  const analytics: FormAnalytics = {
    stepStartTime: Date.now(),
    stepCompletionTimes: {},
    totalErrors: 0,
    fieldInteractions: {},
  };

  const trackStepCompletion = useCallback((step: number) => {
    analytics.stepCompletionTimes[step] = Date.now() - analytics.stepStartTime;
    analytics.stepStartTime = Date.now();
  }, []);

  const trackError = useCallback(() => {
    analytics.totalErrors++;
  }, []);

  const trackFieldInteraction = useCallback((field: string) => {
    analytics.fieldInteractions[field] = (analytics.fieldInteractions[field] || 0) + 1;
  }, []);

  const getAnalytics = useCallback(() => {
    return {
      averageStepTime: Object.values(analytics.stepCompletionTimes).reduce((a, b) => a + b, 0) / Object.keys(analytics.stepCompletionTimes).length,
      totalErrors: analytics.totalErrors,
      mostInteractedField: Object.entries(analytics.fieldInteractions).reduce((a, b) => a[1] > b[1] ? a : b)[0],
      stepCompletionTimes: analytics.stepCompletionTimes,
    };
  }, []);

  return {
    trackStepCompletion,
    trackError,
    trackFieldInteraction,
    getAnalytics,
  };
}