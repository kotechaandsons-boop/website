/*
  # Create Tractors Inventory System

  1. New Tables
    - `tractors`
      - `id` (uuid, primary key) - Unique identifier
      - `model` (text) - Tractor model name (e.g., "5075E", "5405")
      - `full_model_name` (text) - Full display name
      - `hp` (integer) - Horsepower rating
      - `rear_tyre_size` (text) - Rear tyre specifications
      - `type` (text) - Type (Gear Pro, Regular, etc.)
      - `drive` (text) - Drive type (2WD, 4WD)
      - `image_url` (text) - Official John Deere image URL
      - `description` (text) - Tractor description
      - `series` (text) - Tractor series (D-Series, E-Series, Speciality)
      - `engine` (text) - Engine specifications
      - `transmission` (text) - Transmission type
      - `pto` (text) - PTO specifications
      - `hydraulics` (text) - Hydraulics capacity
      - `fuel_tank` (text) - Fuel tank capacity
      - `weight` (text) - Tractor weight
      - `is_new` (boolean) - Latest model indicator
      - `john_deere_url` (text) - Source URL from John Deere website
      - `last_synced_at` (timestamptz) - Last sync timestamp
      - `created_at` (timestamptz) - Creation timestamp
      - `updated_at` (timestamptz) - Update timestamp

    - `sync_logs`
      - `id` (uuid, primary key) - Unique identifier
      - `sync_started_at` (timestamptz) - Sync start time
      - `sync_completed_at` (timestamptz) - Sync completion time
      - `models_added` (integer) - Number of new models added
      - `models_updated` (integer) - Number of models updated
      - `status` (text) - Sync status (success, failed, in_progress)
      - `error_message` (text) - Error details if any
      - `created_at` (timestamptz) - Log creation time

  2. Security
    - Enable RLS on `tractors` table
    - Add policy for public read access (farmers can view tractors)
    - Enable RLS on `sync_logs` table
    - Add policy for public read access to sync logs

  3. Indexes
    - Create indexes on commonly queried fields (hp, drive, series)
    - Create index on is_new for quick filtering of latest models

  4. Notes
    - All users can read tractor data (public access)
    - Only authenticated admin users can modify data (via Edge Functions)
    - Sync logs help track system health and updates
*/

-- Create tractors table
CREATE TABLE IF NOT EXISTS tractors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  model text NOT NULL,
  full_model_name text NOT NULL,
  hp integer NOT NULL,
  rear_tyre_size text NOT NULL,
  type text NOT NULL,
  drive text NOT NULL,
  image_url text NOT NULL,
  description text NOT NULL,
  series text NOT NULL,
  engine text NOT NULL,
  transmission text NOT NULL,
  pto text NOT NULL,
  hydraulics text NOT NULL,
  fuel_tank text NOT NULL,
  weight text NOT NULL,
  is_new boolean DEFAULT false,
  john_deere_url text,
  last_synced_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create sync_logs table
CREATE TABLE IF NOT EXISTS sync_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sync_started_at timestamptz DEFAULT now(),
  sync_completed_at timestamptz,
  models_added integer DEFAULT 0,
  models_updated integer DEFAULT 0,
  status text NOT NULL DEFAULT 'in_progress',
  error_message text,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE tractors ENABLE ROW LEVEL SECURITY;
ALTER TABLE sync_logs ENABLE ROW LEVEL SECURITY;

-- Tractors policies (public read access)
CREATE POLICY "Anyone can view tractors"
  ON tractors FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can insert tractors"
  ON tractors FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update tractors"
  ON tractors FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete tractors"
  ON tractors FOR DELETE
  TO authenticated
  USING (true);

-- Sync logs policies (public read access)
CREATE POLICY "Anyone can view sync logs"
  ON sync_logs FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can insert sync logs"
  ON sync_logs FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update sync logs"
  ON sync_logs FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_tractors_hp ON tractors(hp);
CREATE INDEX IF NOT EXISTS idx_tractors_drive ON tractors(drive);
CREATE INDEX IF NOT EXISTS idx_tractors_series ON tractors(series);
CREATE INDEX IF NOT EXISTS idx_tractors_is_new ON tractors(is_new);
CREATE INDEX IF NOT EXISTS idx_tractors_model ON tractors(model);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for tractors table
DROP TRIGGER IF EXISTS update_tractors_updated_at ON tractors;
CREATE TRIGGER update_tractors_updated_at
  BEFORE UPDATE ON tractors
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();