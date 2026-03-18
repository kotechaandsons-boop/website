/*
  # Create Implements Table

  1. New Tables
    - `implements`
      - `id` (uuid, primary key) - Unique identifier
      - `name` (text, not null) - Implement name
      - `slug` (text, unique, not null) - URL-friendly identifier
      - `image_url` (text, not null) - Main image URL
      - `short_description` (text, not null) - Brief description
      - `full_description` (text, not null) - Detailed description
      - `category` (text, not null) - Implement category
      - `compatible_hp_min` (int) - Minimum compatible tractor HP
      - `compatible_hp_max` (int) - Maximum compatible tractor HP
      - `specifications` (jsonb) - Technical specifications as JSON
      - `features` (text array) - List of key features
      - `source_url` (text) - Original source URL
      - `created_at` (timestamptz) - Record creation timestamp
      - `updated_at` (timestamptz) - Last update timestamp

  2. Security
    - Enable RLS on `implements` table
    - Add policy for public read access (implements data is public)

  3. Indexes
    - Add index on slug for fast lookups
    - Add index on category for filtering
*/

CREATE TABLE IF NOT EXISTS implements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  image_url text NOT NULL,
  short_description text NOT NULL,
  full_description text NOT NULL,
  category text NOT NULL,
  compatible_hp_min int,
  compatible_hp_max int,
  specifications jsonb DEFAULT '{}'::jsonb,
  features text[] DEFAULT ARRAY[]::text[],
  source_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE implements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view implements"
  ON implements
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE INDEX IF NOT EXISTS implements_slug_idx ON implements(slug);
CREATE INDEX IF NOT EXISTS implements_category_idx ON implements(category);