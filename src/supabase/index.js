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

export async function uploadImagePaste(imageFile) {
  const { data, error } = await supabase.storage
    .from("paste-files-bucket")
    .upload(`images/${Date.now()}_${imageFile.name}`, imageFile, {
      cacheControl: "3600",
      upsert: false,
    });
  if (error) return { error };
  const imageUrl = `https://nulsuzurtwplzkhfzxce.supabase.co/storage/v1/object/public/${data.Key}`;
  const { data: newPaste, nerror } = await supabase.from("pastes").insert([
    {
      paste_type: "image",
      text_content: imageFile.name,
      file_name: imageFile.name,
      file_type: "image",
      file_url: imageUrl,
      file_size: Math.round((imageFile.size / 1e6) * 10) / 10,
    },
  ]);

  return { data: newPaste, error: nerror };
}
function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

export async function uploadFilePaste(file) {
  const { data, error } = await supabase.storage
    .from("paste-files-bucket")
    .upload(`files/${Date.now()}_${file.name}`, file, {
      cacheControl: "3600",
      upsert: false,
    });
  if (error) {
    console.log(error.message);
    return { error };
  }
  const fileUrl = `https://nulsuzurtwplzkhfzxce.supabase.co/storage/v1/object/public/${data.Key}`;
  const { data: newPaste, nerror } = await supabase.from("pastes").insert([
    {
      paste_type: "file",
      text_content: file.name,
      file_name: file.name,
      file_type: file.type,
      file_url: fileUrl,
      file_size: formatBytes(file.size),
    },
  ]);

  return { data: newPaste, error: nerror };
}
