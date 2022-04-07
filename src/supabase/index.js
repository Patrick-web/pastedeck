import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://nulsuzurtwplzkhfzxce.supabase.co";
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);

export async function getAllPastes() {
  let { data: pastes, error } = await supabase
    .from("pastes")
    .select("*")
    .order("created_at", { ascending: false });
  return { pastes, error };
}

export async function uploadTextBasedPaste(paste) {
  const { data, error } = await supabase
    .from("pastes")
    .insert([{ paste_type: paste.type, text_content: paste.textContent }]);

  return { data, error };
}
