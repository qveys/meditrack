export const generateTimeSlots = (count: number): { time: string; dose: string }[] => {
  const startTime = 8 * 60; // 08:00 en minutes
  const endTime = 23 * 60; // 23:00 en minutes
  const interval = (endTime - startTime) / (count - 1);

  return Array(count).fill(null).map((_, index) => {
    const minutes = startTime + index * interval;
    const hours = Math.floor(minutes / 60).toString().padStart(2, '0');
    const mins = Math.floor(minutes % 60).toString().padStart(2, '0');
    
    return {
      time: `${hours}:${mins}`,
      dose: '1'
    };
  });
};

export const generateDefaultTimes = (option: string): { time: string; dose: string }[] => {
  switch (option) {
    case 'Deux fois par jour':
      return [
        { time: '08:00', dose: '1' },
        { time: '20:00', dose: '1' }
      ];
    case '3 fois par jour':
      return [
        { time: '08:00', dose: '1' },
        { time: '14:00', dose: '1' },
        { time: '20:00', dose: '1' }
      ];
    default:
      return [{ time: '08:00', dose: '1' }];
  }
};

export const generateHourlyIntervalTimes = (interval: number): { time: string; dose: string }[] => {
  const startHour = 8;
  const numberOfDoses = Math.ceil((24 - startHour) / interval);
  
  return Array.from({ length: numberOfDoses }, (_, index) => {
    const hour = (startHour + (index * interval)) % 24;
    const formattedHour = hour.toString().padStart(2, '0');
    return {
      time: `${formattedHour}:00`,
      dose: '1'
    };
  });
};