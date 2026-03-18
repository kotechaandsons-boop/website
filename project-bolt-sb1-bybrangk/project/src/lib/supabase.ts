import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Tractor {
  id: string;
  model: string;
  full_model_name: string;
  hp: number;
  rear_tyre_size: string;
  type: string;
  drive: string;
  image_url: string;
  description: string;
  series: string;
  engine: string;
  transmission: string;
  pto: string;
  hydraulics: string;
  fuel_tank: string;
  weight: string;
  is_new: boolean;
  john_deere_url: string | null;
  last_synced_at: string;
  created_at: string;
  updated_at: string;
}

export async function getTractors(): Promise<Tractor[]> {
  const { data, error } = await supabase
    .from('tractors')
    .select('*')
    .order('hp', { ascending: false });

  if (error) {
    console.error('Error fetching tractors:', error);
    return [];
  }

  return data || [];
}

export async function getTractorsByFilter(filters: {
  minHp?: number;
  maxHp?: number;
  drive?: string;
  series?: string;
}): Promise<Tractor[]> {
  let query = supabase.from('tractors').select('*');

  if (filters.minHp) {
    query = query.gte('hp', filters.minHp);
  }

  if (filters.maxHp) {
    query = query.lte('hp', filters.maxHp);
  }

  if (filters.drive) {
    query = query.eq('drive', filters.drive);
  }

  if (filters.series) {
    query = query.eq('series', filters.series);
  }

  query = query.order('hp', { ascending: false });

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching filtered tractors:', error);
    return [];
  }

  return data || [];
}

export async function syncTractors(): Promise<{ success: boolean; message?: string }> {
  try {
    const response = await fetch(
      `${supabaseUrl}/functions/v1/sync-tractors`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${supabaseAnonKey}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error syncing tractors:', error);
    return { success: false, message: 'Failed to sync tractors' };
  }
}

export async function getLatestSyncLog() {
  const { data, error } = await supabase
    .from('sync_logs')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error('Error fetching sync log:', error);
    return null;
  }

  return data;
}

export interface Implement {
  id: string;
  name: string;
  slug: string;
  image_url: string;
  short_description: string;
  full_description: string;
  category: string;
  compatible_hp_min?: number;
  compatible_hp_max?: number;
  specifications: Record<string, any>;
  features: string[];
  source_url: string;
  created_at: string;
  updated_at: string;
}

export async function getImplements(): Promise<Implement[]> {
  const { data, error } = await supabase
    .from('implements')
    .select('*')
    .order('category', { ascending: true });

  if (error) {
    console.error('Error fetching implements:', error);
    return [];
  }

  return data || [];
}

export async function getImplementsByCategory(category?: string): Promise<Implement[]> {
  let query = supabase.from('implements').select('*');

  if (category) {
    query = query.eq('category', category);
  }

  query = query.order('name', { ascending: true });

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching implements:', error);
    return [];
  }

  return data || [];
}

export async function syncImplements(): Promise<{ success: boolean; message?: string }> {
  try {
    const response = await fetch(
      `${supabaseUrl}/functions/v1/sync-implements`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${supabaseAnonKey}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error syncing implements:', error);
    return { success: false, message: 'Failed to sync implements' };
  }
}
