import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export function useProfileRegistration() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const registerRole = async (
    userId: string, 
    role: 'customer' | 'vendor' | 'admin', 
    fullName: string, 
    email: string, 
    customerData?: { phone?: string; companyName?: string; city?: string; state?: string; location?: string },
    vendorData?: { 
      type: 'individual' | 'company'; 
      companyName?: string;
      phone?: string;
      city?: string;
      state?: string;
      skillCategories?: string[];
      serviceRadiusKm?: number;
      experienceYears?: number;
      ownerName?: string;
      workshopAddress?: string;
      services?: string[];
      machinery?: string[];
      capacity?: string;
      workerCount?: number;
    }
  ) => {
    setIsLoading(true);
    try {
      if (role === 'customer') {
        const { error: insertError } = await supabase.from('customers').insert({
          id: userId,
          name: fullName,
          email: email,
          phone: customerData?.phone || '',
          company_name: customerData?.companyName || '',
          city: customerData?.city || '',
          state: customerData?.state || '',
          location: customerData?.location || `${customerData?.city || ''}, ${customerData?.state || ''}`,
          password: 'linked_to_auth', // Placeholder since password is in auth schema
        });
        if (insertError) throw insertError;
      } else if (role === 'vendor') {
        const { error: insertError } = await supabase.from('vendors').insert({
          id: userId,
          full_name: fullName,
          owner_name: vendorData?.ownerName || fullName,
          email: email,
          phone: vendorData?.phone || '',
          company_name: vendorData?.companyName || (vendorData?.type === 'individual' ? undefined : fullName),
          vendor_type: vendorData?.type || 'individual',
          city: vendorData?.city || '',
          state: vendorData?.state || '',
          location: `${vendorData?.city || ''}, ${vendorData?.state || ''}`,
          skill_categories: vendorData?.skillCategories || [],
          service_radius_km: vendorData?.serviceRadiusKm || 0,
          experience_years: vendorData?.experienceYears || 0,
          workshop_address: vendorData?.workshopAddress || '',
          services: vendorData?.services || [],
          machinery: vendorData?.machinery || [],
          capacity: vendorData?.capacity || 'N/A',
          worker_count: vendorData?.workerCount || 0,
          password: 'linked_to_auth',
        });
        if (insertError) throw insertError;
      }
      
      // Update auth user metadata with role
      await supabase.auth.updateUser({
        data: { role }
      });
      
    } catch (err: any) {
      setError(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { registerRole, isLoading, error };
}
