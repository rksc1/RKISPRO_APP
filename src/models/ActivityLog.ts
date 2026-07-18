import type { ActivityEntityType, Role } from "@/types/auth";
import type { Json } from "@/types/supabase";

export type ActivityLogRow = {
  id: string;
  actor_role: Role;
  actor_id: string | null;
  entity_type: ActivityEntityType | string;
  entity_id: string | null;
  action: string;
  description: string | null;
  metadata: Json | null;
  created_at: string;
};

export type ActivityLog = {
  id: string;
  actorRole: Role;
  actorId: string | null;
  entityType: ActivityEntityType | string;
  entityId: string | null;
  action: string;
  description: string | null;
  metadata: Json | null;
  createdAt: string;
};
