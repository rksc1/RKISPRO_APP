import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export interface Vendor {
  id: string;
  company_name: string;
  owner_name: string;
  full_name: string;
  email: string;
  city: string;
  state: string;
  location: string;
  services: string[];
  skill_categories: string[];
  vendor_type: string;
  experience_years: number;
}

export function useVendors() {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchVendors();
  }, []);

  const fetchVendors = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('vendors')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setVendors(data as Vendor[]);
    } catch (err: any) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  return { vendors, isLoading, error, refetch: fetchVendors };
}
