// src/types.ts

// =====================================================
// GÉNÉRAL
// =====================================================

export type Timestamp = string; // Stockage sous forme ISO string (ex: 2025-08-17T21:00:00Z)


// =====================================================
// PRESTATIONS
// =====================================================

export type Prestation = {
  id: number;
  title: string;
  description: string | null;
  price_mad: number | null;
  duration_days: number | null;
  category: string | null;
  image_url: string | null;
  is_published: boolean;
  created_at: Timestamp;
  updated_at: Timestamp;
};


// =====================================================
// CLIENTS
// =====================================================

export type Client = {
  id: number;
  company_name: string;
  contact_name: string | null;
  email: string | null;
  phone: string | null;
  address: string | null;
  logo_url: string | null;
  created_at: Timestamp;
  updated_at: Timestamp;
};


// =====================================================
// FORMATIONS
// =====================================================

export type Category = {
  id: number;
  slug: string;
  name: string;
  order_index: number;
};

export type Formation = {
  id: number;
  category_id: number | null;
  title: string;
  city: string | null;
  short_desc: string | null;
  duration_days: number | null;
  price_mad: number | null;
  image_url: string | null;
  is_published: boolean;
  created_at: Timestamp;
  updated_at: Timestamp;
};

export type SafetyActivity = {
  id: string;
  title: string;
  description: string | null;
  image_url: string | null;
  tags: string[] | null;
  created_at: string;
};

