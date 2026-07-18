import type { ProjectStatus } from "@/types/auth";

export type ProjectRow = {
  id: string;
  request_id: string;
  customer_id: string;
  vendor_id: string;
  quote_id: string;
  status: ProjectStatus;
  start_date: string | null;
  expected_delivery_date: string | null;
  actual_delivery_date: string | null;
  project_value: number;
  commission_percentage: number;
  commission_amount: number;
  admin_notes: string | null;
  created_at: string;
  updated_at: string;
};

export type Project = {
  id: string;
  requestId: string;
  customerId: string;
  vendorId: string;
  quoteId: string;
  status: ProjectStatus;
  startDate: string | null;
  expectedDeliveryDate: string | null;
  actualDeliveryDate: string | null;
  projectValue: number;
  commissionPercentage: number;
  commissionAmount: number;
  adminNotes: string | null;
  createdAt: string;
  updatedAt: string;
};
