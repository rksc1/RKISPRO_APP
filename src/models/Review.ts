export interface ReviewRow {
  id: string;
  project_id: string;
  customer_id: string;
  vendor_id: string;
  rating: number;
  comment: string | null;
  created_at: string;
}

export interface Review {
  id: string;
  projectId: string;
  customerId: string;
  vendorId: string;
  rating: number;
  comment: string | null;
  createdAt: string;
}
