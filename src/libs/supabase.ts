import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_KEY;

if (!SUPABASE_URL) {
  throw new Error("missing env.NEXT_PULIC_SUPABASE_URL");
}
if (!SUPABASE_KEY) {
  throw new Error("missing env.NEXT_PULIC_SUPABASE_KEY");
}
export const client = createClient(SUPABASE_URL, SUPABASE_KEY);

export const getTitles = async () => {
  const { data, error } = await client
    .from("manga_title")
    .select("*")
    .order("title");
  if (!error && data) {
    return data;
  }
  return [];
};

export const getSubtitles = async (id: string) => {
  let { data, error } = await client
    .from("manga_title")
    .select("*")
    .eq("id", id);
  if (!error && data) {
    const title = data[0];
    ({ data, error } = await client
      .from("manga_subtitle")
      .select("*")
      .order("volume", { ascending: true })
      .eq("title_id", id));
    if (!error && data) {
      return { title: title, subtitle: data };
    } else {
      return { title: title, subtitle: null };
    }
  }
  return { title: null, subtitle: null };
};

export const getProfile = async () => {
  const { data, error } = await client.from("profile").select("*");
  if (!error && data) {
    return data[0];
  }
  return null;
};
