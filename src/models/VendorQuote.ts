import type { VendorQuoteStatus } from "@/types/auth";

export type VendorQuoteRow = {
  id: string;
  vendor_id: string;
  request_id: string;
  amount: number;
  timeline: string;
  notes: string;
  attachment_url: string | null;
  status: VendorQuoteStatus;
  admin_notes: string | null;
  risk_notes: string | null;
  is_recommended: boolean;
  execution_fit_score: number | null;
  reviewed_at: string | null;
  reviewed_by: string | null;
  created_at: string;
  updated_at: string;
};

export type VendorQuote = {
  id: string;
  vendorId: string;
  requestId: string;
  amount: number;
  timeline: string;
  notes: string;
  attachmentUrl: string | null;
  status: VendorQuoteStatus;
  adminNotes: string | null;
  riskNotes: string | null;
  isRecommended: boolean;
  executionFitScore: number | null;
  reviewedAt: string | null;
  reviewedBy: string | null;
  createdAt: string;
  updatedAt: string;
};
