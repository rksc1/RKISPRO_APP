import type { NotificationType, Role } from "@/types/auth";

export type NotificationRow = {
  id: string;
  user_role: Role;
  user_id: string;
  title: string;
  message: string;
  type: NotificationType;
  link: string | null;
  is_read: boolean;
  created_at: string;
};

export type Notification = {
  id: string;
  userRole: Role;
  userId: string;
  title: string;
  message: string;
  type: NotificationType;
  link: string | null;
  isRead: boolean;
  createdAt: string;
};
