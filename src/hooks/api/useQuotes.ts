import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { VendorQuoteRow } from '@/models/VendorQuote';

export interface SubmitQuoteParams {
  vendor_id: string;
  request_id: string;
  amount: number;
  timeline: string;
  notes: string;
}

export function useQuotes() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const submitQuote = async (params: SubmitQuoteParams): Promise<VendorQuoteRow | null> => {
    setIsSubmitting(true);
    setError(null);
    
    try {
      const { data, error } = await supabase
        .from('vendor_quotes')
        .insert([
          {
            vendor_id: params.vendor_id,
            request_id: params.request_id,
            amount: params.amount,
            timeline: params.timeline,
            notes: params.notes,
            status: 'pending' // Default status per DB schema
          }
        ])
        .select()
        .single();

      if (error) throw error;
      return data as VendorQuoteRow;
    } catch (err: any) {
      setError(err);
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  };

  return { submitQuote, isSubmitting, error };
}
