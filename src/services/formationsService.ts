import supabase from "@/supabase";
import { Formation } from "@/types/database";

// Public : récupérer uniquement les publiées
export async function getFormations(): Promise<Formation[]> {
  const { data, error } = await supabase
    .from("formations")
    .select("*")
    .eq("is_published", true)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data || [];
}

// Admin : toutes les formations
export async function getAllFormations(): Promise<Formation[]> {
  const { data, error } = await supabase
    .from("formations")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function createFormation(formation: Partial<Formation>) {
  const { data, error } = await supabase
    .from("formations")
    .insert([formation])
    .select();

  if (error) throw error;
  return data;
}

export async function updateFormation(id: number, updates: Partial<Formation>) {
  const { data, error } = await supabase
    .from("formations")
    .update(updates)
    .eq("id", id)
    .select();

  if (error) throw error;
  return data;
}

export async function deleteFormation(id: number) {
  const { error } = await supabase.from("formations").delete().eq("id", id);
  if (error) throw error;
}
