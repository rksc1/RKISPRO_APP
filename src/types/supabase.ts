import type {
  MarketplaceRequestStatus,
  MilestoneCreatorRole,
  MilestoneStatus,
  ProjectStatus,
  ActivityEntityType,
  NotificationType,
  PaymentDirection,
  PaymentStatus,
  PaymentType,
  QuickBookingServiceType,
  QuickBookingStatus,
  QuickBookingUrgency,
  Role,
  VendorNotificationStatus,
  VendorQuoteStatus,
  VendorStatus,
  VendorType,
  VendorVerificationStatus
} from "@/types/auth";

type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      customers: {
        Row: {
          id: string;
          name: string;
          phone: string;
          email: string;
          password: string;
          company_name: string;
          location: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          phone: string;
          email: string;
          password: string;
          company_name: string;
          location: string;
          created_at?: string;
        };
        Update: {
          name?: string;
          phone?: string;
          email?: string;
          password?: string;
          company_name?: string;
          location?: string;
          created_at?: string;
        };
        Relationships: [];
      };
      vendors: {
        Row: {
          id: string;
          company_name: string;
          owner_name: string;
          phone: string;
          email: string;
          password: string;
          gst_number: string;
          location: string;
          services: string[];
          machinery: string[];
          capacity: string;
          worker_count: number;
          experience_years: number;
          logo_url: string | null;
          factory_images: string[];
          status: VendorStatus;
          vendor_type: VendorType;
          full_name: string | null;
          skill_categories: string[];
          service_radius_km: number | null;
          available_for_quick_booking: boolean;
          id_proof_url: string | null;
          profile_photo_url: string | null;
          workshop_address: string | null;
          workshop_images: string[];
          available_for_large_work: boolean;
          city: string | null;
          state: string | null;
          verification_status: VendorVerificationStatus;
          verification_notes: string | null;
          rating: number;
          completed_projects_count: number;
          trust_score: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          company_name: string;
          owner_name: string;
          phone: string;
          email: string;
          password: string;
          gst_number: string;
          location: string;
          services: string[];
          machinery: string[];
          capacity: string;
          worker_count: number;
          experience_years: number;
          logo_url?: string | null;
          factory_images?: string[];
          status?: VendorStatus;
          vendor_type?: VendorType;
          full_name?: string | null;
          skill_categories?: string[];
          service_radius_km?: number | null;
          available_for_quick_booking?: boolean;
          id_proof_url?: string | null;
          profile_photo_url?: string | null;
          workshop_address?: string | null;
          workshop_images?: string[];
          available_for_large_work?: boolean;
          city?: string | null;
          state?: string | null;
          verification_status?: VendorVerificationStatus;
          verification_notes?: string | null;
          rating?: number;
          completed_projects_count?: number;
          trust_score?: number;
          created_at?: string;
        };
        Update: {
          company_name?: string;
          owner_name?: string;
          phone?: string;
          email?: string;
          password?: string;
          gst_number?: string;
          location?: string;
          services?: string[];
          machinery?: string[];
          capacity?: string;
          worker_count?: number;
          experience_years?: number;
          logo_url?: string | null;
          factory_images?: string[];
          status?: VendorStatus;
          vendor_type?: VendorType;
          full_name?: string | null;
          skill_categories?: string[];
          service_radius_km?: number | null;
          available_for_quick_booking?: boolean;
          id_proof_url?: string | null;
          profile_photo_url?: string | null;
          workshop_address?: string | null;
          workshop_images?: string[];
          available_for_large_work?: boolean;
          city?: string | null;
          state?: string | null;
          verification_status?: VendorVerificationStatus;
          verification_notes?: string | null;
          rating?: number;
          completed_projects_count?: number;
          trust_score?: number;
          created_at?: string;
        };
        Relationships: [];
      };
      admins: {
        Row: {
          id: string;
          name: string;
          email: string;
          password: string;
          role: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          password: string;
          role?: string;
          created_at?: string;
        };
        Update: {
          name?: string;
          email?: string;
          password?: string;
          role?: string;
          created_at?: string;
        };
        Relationships: [];
      };
      marketplace_requests: {
        Row: {
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
        Insert: {
          id?: string;
          customer_id: string;
          project_title: string;
          description: string;
          service_type: string;
          material_type: string;
          location: string;
          deadline: string;
          drawing_urls?: string[];
          technical_requirements?: string | null;
          quantity?: string | null;
          quality_expectations?: string | null;
          budget_range?: string | null;
          inspection_requirement?: string | null;
          gst_requirement?: boolean;
          status?: MarketplaceRequestStatus;
          created_at?: string;
        };
        Update: {
          customer_id?: string;
          project_title?: string;
          description?: string;
          service_type?: string;
          material_type?: string;
          location?: string;
          deadline?: string;
          drawing_urls?: string[];
          technical_requirements?: string | null;
          quantity?: string | null;
          quality_expectations?: string | null;
          budget_range?: string | null;
          inspection_requirement?: string | null;
          gst_requirement?: boolean;
          status?: MarketplaceRequestStatus;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "marketplace_requests_customer_id_fkey";
            columns: ["customer_id"];
            isOneToOne: false;
            referencedRelation: "customers";
            referencedColumns: ["id"];
          }
        ];
      };
      vendor_notifications: {
        Row: {
          id: string;
          vendor_id: string;
          request_id: string;
          status: VendorNotificationStatus;
          quote_amount: number | null;
          quote_notes: string | null;
          quote_file_urls: string[];
          created_at: string;
        };
        Insert: {
          id?: string;
          vendor_id: string;
          request_id: string;
          status?: VendorNotificationStatus;
          quote_amount?: number | null;
          quote_notes?: string | null;
          quote_file_urls?: string[];
          created_at?: string;
        };
        Update: {
          vendor_id?: string;
          request_id?: string;
          status?: VendorNotificationStatus;
          quote_amount?: number | null;
          quote_notes?: string | null;
          quote_file_urls?: string[];
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "vendor_notifications_vendor_id_fkey";
            columns: ["vendor_id"];
            isOneToOne: false;
            referencedRelation: "vendors";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "vendor_notifications_request_id_fkey";
            columns: ["request_id"];
            isOneToOne: false;
            referencedRelation: "marketplace_requests";
            referencedColumns: ["id"];
          }
        ];
      };
      vendor_quotes: {
        Row: {
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
        Insert: {
          id?: string;
          vendor_id: string;
          request_id: string;
          amount: number;
          timeline: string;
          notes: string;
          attachment_url?: string | null;
          status?: VendorQuoteStatus;
          admin_notes?: string | null;
          risk_notes?: string | null;
          is_recommended?: boolean;
          execution_fit_score?: number | null;
          reviewed_at?: string | null;
          reviewed_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          vendor_id?: string;
          request_id?: string;
          amount?: number;
          timeline?: string;
          notes?: string;
          attachment_url?: string | null;
          status?: VendorQuoteStatus;
          admin_notes?: string | null;
          risk_notes?: string | null;
          is_recommended?: boolean;
          execution_fit_score?: number | null;
          reviewed_at?: string | null;
          reviewed_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "vendor_quotes_vendor_id_fkey";
            columns: ["vendor_id"];
            isOneToOne: false;
            referencedRelation: "vendors";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "vendor_quotes_request_id_fkey";
            columns: ["request_id"];
            isOneToOne: false;
            referencedRelation: "marketplace_requests";
            referencedColumns: ["id"];
          }
        ];
      };
      projects: {
        Row: {
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
        Insert: {
          id?: string;
          request_id: string;
          customer_id: string;
          vendor_id: string;
          quote_id: string;
          status?: ProjectStatus;
          start_date?: string | null;
          expected_delivery_date?: string | null;
          actual_delivery_date?: string | null;
          project_value: number;
          commission_percentage?: number;
          commission_amount: number;
          admin_notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          request_id?: string;
          customer_id?: string;
          vendor_id?: string;
          quote_id?: string;
          status?: ProjectStatus;
          start_date?: string | null;
          expected_delivery_date?: string | null;
          actual_delivery_date?: string | null;
          project_value?: number;
          commission_percentage?: number;
          commission_amount?: number;
          admin_notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "projects_request_id_fkey";
            columns: ["request_id"];
            isOneToOne: false;
            referencedRelation: "marketplace_requests";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "projects_customer_id_fkey";
            columns: ["customer_id"];
            isOneToOne: false;
            referencedRelation: "customers";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "projects_vendor_id_fkey";
            columns: ["vendor_id"];
            isOneToOne: false;
            referencedRelation: "vendors";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "projects_quote_id_fkey";
            columns: ["quote_id"];
            isOneToOne: false;
            referencedRelation: "vendor_quotes";
            referencedColumns: ["id"];
          }
        ];
      };
      project_milestones: {
        Row: {
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
        Insert: {
          id?: string;
          project_id: string;
          title: string;
          description?: string | null;
          status?: MilestoneStatus;
          attachment_urls?: string[];
          due_date?: string | null;
          completed_at?: string | null;
          created_by_role: MilestoneCreatorRole;
          created_by_id: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          project_id?: string;
          title?: string;
          description?: string | null;
          status?: MilestoneStatus;
          attachment_urls?: string[];
          due_date?: string | null;
          completed_at?: string | null;
          created_by_role?: MilestoneCreatorRole;
          created_by_id?: string;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "project_milestones_project_id_fkey";
            columns: ["project_id"];
            isOneToOne: false;
            referencedRelation: "projects";
            referencedColumns: ["id"];
          }
        ];
      };
      project_messages: {
        Row: {
          id: string;
          project_id: string;
          sender_role: Role;
          sender_id: string;
          content: string;
          attachment_urls: string[];
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          project_id: string;
          sender_role: Role;
          sender_id: string;
          content: string;
          attachment_urls?: string[];
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          project_id?: string;
          sender_role?: Role;
          sender_id?: string;
          content?: string;
          attachment_urls?: string[];
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "project_messages_project_id_fkey";
            columns: ["project_id"];
            isOneToOne: false;
            referencedRelation: "projects";
            referencedColumns: ["id"];
          }
        ];
      };
      notifications: {
        Row: {
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
        Insert: {
          id?: string;
          user_role: Role;
          user_id: string;
          title: string;
          message: string;
          type?: NotificationType;
          link?: string | null;
          is_read?: boolean;
          created_at?: string;
        };
        Update: {
          user_role?: Role;
          user_id?: string;
          title?: string;
          message?: string;
          type?: NotificationType;
          link?: string | null;
          is_read?: boolean;
          created_at?: string;
        };
        Relationships: [];
      };
      activity_logs: {
        Row: {
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
        Insert: {
          id?: string;
          actor_role: Role;
          actor_id?: string | null;
          entity_type: ActivityEntityType | string;
          entity_id?: string | null;
          action: string;
          description?: string | null;
          metadata?: Json | null;
          created_at?: string;
        };
        Update: {
          actor_role?: Role;
          actor_id?: string | null;
          entity_type?: ActivityEntityType | string;
          entity_id?: string | null;
          action?: string;
          description?: string | null;
          metadata?: Json | null;
          created_at?: string;
        };
        Relationships: [];
      };
      payments: {
        Row: {
          id: string;
          project_id: string;
          customer_id: string;
          vendor_id: string;
          payment_type: PaymentType;
          payment_direction: PaymentDirection;
          amount: number;
          status: PaymentStatus;
          payment_method: string | null;
          reference_number: string | null;
          notes: string | null;
          razorpay_order_id: string | null;
          razorpay_payment_id: string | null;
          razorpay_signature: string | null;
          razorpay_status: string | null;
          failure_reason: string | null;
          gateway_response: Json | null;
          created_by_role: Role;
          created_by_id: string | null;
          paid_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          project_id: string;
          customer_id: string;
          vendor_id: string;
          payment_type: PaymentType;
          payment_direction: PaymentDirection;
          amount: number;
          status?: PaymentStatus;
          payment_method?: string | null;
          reference_number?: string | null;
          notes?: string | null;
          razorpay_order_id?: string | null;
          razorpay_payment_id?: string | null;
          razorpay_signature?: string | null;
          razorpay_status?: string | null;
          failure_reason?: string | null;
          gateway_response?: Json | null;
          created_by_role: Role;
          created_by_id?: string | null;
          paid_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          project_id?: string;
          customer_id?: string;
          vendor_id?: string;
          payment_type?: PaymentType;
          payment_direction?: PaymentDirection;
          amount?: number;
          status?: PaymentStatus;
          payment_method?: string | null;
          reference_number?: string | null;
          notes?: string | null;
          razorpay_order_id?: string | null;
          razorpay_payment_id?: string | null;
          razorpay_signature?: string | null;
          razorpay_status?: string | null;
          failure_reason?: string | null;
          gateway_response?: Json | null;
          created_by_role?: Role;
          created_by_id?: string | null;
          paid_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "payments_project_id_fkey";
            columns: ["project_id"];
            isOneToOne: false;
            referencedRelation: "projects";
            referencedColumns: ["id"];
          }
        ];
      };
      project_financials: {
        Row: {
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
        Insert: {
          id?: string;
          project_id: string;
          project_value?: number;
          advance_received?: number;
          total_received?: number;
          vendor_paid?: number;
          commission_percentage?: number;
          commission_amount?: number;
          pending_customer_balance?: number;
          pending_vendor_payout?: number;
          profit_amount?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          project_id?: string;
          project_value?: number;
          advance_received?: number;
          total_received?: number;
          vendor_paid?: number;
          commission_percentage?: number;
          commission_amount?: number;
          pending_customer_balance?: number;
          pending_vendor_payout?: number;
          profit_amount?: number;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "project_financials_project_id_fkey";
            columns: ["project_id"];
            isOneToOne: true;
            referencedRelation: "projects";
            referencedColumns: ["id"];
          }
        ];
      };
      quick_bookings: {
        Row: {
          id: string;
          customer_id: string;
          service_type: QuickBookingServiceType;
          title: string;
          description: string | null;
          location: string;
          preferred_date: string | null;
          preferred_time: string | null;
          urgency: QuickBookingUrgency;
          budget: number | null;
          images: string[];
          contact_name: string | null;
          contact_phone: string | null;
          site_access_notes: string | null;
          machine_or_equipment: string | null;
          issue_started_at: string | null;
          safety_requirements: string | null;
          status: QuickBookingStatus;
          assigned_vendor_id: string | null;
          assigned_worker_name: string | null;
          assigned_worker_phone: string | null;
          admin_notes: string | null;
          vendor_notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          customer_id: string;
          service_type: QuickBookingServiceType;
          title: string;
          description?: string | null;
          location: string;
          preferred_date?: string | null;
          preferred_time?: string | null;
          urgency?: QuickBookingUrgency;
          budget?: number | null;
          images?: string[];
          contact_name?: string | null;
          contact_phone?: string | null;
          site_access_notes?: string | null;
          machine_or_equipment?: string | null;
          issue_started_at?: string | null;
          safety_requirements?: string | null;
          status?: QuickBookingStatus;
          assigned_vendor_id?: string | null;
          assigned_worker_name?: string | null;
          assigned_worker_phone?: string | null;
          admin_notes?: string | null;
          vendor_notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          customer_id?: string;
          service_type?: QuickBookingServiceType;
          title?: string;
          description?: string | null;
          location?: string;
          preferred_date?: string | null;
          preferred_time?: string | null;
          urgency?: QuickBookingUrgency;
          budget?: number | null;
          images?: string[];
          contact_name?: string | null;
          contact_phone?: string | null;
          site_access_notes?: string | null;
          machine_or_equipment?: string | null;
          issue_started_at?: string | null;
          safety_requirements?: string | null;
          status?: QuickBookingStatus;
          assigned_vendor_id?: string | null;
          assigned_worker_name?: string | null;
          assigned_worker_phone?: string | null;
          admin_notes?: string | null;
          vendor_notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "quick_bookings_customer_id_fkey";
            columns: ["customer_id"];
            isOneToOne: false;
            referencedRelation: "customers";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "quick_bookings_assigned_vendor_id_fkey";
            columns: ["assigned_vendor_id"];
            isOneToOne: false;
            referencedRelation: "vendors";
            referencedColumns: ["id"];
          }
        ];
      };
      reviews: {
        Row: {
          id: string;
          project_id: string;
          customer_id: string;
          vendor_id: string;
          rating: number;
          comment: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          project_id: string;
          customer_id: string;
          vendor_id: string;
          rating: number;
          comment?: string | null;
          created_at?: string;
        };
        Update: {
          project_id?: string;
          customer_id?: string;
          vendor_id?: string;
          rating?: number;
          comment?: string | null;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "reviews_project_id_fkey";
            columns: ["project_id"];
            isOneToOne: true;
            referencedRelation: "projects";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "reviews_customer_id_fkey";
            columns: ["customer_id"];
            isOneToOne: false;
            referencedRelation: "customers";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "reviews_vendor_id_fkey";
            columns: ["vendor_id"];
            isOneToOne: false;
            referencedRelation: "vendors";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};

export type { Json };
