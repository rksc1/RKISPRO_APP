import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import type { ProjectMilestoneRow } from '@/models/ProjectMilestone';

export function useProjectMilestones(projectId: string | undefined) {
  const [milestones, setMilestones] = useState<ProjectMilestoneRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchMilestones = useCallback(async () => {
    if (!projectId) {
      setIsLoading(false);
      return;
    }
    
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('project_milestones')
        .select('*')
        .eq('project_id', projectId)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setMilestones(data as ProjectMilestoneRow[]);
    } catch (err: any) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }, [projectId]);

  useEffect(() => {
    fetchMilestones();
  }, [fetchMilestones]);

  return { milestones, isLoading, error, refetch: fetchMilestones };
}
