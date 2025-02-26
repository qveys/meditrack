import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { useNotifications } from './useNotifications';
import { useAuth } from './useAuth';
import type { Medication } from '../types/medication';

interface MedicationData {
  id: string;
  name: string;
  dosage: string;
  icon: string;
  color: string;
}

interface ReminderData {
  id: string;
  date: string;
  time: string;
  status: 'pending' | 'taken' | 'skipped';
  medication_id: string;
}

export function useMedications() {
  const [medications, setMedications] = useState<Medication[]>([]);
  const { scheduleNotification, cancelNotification } = useNotifications();
  const { user } = useAuth();

  const loadMedications = useCallback(async () => {
    if (!user) return null;

    const { data, error } = await supabase
      .from('medications')
      .select(`
        id,
        name,
        dosage,
        icon,
        color
      `)
      .eq('user_id', user.id);

    if (error) {
      console.error('Error loading medications:', error);
      return null;
    }

    return data as MedicationData[];
  }, [user]);

  const loadReminders = useCallback(async () => {
    if (!user) return null;

    const { data, error } = await supabase
      .from('reminders')
      .select(`
        id,
        date,
        time,
        status,
        medication_id
      `)
      .eq('user_id', user.id)
      .order('date', { ascending: true })
      .order('time', { ascending: true });

    if (error) {
      console.error('Error loading reminders:', error);
      return null;
    }

    return data as ReminderData[];
  }, [user]);

  const refreshData = useCallback(async () => {
    const [medicationsData, remindersData] = await Promise.all([
      loadMedications(),
      loadReminders()
    ]);

    if (medicationsData) {
      // Create a map of reminders by medication ID
      const remindersByMedication = (remindersData || []).reduce((acc, reminder) => {
        if (!acc[reminder.medication_id]) {
          acc[reminder.medication_id] = [];
        }
        acc[reminder.medication_id].push(reminder);
        return acc;
      }, {} as Record<string, ReminderData[]>);

      // Transform all medications, including those without reminders
      const formattedMedications = medicationsData.flatMap(medication => {
        const reminders = remindersByMedication[medication.id] || [];

        // If there are no reminders, still include the medication but without reminder-specific data
        if (reminders.length === 0) {
          return [{
            id: `med-${medication.id}`, // Use a unique string ID for medications without reminders
            medicationId: medication.id,
            date: '', // Empty date for medications without reminders
            time: '', // Empty time for medications without reminders
            name: medication.name,
            dosage: medication.dosage,
            icon: medication.icon,
            color: medication.color,
            status: 'pending' as const,
          }];
        }

        // For medications with reminders, create an entry for each reminder
        return reminders.map(reminder => ({
          id: reminder.id, // Use the reminder ID directly as a string
          medicationId: medication.id,
          date: reminder.date,
          time: reminder.time,
          name: medication.name,
          dosage: medication.dosage,
          icon: medication.icon,
          color: medication.color,
          status: reminder.status,
        }));
      });

      setMedications(formattedMedications);
      
      // Schedule notifications for pending medications with reminders
      formattedMedications.forEach(med => {
        if (med.status === 'pending' && med.date && med.time) {
          scheduleNotification(med);
        }
      });
    }
  }, [loadMedications, loadReminders, scheduleNotification]);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  const handleMedicationAction = async (id: string, action: 'take' | 'skip' | 'undo') => {
    if (!user) return;

    const newStatus = action === 'undo' ? 'pending' : action === 'take' ? 'taken' : 'skipped';

    const { error } = await supabase
      .from('reminders')
      .update({ 
        status: newStatus,
        taken_at: newStatus === 'taken' ? new Date().toISOString() : null
      })
      .eq('id', id)
      .eq('user_id', user.id);

    if (error) {
      console.error('Error updating medication status:', error);
      return;
    }

    await refreshData();
  };

  const addMedication = async (medication: {
    name: string;
    dosage: string;
    icon: string;
    color: string;
  }) => {
    if (!user) return null;

    const { data, error } = await supabase
      .from('medications')
      .insert({
        name: medication.name,
        dosage: medication.dosage,
        icon: medication.icon,
        color: medication.color,
        user_id: user.id,
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating medication:', error);
      return null;
    }

    await refreshData();
    return data;
  };

  const addReminder = async (medicationId: string, date: string, time: string) => {
    if (!user) return;

    const { error: reminderError } = await supabase
      .from('reminders')
      .insert({
        medication_id: medicationId,
        date,
        time,
        status: 'pending',
        user_id: user.id,
      });

    if (reminderError) {
      console.error('Error creating reminder:', reminderError);
      return;
    }

    await refreshData();
  };

  const updateMedication = async (
    medicationId: string,
    updates: {
      name?: string;
      dosage?: string;
      icon?: string;
      color?: string;
    }
  ) => {
    if (!user) return;

    const { error } = await supabase
      .from('medications')
      .update(updates)
      .eq('id', medicationId)
      .eq('user_id', user.id);

    if (error) {
      console.error('Error updating medication:', error);
      return { error };
    }

    await refreshData();
    return { error: null };
  };

  const deleteMedication = async (medicationId: string) => {
    if (!user) return;

    const { error } = await supabase
      .from('medications')
      .delete()
      .eq('id', medicationId)
      .eq('user_id', user.id);

    if (error) {
      console.error('Error deleting medication:', error);
      return { error };
    }

    await refreshData();
    return { error: null };
  };

  return {
    medications,
    handleMedicationAction,
    addMedication,
    addReminder,
    updateMedication,
    deleteMedication,
  };
}