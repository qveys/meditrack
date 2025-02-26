import React, { useRef, useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { gsap } from 'gsap';
import { MedicationCard } from '../MedicationCard';
import { useTheme } from '../../ThemeContext';
import type { Medication } from '../../types/medication';

interface MedicationListProps {
  medications: Medication[];
  selectedDate: string;
  slideDirection: string | null;
  onMedicationAction: (id: number, action: 'take' | 'skip' | 'undo') => void;
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
  const { isDark } = useTheme();
  const [displayDate, setDisplayDate] = useState(selectedDate);

  const containerRef = useRef<HTMLDivElement>(null);
  const listCurrentRef = useRef<HTMLDivElement>(null);
  const listNextRef = useRef<HTMLDivElement>(null);
    
  const timeToMinutes = (time: string): number => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  };

  const getMedicationsForDate = (date: string) => {
    // Filter medications for the selected date
    const filteredMeds = medications.filter(med => med.date === date);

    // Group medications by time
    const grouped = filteredMeds.reduce((acc, med) => {
      if (!acc[med.time]) {
        acc[med.time] = [];
      }
      acc[med.time].push(med);
      return acc;
    }, {} as GroupedMedications);

    // Sort times
    return Object.entries(grouped)
      .sort(([timeA], [timeB]) => timeToMinutes(timeA) - timeToMinutes(timeB));
  };

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours, 10);
    const period = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${period}`;
  };

  const getDate = (dateString: string, direction: number) => {
    const date = new Date(dateString);
    date.setDate(date.getDate() + direction);
    return date.toISOString().split('T')[0];
  };

  useEffect(() => {
    if (!slideDirection || !listCurrentRef.current || !listNextRef.current) return;

    const direction = slideDirection === 'right' ? -1 : 1;
    const currentList = listCurrentRef.current;
    const targetList = listNextRef.current;
    const nextDate = getDate(displayDate, direction);

    // Reset any existing animations
    gsap.killTweensOf([currentList, targetList]);
    
    // Set initial positions
    gsap.set(currentList, { x: 0 });
    gsap.set(targetList, { x: `${100 * direction}%`, autoAlpha: 1 });

    // Create the animation timeline
    const tl = gsap.timeline({
      onComplete: () => {
        setTimeout(() => {
          setDisplayDate(selectedDate);
           gsap.set([currentList, targetList], { clearProps: "all" });
        }, 300);
      }
    });

    // Add animations to the timeline
    tl.to(currentList, {
      x: `${-105 * direction}%`,
      duration: 0.3,
      ease: "power2.inOut"
    })
    .to(targetList, {
      x: "0%",
      duration: 0.3,
      ease: "power2.inOut"
    }, "<");
  }, [selectedDate, slideDirection]);

  const renderMedicationList = (date: string) => {
    const groupedMedications = getMedicationsForDate(date);

    return (
      <div className="space-y-4 mb-28">
        {groupedMedications.length === 0 ? (
          <div className={`text-center py-8 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            No medications scheduled for this day
          </div>
        ) : (
          groupedMedications.map(([time, meds]) => (
            <div 
              key={time}
              className={`rounded-lg shadow-sm transition-colors duration-150 ${
                isDark ? 'bg-gray-800/30' : 'border border-gray-300'
              }`}
            >
              <div className={`flex items-center justify-between px-4 py-2 border-b ${
                isDark ? 'border-gray-700' : 'border-gray-200'
              }`}>
                <h2 className={`text-sm font-semibold ${
                  isDark ? 'text-cyan-400' : 'text-cyan-600'
                }`}>
                  {formatTime(time)}
                </h2>
                <ChevronDown className={`w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
              </div>
              <div>
                {meds.map((medication) => (
                  <MedicationCard
                    key={medication.id}
                    medication={medication}
                    onAction={onMedicationAction}
                  />
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    );
  };

  return (
    <main className="flex-1 overflow-y-auto p-4 pb-24">
      <div 
        ref={containerRef}
        className="relative min-h-[200px]"
      >
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