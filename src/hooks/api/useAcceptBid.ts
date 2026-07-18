import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { ProjectRow } from '@/models/Project';

export interface AcceptBidParams {
  quote_id: string;
  request_id: string;
  customer_id: string;
  vendor_id: string;
  amount: number;
}

export function useAcceptBid() {
  const [isAccepting, setIsAccepting] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const acceptBid = async (params: AcceptBidParams): Promise<ProjectRow | null> => {
    setIsAccepting(true);
    setError(null);
    
    try {
      // 1. Call the atomic RPC to accept the bid
      const { data: projectData, error: rpcError } = await supabase.rpc('accept_bid', {
        p_quote_id: params.quote_id,
        p_request_id: params.request_id,
        p_customer_id: params.customer_id,
        p_vendor_id: params.vendor_id,
        p_amount: params.amount
      });

      if (rpcError) throw rpcError;

      return projectData as ProjectRow;
    } catch (err: any) {
      setError(err);
      throw err;
    } finally {
      setIsAccepting(false);
    }
  };

  return { acceptBid, isAccepting, error };
}
