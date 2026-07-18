import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { MarketplaceRequestRow } from '@/models/MarketplaceRequest';

export function useRFQs() {
  const [rfqs, setRfqs] = useState<MarketplaceRequestRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchRFQs = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('marketplace_requests')
        .select('*')
        .eq('status', 'open')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setRfqs(data as MarketplaceRequestRow[]);
    } catch (err: any) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRFQs();
  }, [fetchRFQs]);

  return { rfqs, isLoading, error, refetch: fetchRFQs };
}
