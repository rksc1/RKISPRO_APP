import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import type { MarketplaceRequestRow } from '@/models/MarketplaceRequest';

export function useCustomerRFQs(customerId: string | undefined) {
  const [rfqs, setRfqs] = useState<MarketplaceRequestRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchRFQs = useCallback(async () => {
    if (!customerId) {
      setIsLoading(false);
      return;
    }
    
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('marketplace_requests')
        .select('*')
        .eq('customer_id', customerId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setRfqs(data as MarketplaceRequestRow[]);
    } catch (err: any) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }, [customerId]);

  useEffect(() => {
    fetchRFQs();
  }, [fetchRFQs]);

  return { rfqs, isLoading, error, refetch: fetchRFQs };
}
