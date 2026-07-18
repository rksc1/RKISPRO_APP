import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { ProjectRow } from '@/models/Project';

export function useProjects(userId: string | undefined, role: 'customer' | 'vendor') {
  const [projects, setProjects] = useState<ProjectRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchProjects = useCallback(async () => {
    if (!userId) {
      setIsLoading(false);
      return;
    }
    
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq(role === 'customer' ? 'customer_id' : 'vendor_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProjects(data as ProjectRow[]);
    } catch (err: any) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }, [userId, role]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return { projects, isLoading, error, refetch: fetchProjects };
}
