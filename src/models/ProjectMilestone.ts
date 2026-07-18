import type { MilestoneCreatorRole, MilestoneStatus } from "@/types/auth";

export type ProjectMilestoneRow = {
  id: string;
  project_id: string;
  title: string;
  description: string | null;
  status: MilestoneStatus;
  attachment_urls: string[];
  due_date: string | null;
  completed_at: string | null;
  created_by_role: MilestoneCreatorRole;
  created_by_id: string;
  created_at: string;
  updated_at: string;
};

export type ProjectMilestone = {
  id: string;
  projectId: string;
  title: string;
  description: string | null;
  status: MilestoneStatus;
  attachmentUrls: string[];
  dueDate: string | null;
  completedAt: string | null;
  createdByRole: MilestoneCreatorRole;
  createdById: string;
  createdAt: string;
  updatedAt: string;
};
