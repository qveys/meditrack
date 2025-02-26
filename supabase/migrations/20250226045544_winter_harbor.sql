/*
  # Initial schema setup for medication tracking app

  1. New Tables
    - medications
      - id (uuid, primary key)
      - name (text)
      - dosage (text)
      - icon (text)
      - color (text)
      - notes (text, optional)
      - created_at (timestamptz)
      - user_id (uuid, references auth.users)
    
    - reminders
      - id (uuid, primary key)
      - medication_id (uuid, references medications)
      - date (date)
      - time (time)
      - status (enum: pending, taken, skipped, rescheduled)
      - taken_at (timestamptz, optional)
      - created_at (timestamptz)
      - user_id (uuid, references auth.users)

  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated users to manage their own data
    - Create indexes for better performance

  3. Views
    - upcoming_reminders: Shows pending reminders with medication details
*/

-- Create medications table if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'medications') THEN
    CREATE TABLE medications (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      name text NOT NULL,
      dosage text NOT NULL,
      icon text NOT NULL,
      color text NOT NULL,
      notes text,
      created_at timestamptz DEFAULT now(),
      user_id uuid REFERENCES auth.users(id) NOT NULL
    );

    -- Create index
    CREATE INDEX idx_medications_user_id ON medications(user_id);

    -- Enable RLS
    ALTER TABLE medications ENABLE ROW LEVEL SECURITY;

    -- Create policies
    CREATE POLICY "Users can view their own medications"
      ON medications FOR SELECT
      TO authenticated
      USING (auth.uid() = user_id);

    CREATE POLICY "Users can create their own medications"
      ON medications FOR INSERT
      TO authenticated
      WITH CHECK (auth.uid() = user_id);

    CREATE POLICY "Users can update their own medications"
      ON medications FOR UPDATE
      TO authenticated
      USING (auth.uid() = user_id)
      WITH CHECK (auth.uid() = user_id);

    CREATE POLICY "Users can delete their own medications"
      ON medications FOR DELETE
      TO authenticated
      USING (auth.uid() = user_id);
  END IF;
END $$;

-- Create status enum type if it doesn't exist
DO $$ 
BEGIN 
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'reminder_status') THEN
    CREATE TYPE reminder_status AS ENUM ('pending', 'taken', 'skipped', 'rescheduled');
  END IF;
END $$;

-- Create reminders table if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'reminders') THEN
    CREATE TABLE reminders (
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
    CREATE INDEX idx_reminders_date_time ON reminders(date, time);
    CREATE INDEX idx_reminders_medication_id ON reminders(medication_id);
    CREATE INDEX idx_reminders_user_id ON reminders(user_id);

    -- Enable RLS
    ALTER TABLE reminders ENABLE ROW LEVEL SECURITY;

    -- Create policies
    CREATE POLICY "Users can view their own reminders"
      ON reminders FOR SELECT
      TO authenticated
      USING (auth.uid() = user_id);

    CREATE POLICY "Users can create their own reminders"
      ON reminders FOR INSERT
      TO authenticated
      WITH CHECK (auth.uid() = user_id);

    CREATE POLICY "Users can update their own reminders"
      ON reminders FOR UPDATE
      TO authenticated
      USING (auth.uid() = user_id)
      WITH CHECK (auth.uid() = user_id);

    CREATE POLICY "Users can delete their own reminders"
      ON reminders FOR DELETE
      TO authenticated
      USING (auth.uid() = user_id);
  END IF;
END $$;

-- Create or replace view for upcoming reminders
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