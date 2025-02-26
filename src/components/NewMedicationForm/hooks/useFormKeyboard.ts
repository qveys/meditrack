import { useEffect, useCallback } from 'react';

interface UseFormKeyboardProps {
  onNext: () => void;
  onBack: () => void;
  onUndo: () => void;
  onRedo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  isSubmitting: boolean;
}

export function useFormKeyboard({
  onNext,
  onBack,
  onUndo,
  onRedo,
  canUndo,
  canRedo,
  isSubmitting,
}: UseFormKeyboardProps) {
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    // Ignorer les raccourcis si on est en train de soumettre
    if (isSubmitting) return;

    // Ctrl/Cmd + Z pour annuler
    if ((event.ctrlKey || event.metaKey) && event.key === 'z' && !event.shiftKey && canUndo) {
      event.preventDefault();
      onUndo();
    }
    
    // Ctrl/Cmd + Shift + Z pour rétablir
    if ((event.ctrlKey || event.metaKey) && event.key === 'z' && event.shiftKey && canRedo) {
      event.preventDefault();
      onRedo();
    }

    // Enter pour passer à l'étape suivante
    if (event.key === 'Enter' && !event.ctrlKey && !event.metaKey) {
      event.preventDefault();
      onNext();
    }

    // Backspace pour revenir à l'étape précédente
    if (event.key === 'Backspace' && !event.ctrlKey && !event.metaKey) {
      const target = event.target as HTMLElement;
      // Ne pas revenir en arrière si on est dans un champ de saisie
      if (target.tagName !== 'INPUT' && target.tagName !== 'TEXTAREA') {
        event.preventDefault();
        onBack();
      }
    }
  }, [onNext, onBack, onUndo, onRedo, canUndo, canRedo, isSubmitting]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
}