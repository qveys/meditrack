import React from 'react';
import { Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTheme } from '@/ThemeContext.tsx';
import { StepProps } from '../types';

export function CustomTimesStep({ formData, setFormData }: StepProps) {
  const { isDark } = useTheme();
  const [selectedTimes, setSelectedTimes] = React.useState(formData.customTimes || 4);
  const [currentPage, setCurrentPage] = React.useState(() => {
    // Calculer la page initiale en fonction de la valeur sélectionnée
    if (formData.customTimes) {
      return Math.floor((formData.customTimes - 4) / 4);
    }
    return 0;
  });

  // Créer des groupes de nombres de 4 à 23
  const allTimes = Array.from({ length: 20 }, (_, i) => i + 4);
  const itemsPerPage = 4;
  const totalPages = Math.ceil(allTimes.length / itemsPerPage);
  
  const getCurrentPageItems = () => {
    const start = currentPage * itemsPerPage;
    return allTimes.slice(start, start + itemsPerPage);
  };

  // Initialiser les times avec 4 prises si ce n'est pas déjà fait
  React.useEffect(() => {
    if (formData.times.length === 0) {
      handleTimesChange(4);
    }
  }, []);

  const handleTimesChange = (value: number) => {
    setSelectedTimes(value);
    setFormData({ ...formData, customTimes: value });
    
    const startTime = 8 * 60; // 08:00 en minutes
    const endTime = 23 * 60; // 23:00 en minutes
    const interval = (endTime - startTime) / (value - 1); // Calcul de l'intervalle en minutes
    
    // Mettre à jour le nombre de prises dans formData
    const newTimes = Array(value).fill(null).map((_, index) => {
      const minutes = startTime + index * interval;
      const hours = Math.floor(minutes / 60).toString().padStart(2, '0');
      const mins = Math.floor(minutes % 60).toString().padStart(2, '0');
      
      // Conserver les doses existantes si disponibles
      const existingTime = formData.times[index];
      return {
        time: `${hours}:${mins}`,
        dose: existingTime?.dose || '1'
      };
    });

    setFormData({ ...formData, times: newTimes, customTimes: value });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-cyan-500/10">
          <Clock className="w-6 h-6 text-cyan-500" />
        </div>
        <h3 className="text-lg font-semibold">Combien de fois par jour?</h3>
      </div>

      <div className="flex flex-col items-center">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
            disabled={currentPage === 0}
            className={`p-2 rounded-full transition-colors duration-150 ${
              currentPage === 0
                ? isDark
                  ? 'text-gray-600 cursor-not-allowed'
                  : 'text-gray-300 cursor-not-allowed'
                : isDark
                ? 'hover:bg-gray-700 text-gray-300'
                : 'hover:bg-gray-200 text-gray-600'
            }`}
            aria-label="Page précédente"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div className="flex gap-4">
            {getCurrentPageItems().map((number) => (
              <button
                key={number}
                onClick={() => handleTimesChange(number)}
                className={`w-16 h-16 rounded-lg text-2xl font-semibold transition-all duration-150 ${
                  selectedTimes === number
                    ? 'bg-cyan-500 text-white scale-110 shadow-lg'
                    : isDark
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {number}
              </button>
            ))}
          </div>

          <button
            onClick={() => setCurrentPage(Math.min(totalPages - 1, currentPage + 1))}
            disabled={currentPage === totalPages - 1}
            className={`p-2 rounded-full transition-colors duration-150 ${
              currentPage === totalPages - 1
                ? isDark
                  ? 'text-gray-600 cursor-not-allowed'
                  : 'text-gray-300 cursor-not-allowed'
                : isDark
                ? 'hover:bg-gray-700 text-gray-300'
                : 'hover:bg-gray-200 text-gray-600'
            }`}
            aria-label="Page suivante"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        <div className="flex flex-col items-center gap-2">
          <p className="text-lg text-cyan-500">fois par jour</p>
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            {currentPage + 1} / {totalPages}
          </p>
        </div>
      </div>
    </div>
  );
}