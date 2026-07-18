export type Role = "customer" | "vendor" | "admin";

export type SessionPayload = {
  id: string;
  role: Role;
  name: string;
  email: string;
  emailConfirmedAt: string;
};

export type VendorStatus = "Pending" | "Approved" | "Rejected" | "Inactive";

export type VendorType = "individual" | "company";

export type VendorVerificationStatus = "pending" | "verified" | "rejected";

export type MarketplaceRequestStatus = "Pending" | "Approved" | "Rejected" | "Distributed" | "quotes_ready" | "awarded";

export type VendorNotificationStatus = "Sent" | "Viewed" | "Quoted" | "awarded";

export type VendorQuoteStatus = "pending" | "approved" | "rejected" | "selected" | "not_selected";

export type ProjectStatus = "awarded" | "in_progress" | "on_hold" | "completed" | "cancelled";

export type MilestoneStatus = "pending" | "in_progress" | "in_review" | "completed" | "delayed" | "cancelled";

export type MilestoneCreatorRole = "admin" | "vendor";

export type NotificationType = "info" | "success" | "warning" | "error";

export type ActivityEntityType = "rfq" | "quote" | "project" | "milestone" | "vendor";

export type PaymentType = "advance" | "milestone" | "final" | "refund" | "commission";

export type PaymentDirection = "customer_to_platform" | "platform_to_vendor" | "customer_to_vendor";

export type PaymentStatus = "pending" | "paid" | "failed" | "refunded";

export type QuickBookingServiceType =
  | "welder"
  | "mechanic"
  | "repair"
  | "installer"
  | "maintenance"
  | "electrician"
  | "plumber"
  | "helper"
  | "welding_repair"
  | "fabrication_repair"
  | "machine_mechanic"
  | "cnc_machine_service"
  | "lathe_machine_service"
  | "electrical_repair"
  | "industrial_electrician"
  | "ac_repair"
  | "hvac_service"
  | "plumbing_repair"
  | "compressor_service"
  | "pump_motor_service"
  | "generator_service"
  | "panel_repair"
  | "installation_support"
  | "maintenance_visit"
  | "breakdown_support"
  | "inspection_visit"
  | "helper_manpower"
  | "other_site_service";

export type QuickBookingUrgency = "normal" | "urgent" | "emergency";

export type QuickBookingStatus = "pending" | "assigned" | "accepted" | "in_progress" | "completed" | "cancelled";
