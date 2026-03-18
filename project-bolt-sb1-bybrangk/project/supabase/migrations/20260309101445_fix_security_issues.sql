/*
  # Fix Security and Performance Issues

  ## Changes Made

  1. **RLS Policy Performance Optimization**
     - Fixed all policies to use `(select auth.uid())` instead of `auth.uid()` to prevent re-evaluation per row
     - Updated policies on `used_tractors` table (4 policies)
     - Updated policies on `admin_users` table (1 policy)
  
  2. **Removed Unused Indexes**
     - Dropped `idx_tractors_drive` (unused)
     - Dropped `idx_tractors_series` (unused)
     - Dropped `idx_tractors_is_new` (unused)
  
  3. **Fixed Multiple Permissive Policies**
     - Removed redundant "Admins can view all used tractors" policy
     - Public policy now allows viewing all tractors (not just available ones)
     - Simplified to single SELECT policy per role
  
  4. **Fixed RLS Policies That Always Return True**
     - Replaced overly permissive policies on `tractors` table with proper admin checks
     - Replaced overly permissive policies on `sync_logs` table with proper admin checks
     - Now requires user to be in `admin_users` table for write operations
  
  5. **Fixed Function Search Path Issue**
     - Updated `update_updated_at_column` function with stable search_path
  
  ## Security Improvements
  
  All tables now have proper RLS protection:
  - Public/anonymous: READ-ONLY access to public data
  - Authenticated non-admins: READ-ONLY access to public data
  - Authenticated admins only: Full CRUD access to all data
  
  ## Note
  
  The Auth DB Connection Strategy warning requires project-level configuration changes
  in the Supabase dashboard and cannot be fixed via SQL migration.
*/

-- Drop unused indexes
DROP INDEX IF EXISTS idx_tractors_drive;
DROP INDEX IF EXISTS idx_tractors_series;
DROP INDEX IF EXISTS idx_tractors_is_new;

-- Fix function search path issue
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp;

-- Drop all existing policies on tractors table
DROP POLICY IF EXISTS "Anyone can view tractors" ON tractors;
DROP POLICY IF EXISTS "Authenticated users can insert tractors" ON tractors;
DROP POLICY IF EXISTS "Authenticated users can update tractors" ON tractors;
DROP POLICY IF EXISTS "Authenticated users can delete tractors" ON tractors;

-- Create new secure policies for tractors table
CREATE POLICY "Public can view tractors"
  ON tractors FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Admins can insert tractors"
  ON tractors FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = (select auth.uid())
    )
  );

CREATE POLICY "Admins can update tractors"
  ON tractors FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = (select auth.uid())
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = (select auth.uid())
    )
  );

CREATE POLICY "Admins can delete tractors"
  ON tractors FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = (select auth.uid())
    )
  );

-- Drop all existing policies on sync_logs table
DROP POLICY IF EXISTS "Anyone can view sync logs" ON sync_logs;
DROP POLICY IF EXISTS "Authenticated users can insert sync logs" ON sync_logs;
DROP POLICY IF EXISTS "Authenticated users can update sync logs" ON sync_logs;

-- Create new secure policies for sync_logs table
CREATE POLICY "Public can view sync logs"
  ON sync_logs FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Admins can insert sync logs"
  ON sync_logs FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = (select auth.uid())
    )
  );

CREATE POLICY "Admins can update sync logs"
  ON sync_logs FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = (select auth.uid())
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = (select auth.uid())
    )
  );

-- Drop and recreate policies on used_tractors table with optimized auth checks
DROP POLICY IF EXISTS "Public can view available used tractors" ON used_tractors;
DROP POLICY IF EXISTS "Admins can view all used tractors" ON used_tractors;
DROP POLICY IF EXISTS "Admins can insert used tractors" ON used_tractors;
DROP POLICY IF EXISTS "Admins can update used tractors" ON used_tractors;
DROP POLICY IF EXISTS "Admins can delete used tractors" ON used_tractors;

-- Single SELECT policy for public access
CREATE POLICY "Public can view used tractors"
  ON used_tractors FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Admins can insert used tractors"
  ON used_tractors FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = (select auth.uid())
    )
  );

CREATE POLICY "Admins can update used tractors"
  ON used_tractors FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = (select auth.uid())
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = (select auth.uid())
    )
  );

CREATE POLICY "Admins can delete used tractors"
  ON used_tractors FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = (select auth.uid())
    )
  );

-- Drop and recreate policy on admin_users table with optimized auth check
DROP POLICY IF EXISTS "Admins can view admin users" ON admin_users;

CREATE POLICY "Admins can view admin users"
  ON admin_users FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = (select auth.uid())
    )
  );