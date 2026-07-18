export type ProjectFinancialRow = {
  id: string;
  project_id: string;
  project_value: number;
  advance_received: number;
  total_received: number;
  vendor_paid: number;
  commission_percentage: number;
  commission_amount: number;
  pending_customer_balance: number;
  pending_vendor_payout: number;
  profit_amount: number;
  created_at: string;
  updated_at: string;
};

export type ProjectFinancial = {
  id: string;
  projectId: string;
  projectValue: number;
  advanceReceived: number;
  totalReceived: number;
  vendorPaid: number;
  commissionPercentage: number;
  commissionAmount: number;
  pendingCustomerBalance: number;
  pendingVendorPayout: number;
  profitAmount: number;
  createdAt: string;
  updatedAt: string;
};
