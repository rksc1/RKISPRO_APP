import type { VendorNotificationStatus } from "@/types/auth";

export type VendorNotificationRow = {
  id: string;
  vendor_id: string;
  request_id: string;
  status: VendorNotificationStatus;
  quote_amount: number | null;
  quote_notes: string | null;
  quote_file_urls: string[];
  created_at: string;
};

export type VendorNotification = {
  id: string;
  vendorId: string;
  requestId: string;
  status: VendorNotificationStatus;
  quoteAmount: number | null;
  quoteNotes: string | null;
  quoteFileUrls: string[];
  createdAt: string;
};
