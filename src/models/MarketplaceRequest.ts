import type { MarketplaceRequestStatus } from "@/types/auth";

export type MarketplaceRequestRow = {
  id: string;
  customer_id: string;
  project_title: string;
  description: string;
  service_type: string;
  material_type: string;
  location: string;
  deadline: string;
  drawing_urls: string[];
  technical_requirements: string | null;
  quantity: string | null;
  quality_expectations: string | null;
  budget_range: string | null;
  inspection_requirement: string | null;
  gst_requirement: boolean;
  status: MarketplaceRequestStatus;
  created_at: string;
};

export type MarketplaceRequest = {
  id: string;
  customerId: string;
  projectTitle: string;
  description: string;
  serviceType: string;
  materialType: string;
  location: string;
  deadline: string;
  drawingUrls: string[];
  technicalRequirements: string | null;
  quantity: string | null;
  qualityExpectations: string | null;
  budgetRange: string | null;
  inspectionRequirement: string | null;
  gstRequirement: boolean;
  status: MarketplaceRequestStatus;
  createdAt: string;
};
