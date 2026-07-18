import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import type { VendorQuoteRow } from '@/models/VendorQuote';

export type VendorQuoteWithVendor = VendorQuoteRow & {
  vendors: {
    company_name: string | null;
    full_name: string | null;
    owner_name: string | null;
    experience_years: number;
    vendor_type: string;
  } | null;
};

export function useRequestBids(requestId: string | undefined) {
  const [bids, setBids] = useState<VendorQuoteWithVendor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchBids = useCallback(async () => {
    if (!requestId) {
      setIsLoading(false);
      return;
    }
    
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('vendor_quotes')
        .select(`
          *,
          vendors:vendor_id (
            company_name,
            full_name,
            owner_name,
            experience_years,
            vendor_type
          )
        `)
        .eq('request_id', requestId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBids(data as any);
    } catch (err: any) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }, [requestId]);

  useEffect(() => {
    fetchBids();
  }, [fetchBids]);

  return { bids, isLoading, error, refetch: fetchBids };
}
