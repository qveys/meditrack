import { useState } from 'react';
import { EmptyState } from './components/EmptyState';
import { TimeGroup } from './components/TimeGroup';
import { useAnimatedTransition } from './hooks/useAnimatedTransition';
import type { Medication } from '@/types/medication.ts';

interface MedicationListProps {
  medications: Medication[];
  selectedDate: string;
  slideDirection: string | null;
  onMedicationAction: (id: string, action: 'take' | 'skip' | 'undo') => void;
}

interface GroupedMedications {
  [key: string]: Medication[];
}

export function MedicationList({ 
  medications,
  selectedDate,
  slideDirection,
  onMedicationAction 
}: MedicationListProps) {
  const [displayDate, setDisplayDate] = useState(selectedDate);
    
  const timeToMinutes = (time: string): number => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  };

  const getMedicationsForDate = (date: string) => {
    const filteredMeds = medications.filter(med => med.date === date);
    const grouped = filteredMeds.reduce((acc, med) => {
      if (!acc[med.time]) {
        acc[med.time] = [];
      }
      acc[med.time].push(med);
      return acc;
    }, {} as GroupedMedications);

    return Object.entries(grouped)
      .sort(([timeA], [timeB]) => timeToMinutes(timeA) - timeToMinutes(timeB));
  };

  const { containerRef, listCurrentRef, listNextRef } = useAnimatedTransition({
    slideDirection,
    displayDate,
    selectedDate,
    onTransitionComplete: () => setDisplayDate(selectedDate)
  });

  const renderMedicationList = (date: string) => {
    const groupedMedications = getMedicationsForDate(date);

    if (groupedMedications.length === 0) {
      return <EmptyState />;
    }

    return (
      <div className="space-y-4 mb-28">
        {groupedMedications.map(([time, meds]) => (
          <TimeGroup
            key={time}
            time={time}
            medications={meds}
            onMedicationAction={onMedicationAction}
          />
        ))}
      </div>
    );
  };

  return (
    <main className="flex-1 overflow-y-auto p-4 pb-24">
      <div ref={containerRef} className="relative min-h-[200px]">
        <div 
          ref={listCurrentRef}
          className="absolute w-full"
          data-date={displayDate}
        >
          {renderMedicationList(displayDate)}
        </div>
        <div 
          ref={listNextRef}
          className="absolute w-full opacity-0"
          data-date={selectedDate}
        >
          {renderMedicationList(selectedDate)}
        </div>
      </div>
    </main>
  );
}