import { useCallback } from 'react';
import type { Medication } from '../types/medication';

export function useNotifications() {
  const requestPermission = useCallback(async () => {
    if (!('Notification' in window)) {
      console.log('This browser does not support notifications');
      return false;
    }

    if (Notification.permission === 'granted') {
      return true;
    }

    const permission = await Notification.requestPermission();
    return permission === 'granted';
  }, []);

  const scheduleNotification = useCallback((medication: Medication) => {
    const scheduledTime = new Date(`${medication.date}T${medication.time}`);
    const now = new Date();
    
    if (scheduledTime > now) {
      const timeUntilNotification = scheduledTime.getTime() - now.getTime();
      
      setTimeout(() => {
        if (Notification.permission === 'granted') {
          const options = {
            body: `Time to take ${medication.dosage}`,
            icon: medication.icon,
            badge: '/notification-badge.png',
            tag: `med-${medication.id}`,
            renotify: true,
            requireInteraction: true,
            silent: false,
            data: {
              medicationId: medication.id,
              url: window.location.href,
            },
          };

          const notification = new Notification(medication.name, options);

          notification.addEventListener('click', () => {
            window.focus();
            notification.close();
          });
        }
      }, timeUntilNotification);
    }
  }, []);

  const cancelNotification = useCallback((medicationId: number) => {
    // Close any existing notifications for this medication
    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
      navigator.serviceWorker.ready.then(registration => {
        registration.getNotifications().then(notifications => {
          notifications.forEach(notification => {
            if (notification.tag === `med-${medicationId}`) {
              notification.close();
            }
          });
        });
      });
    }
  }, []);

  return {
    requestPermission,
    scheduleNotification,
    cancelNotification,
  };
}