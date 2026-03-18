/*
  # Create Used Tractors Table and Admin Authentication

  1. New Tables
    - `used_tractors`
      - `id` (uuid, primary key)
      - `brand` (text) - Brand name (Mahindra, Swaraj, Massey Ferguson, etc.)
      - `model` (text) - Model name
      - `description` (text) - Short description
      - `image_url` (text) - URL to tractor image
      - `is_available` (boolean) - Whether tractor is still available
      - `created_at` (timestamptz) - When tractor was added
      - `updated_at` (timestamptz) - Last update time
    
    - `admin_users`
      - `id` (uuid, primary key, references auth.users)
      - `email` (text) - Admin email
      - `created_at` (timestamptz) - When admin was created

  2. Security
    - Enable RLS on both tables
    - Public can read available used tractors
    - Only authenticated admins can create, update, delete used tractors
    - Only authenticated admins can read admin_users table

  3. Notes
    - Used tractors are displayed publicly but managed only by admins
    - Price is intentionally not included per requirements
    - Images should be uploaded to storage or external URLs
*/

-- Create used_tractors table
CREATE TABLE IF NOT EXISTS used_tractors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  brand text NOT NULL,
  model text NOT NULL,
  description text DEFAULT '',
  image_url text NOT NULL,
  is_available boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create admin_users table
CREATE TABLE IF NOT EXISTS admin_users (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE used_tractors ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- RLS Policies for used_tractors
CREATE POLICY "Public can view available used tractors"
  ON used_tractors FOR SELECT
  TO anon, authenticated
  USING (is_available = true);

CREATE POLICY "Admins can view all used tractors"
  ON used_tractors FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = auth.uid()
    )
  );

CREATE POLICY "Admins can insert used tractors"
  ON used_tractors FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = auth.uid()
    )
  );

CREATE POLICY "Admins can update used tractors"
  ON used_tractors FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = auth.uid()
    )
  );

CREATE POLICY "Admins can delete used tractors"
  ON used_tractors FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = auth.uid()
    )
  );

-- RLS Policies for admin_users
CREATE POLICY "Admins can view admin users"
  ON admin_users FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = auth.uid()
    )
  );

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_used_tractors_updated_at
  BEFORE UPDATE ON used_tractors
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();