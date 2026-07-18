import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { ProjectRow } from '@/models/Project';

export function useUnlockProject() {
  const [isUnlocking, setIsUnlocking] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const unlockProject = async (projectId: string): Promise<ProjectRow | null> => {
    setIsUnlocking(true);
    setError(null);
    
    try {
      // Simulate payment delay for the mockup gateway
      await new Promise(resolve => setTimeout(resolve, 1500));

      const { data, error: projectError } = await supabase
        .from('projects')
        .update({ status: 'in_progress' })
        .eq('id', projectId)
        .select()
        .single();

      if (projectError) throw projectError;

      return data as ProjectRow;
    } catch (err: any) {
      setError(err);
      throw err;
    } finally {
      setIsUnlocking(false);
    }
  };

  return { unlockProject, isUnlocking, error };
}
