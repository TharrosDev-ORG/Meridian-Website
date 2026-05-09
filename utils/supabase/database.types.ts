// Auto-generated from Supabase via MCP (project: dsyiuztquzkcikehkigv).
// Re-generate with: npx supabase gen types typescript --project-id dsyiuztquzkcikehkigv
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      archival_audit_logs: {
        Row: {
          action: string
          actor_role: string
          created_at: string | null
          details: Json | null
          id: string
          ip_address: string | null
          target_id: string | null
        }
        Insert: {
          action: string
          actor_role: string
          created_at?: string | null
          details?: Json | null
          id?: string
          ip_address?: string | null
          target_id?: string | null
        }
        Update: {
          action?: string
          actor_role?: string
          created_at?: string | null
          details?: Json | null
          id?: string
          ip_address?: string | null
          target_id?: string | null
        }
        Relationships: []
      }
      archival_settings: {
        Row: { key: string; updated_at: string | null; value: string }
        Insert: { key: string; updated_at?: string | null; value: string }
        Update: { key?: string; updated_at?: string | null; value?: string }
        Relationships: []
      }
      event_registrations: {
        Row: {
          attended: boolean
          attended_at: string | null
          created_at: string | null
          email: string | null
          event_id: string
          id: string
          member_id: string
          member_name: string | null
          qr_code_token: string | null
        }
        Insert: {
          attended?: boolean
          attended_at?: string | null
          created_at?: string | null
          email?: string | null
          event_id: string
          id?: string
          member_id: string
          member_name?: string | null
          qr_code_token?: string | null
        }
        Update: {
          attended?: boolean
          attended_at?: string | null
          created_at?: string | null
          email?: string | null
          event_id?: string
          id?: string
          member_id?: string
          member_name?: string | null
          qr_code_token?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "event_registrations_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "event_registrations_member_id_fkey"
            columns: ["member_id"]
            isOneToOne: false
            referencedRelation: "members"
            referencedColumns: ["id"]
          },
        ]
      }
      events: {
        Row: {
          capacity: number
          created_at: string | null
          date: string
          description: string | null
          id: string
          is_members_only: boolean | null
          location: string
          name: string
          rsvp_count: number | null
          status: string | null
        }
        Insert: {
          capacity: number
          created_at?: string | null
          date: string
          description?: string | null
          id?: string
          is_members_only?: boolean | null
          location: string
          name: string
          rsvp_count?: number | null
          status?: string | null
        }
        Update: {
          capacity?: number
          created_at?: string | null
          date?: string
          description?: string | null
          id?: string
          is_members_only?: boolean | null
          location?: string
          name?: string
          rsvp_count?: number | null
          status?: string | null
        }
        Relationships: []
      }
      members: {
        Row: {
          accepted_terms: boolean
          created_at: string
          email: string
          full_name: string
          heard_from: Database["public"]["Enums"]["referral_source"]
          id: string
          institution: Database["public"]["Enums"]["institution_name"]
          institution_other: string | null
          interests: string[]
          is_verified: boolean | null
          join_date_readable: string | null
          member_number: string | null
          role: Database["public"]["Enums"]["member_role"]
          role_other: string | null
          status: string
          volunteer_interest: Database["public"]["Enums"]["volunteer_level"]
        }
        Insert: {
          accepted_terms?: boolean
          created_at?: string
          email: string
          full_name: string
          heard_from: Database["public"]["Enums"]["referral_source"]
          id?: string
          institution: Database["public"]["Enums"]["institution_name"]
          institution_other?: string | null
          interests: string[]
          is_verified?: boolean | null
          join_date_readable?: string | null
          member_number?: string | null
          role: Database["public"]["Enums"]["member_role"]
          role_other?: string | null
          status?: string
          volunteer_interest: Database["public"]["Enums"]["volunteer_level"]
        }
        Update: {
          accepted_terms?: boolean
          created_at?: string
          email?: string
          full_name?: string
          heard_from?: Database["public"]["Enums"]["referral_source"]
          id?: string
          institution?: Database["public"]["Enums"]["institution_name"]
          institution_other?: string | null
          interests?: string[]
          is_verified?: boolean | null
          join_date_readable?: string | null
          member_number?: string | null
          role?: Database["public"]["Enums"]["member_role"]
          role_other?: string | null
          status?: string
          volunteer_interest?: Database["public"]["Enums"]["volunteer_level"]
        }
        Relationships: []
      }
      porter_rate_limits: {
        Row: {
          count: number
          fingerprint: string
          first_at: number
          locked_until: number | null
        }
        Insert: {
          count?: number
          fingerprint: string
          first_at: number
          locked_until?: number | null
        }
        Update: {
          count?: number
          fingerprint?: string
          first_at?: number
          locked_until?: number | null
        }
        Relationships: []
      }
      security_intercepts: {
        Row: {
          created_at: string | null
          details: string | null
          id: string
          intercept_type: string
          ip_address: string | null
          payload: Json | null
          user_agent: string | null
        }
        Insert: {
          created_at?: string | null
          details?: string | null
          id?: string
          intercept_type: string
          ip_address?: string | null
          payload?: Json | null
          user_agent?: string | null
        }
        Update: {
          created_at?: string | null
          details?: string | null
          id?: string
          intercept_type?: string
          ip_address?: string | null
          payload?: Json | null
          user_agent?: string | null
        }
        Relationships: []
      }
      site_stats: {
        Row: { id: string; last_updated: string | null; member_count: number | null }
        Insert: { id: string; last_updated?: string | null; member_count?: number | null }
        Update: { id?: string; last_updated?: string | null; member_count?: number | null }
        Relationships: []
      }
      speaker_activity_log: {
        Row: {
          application_id: string | null
          created_at: string | null
          detail: string | null
          id: string
          summary: string
          type: string
        }
        Insert: {
          application_id?: string | null
          created_at?: string | null
          detail?: string | null
          id?: string
          summary: string
          type: string
        }
        Update: {
          application_id?: string | null
          created_at?: string | null
          detail?: string | null
          id?: string
          summary?: string
          type?: string
        }
        Relationships: []
      }
      speaker_applications: {
        Row: {
          additional_notes: string | null
          availability: string | null
          bio: string
          classification: string | null
          created_at: string | null
          email: string
          expertise: string[] | null
          full_name: string
          id: string
          is_flagged: boolean | null
          key_takeaways: string | null
          linkedin_url: string | null
          location_constraints: string | null
          organization: string | null
          portfolio_link: string | null
          preferred_format: string[] | null
          previous_experience: boolean | null
          proposed_title: string
          referral_source: string | null
          role_title: string
          social_media: string | null
          status: string | null
          topic_overview: string
          updated_at: string | null
        }
        Insert: {
          additional_notes?: string | null
          availability?: string | null
          bio: string
          classification?: string | null
          created_at?: string | null
          email: string
          expertise?: string[] | null
          full_name: string
          id?: string
          is_flagged?: boolean | null
          key_takeaways?: string | null
          linkedin_url?: string | null
          location_constraints?: string | null
          organization?: string | null
          portfolio_link?: string | null
          preferred_format?: string[] | null
          previous_experience?: boolean | null
          proposed_title: string
          referral_source?: string | null
          role_title: string
          social_media?: string | null
          status?: string | null
          topic_overview: string
          updated_at?: string | null
        }
        Update: {
          additional_notes?: string | null
          availability?: string | null
          bio?: string
          classification?: string | null
          created_at?: string | null
          email?: string
          expertise?: string[] | null
          full_name?: string
          id?: string
          is_flagged?: boolean | null
          key_takeaways?: string | null
          linkedin_url?: string | null
          location_constraints?: string | null
          organization?: string | null
          portfolio_link?: string | null
          preferred_format?: string[] | null
          previous_experience?: boolean | null
          proposed_title?: string
          referral_source?: string | null
          role_title?: string
          social_media?: string | null
          status?: string | null
          topic_overview?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      speaker_notes: {
        Row: {
          application_id: string | null
          author: string | null
          body: string
          created_at: string | null
          id: string
        }
        Insert: {
          application_id?: string | null
          author?: string | null
          body: string
          created_at?: string | null
          id?: string
        }
        Update: {
          application_id?: string | null
          author?: string | null
          body?: string
          created_at?: string | null
          id?: string
        }
        Relationships: []
      }
      speaker_portal_settings: {
        Row: {
          alerts_on_new: boolean | null
          default_view: string | null
          density: string | null
          id: string
          security_heartbeat: boolean | null
          submissions_open: boolean | null
          updated_at: string | null
          weekly_digest: boolean | null
        }
        Insert: {
          alerts_on_new?: boolean | null
          default_view?: string | null
          density?: string | null
          id?: string
          security_heartbeat?: boolean | null
          submissions_open?: boolean | null
          updated_at?: string | null
          weekly_digest?: boolean | null
        }
        Update: {
          alerts_on_new?: boolean | null
          default_view?: string | null
          density?: string | null
          id?: string
          security_heartbeat?: boolean | null
          submissions_open?: boolean | null
          updated_at?: string | null
          weekly_digest?: boolean | null
        }
        Relationships: []
      }
      system_config: {
        Row: { key: string; updated_at: string | null; value: string }
        Insert: { key: string; updated_at?: string | null; value: string }
        Update: { key?: string; updated_at?: string | null; value?: string }
        Relationships: []
      }
      system_settings: {
        Row: { key: string; updated_at: string | null; value: string }
        Insert: { key: string; updated_at?: string | null; value: string }
        Update: { key?: string; updated_at?: string | null; value?: string }
        Relationships: []
      }
    }
    Views: { [_ in never]: never }
    Functions: {
      check_member_status: { Args: { p_identifier: string }; Returns: boolean }
      format_member_date: { Args: { p_date: string }; Returns: string }
      generate_member_number: { Args: never; Returns: string }
      get_event_registrations_secure: {
        Args: { p_admin_secret: string; p_event_id: string }
        Returns: {
          attended: boolean
          created_at: string
          current_verified_status: boolean
          email: string
          id: string
          member_name: string
          member_number: string
          qr_code_token: string
        }[]
      }
      get_member_details: {
        Args: { p_identifier: string }
        Returns: {
          accepted_terms: boolean
          created_at: string
          email: string
          full_name: string
          heard_from: Database["public"]["Enums"]["referral_source"]
          id: string
          institution: Database["public"]["Enums"]["institution_name"]
          institution_other: string | null
          interests: string[]
          is_verified: boolean | null
          join_date_readable: string | null
          member_number: string | null
          role: Database["public"]["Enums"]["member_role"]
          role_other: string | null
          status: string
          volunteer_interest: Database["public"]["Enums"]["volunteer_level"]
        }[]
      }
      get_member_registry_secure: {
        Args: { p_admin_secret: string }
        Returns: {
          accepted_terms: boolean
          created_at: string
          email: string
          full_name: string
          heard_from: Database["public"]["Enums"]["referral_source"]
          id: string
          institution: Database["public"]["Enums"]["institution_name"]
          institution_other: string | null
          interests: string[]
          is_verified: boolean | null
          join_date_readable: string | null
          member_number: string | null
          role: Database["public"]["Enums"]["member_role"]
          role_other: string | null
          status: string
          volunteer_interest: Database["public"]["Enums"]["volunteer_level"]
        }[]
      }
      get_members_secure: {
        Args: {
          p_admin_secret: string
          p_limit?: number
          p_offset?: number
          p_search?: string
        }
        Returns: {
          created_at: string
          email: string
          full_name: string
          id: string
          is_verified: boolean
          member_number: string
          status: string
        }[]
      }
      get_system_setting: { Args: { p_key: string }; Returns: string }
      initialize_archival_vault: { Args: { p_secret: string }; Returns: string }
      initialize_system_vault: { Args: { p_secret: string }; Returns: string }
      log_archival_action: {
        Args: {
          p_action: string
          p_details?: Json
          p_role: string
          p_target_id: string
        }
        Returns: undefined
      }
      public_register_member_for_event: {
        Args: { p_event_id: string; p_member_number: string }
        Returns: Json
      }
      resolve_member_identity: {
        Args: { p_email: string; p_full_name: string }
        Returns: string
      }
      secure_archive_event: {
        Args: { p_admin_secret: string; p_event_id: string }
        Returns: Json
      }
      secure_check_in_by_member: {
        Args: {
          p_admin_secret: string
          p_event_id: string
          p_member_number: string
        }
        Returns: Json
      }
      secure_create_event: {
        Args: {
          p_admin_secret: string
          p_capacity: number
          p_date: string
          p_description: string
          p_is_members_only: boolean
          p_location: string
          p_name: string
        }
        Returns: Json
      }
      secure_delete_ticket: {
        Args: { p_admin_secret: string; p_registration_id: string }
        Returns: Json
      }
      secure_force_check_in: {
        Args: { p_admin_secret: string; p_registration_id: string }
        Returns: Json
      }
      secure_issue_ticket: {
        Args: {
          p_admin_secret: string
          p_event_id: string
          p_member_number: string
        }
        Returns: Json
      }
      secure_register_for_event: {
        Args: { p_email: string; p_event_id: string; p_member_name: string }
        Returns: Json
      }
      secure_update_event:
        | {
            Args: {
              p_admin_secret: string
              p_capacity: number
              p_date: string
              p_description: string
              p_event_id: string
              p_is_members_only: boolean
              p_location: string
              p_name: string
            }
            Returns: Json
          }
        | {
            Args: {
              p_admin_secret: string
              p_capacity: number
              p_date: string
              p_description: string
              p_event_id: string
              p_is_members_only: boolean
              p_location: string
              p_logistics_notes: string
              p_name: string
              p_vendor_registry: Json
            }
            Returns: Json
          }
      update_speaker_portal_settings: {
        Args: {
          p_alerts_on_new: boolean
          p_default_view: string
          p_density: string
          p_security_heartbeat: boolean
          p_submissions_open: boolean
          p_weekly_digest: boolean
        }
        Returns: undefined
      }
      verify_master_signature: { Args: { p_hash: string }; Returns: boolean }
    }
    Enums: {
      institution_name:
        | "Carleton University"
        | "University of Ottawa"
        | "Algonquin College"
        | "Other"
      member_role:
        | "Student"
        | "Alumni"
        | "Professor / Faculty"
        | "Professional"
        | "Other"
      referral_source:
        | "Friend or Peer"
        | "Professor"
        | "Social Media"
        | "Campus Event"
        | "Current Member"
      volunteer_level: "Yes" | "Maybe" | "Not at this time"
    }
    CompositeTypes: { [_ in never]: never }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      institution_name: [
        "Carleton University",
        "University of Ottawa",
        "Algonquin College",
        "Other",
      ],
      member_role: [
        "Student",
        "Alumni",
        "Professor / Faculty",
        "Professional",
        "Other",
      ],
      referral_source: [
        "Friend or Peer",
        "Professor",
        "Social Media",
        "Campus Event",
        "Current Member",
      ],
      volunteer_level: ["Yes", "Maybe", "Not at this time"],
    },
  },
} as const
