export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      medications: {
        Row: {
          id: string
          name: string
          dosage: string
          icon: string
          color: string
          notes: string | null
          created_at: string
          user_id: string
        }
        Insert: {
          id?: string
          name: string
          dosage: string
          icon: string
          color: string
          notes?: string | null
          created_at?: string
          user_id: string
        }
        Update: {
          id?: string
          name?: string
          dosage?: string
          icon?: string
          color?: string
          notes?: string | null
          created_at?: string
          user_id?: string
        }
      }
      reminders: {
        Row: {
          id: string
          medication_id: string
          date: string
          time: string
          status: 'pending' | 'taken' | 'skipped' | 'rescheduled'
          taken_at: string | null
          created_at: string
          user_id: string
        }
        Insert: {
          id?: string
          medication_id: string
          date: string
          time: string
          status?: 'pending' | 'taken' | 'skipped' | 'rescheduled'
          taken_at?: string | null
          created_at?: string
          user_id: string
        }
        Update: {
          id?: string
          medication_id?: string
          date?: string
          time?: string
          status?: 'pending' | 'taken' | 'skipped' | 'rescheduled'
          taken_at?: string | null
          created_at?: string
          user_id?: string
        }
      }
    }
    Views: {
      upcoming_reminders: {
        Row: {
          id: string
          date: string
          time: string
          status: string
          medication_name: string
          dosage: string
          icon: string
          color: string
        }
      }
    }
  }
}