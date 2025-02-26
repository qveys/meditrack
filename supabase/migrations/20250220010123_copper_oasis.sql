/*
  # Medication Management Database Schema

  1. New Tables
    - `medications`
      - `id` (uuid, primary key)
      - `name` (text, required)
      - `dosage` (text, required)
      - `icon` (text, required)
      - `color` (text, required)
      - `notes` (text)
      - `created_at` (timestamp)
      - `user_id` (uuid, references auth.users)

    - `reminders`
      - `id` (uuid, primary key)
      - `medication_id` (uuid, references medications)
      - `date` (date, required)
      - `time` (time, required)
      - `status` (enum: pending, taken, skipped, rescheduled)
      - `taken_at` (timestamp)
      - `created_at` (timestamp)
      - `user_id` (uuid, references auth.users)

  2. Security
    - Enable RLS on both tables
    - Add policies for CRUD operations based on user_id
    - Ensure users can only access their own data

  3. Indexes
    - Index on medications(user_id) for faster lookups
    - Index on reminders(date, time) for efficient scheduling queries
    - Index on reminders(medication_id) for relationship lookups
*/

-- Create medications table
CREATE TABLE IF NOT EXISTS medications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  dosage text NOT NULL,
  icon text NOT NULL,
  color text NOT NULL,
  notes text,
  created_at timestamptz DEFAULT now(),
  user_id uuid REFERENCES auth.users(id) NOT NULL
);

-- Create status enum type
CREATE TYPE reminder_status AS ENUM ('pending', 'taken', 'skipped', 'rescheduled');

-- Create reminders table
CREATE TABLE IF NOT EXISTS reminders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  medication_id uuid REFERENCES medications(id) ON DELETE CASCADE NOT NULL,
  date date NOT NULL,
  time time NOT NULL,
  status reminder_status DEFAULT 'pending',
  taken_at timestamptz,
  created_at timestamptz DEFAULT now(),
  user_id uuid REFERENCES auth.users(id) NOT NULL
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_medications_user_id ON medications(user_id);
CREATE INDEX IF NOT EXISTS idx_reminders_date_time ON reminders(date, time);
CREATE INDEX IF NOT EXISTS idx_reminders_medication_id ON reminders(medication_id);
CREATE INDEX IF NOT EXISTS idx_reminders_user_id ON reminders(user_id);

-- Enable Row Level Security
ALTER TABLE medications ENABLE ROW LEVEL SECURITY;
ALTER TABLE reminders ENABLE ROW LEVEL SECURITY;

-- Medications policies
CREATE POLICY "Users can view their own medications"
  ON medications
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own medications"
  ON medications
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own medications"
  ON medications
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own medications"
  ON medications
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Reminders policies
CREATE POLICY "Users can view their own reminders"
  ON reminders
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own reminders"
  ON reminders
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own reminders"
  ON reminders
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own reminders"
  ON reminders
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Add helpful views
CREATE OR REPLACE VIEW upcoming_reminders AS
SELECT 
  r.id,
  r.date,
  r.time,
  r.status,
  m.name as medication_name,
  m.dosage,
  m.icon,
  m.color
FROM reminders r
JOIN medications m ON r.medication_id = m.id
WHERE r.status = 'pending'
AND (r.date > CURRENT_DATE 
  OR (r.date = CURRENT_DATE AND r.time > CURRENT_TIME))
ORDER BY r.date, r.time;