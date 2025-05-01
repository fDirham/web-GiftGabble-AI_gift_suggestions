import { createClient } from "@supabase/supabase-js";

export function createSupabaseClient() {
  const isDummyMode = process.env.API_DUMMY_MODE !== "0";
  if (!isDummyMode) {
    return createClient(
      process.env.SUPABASE_PROD_API_URL ?? "",
      process.env.SUPABASE_PROD_SUPER_KEY ?? ""
    );
  } else {
    return createClient(
      process.env.SUPABASE_API_URL ?? "",
      process.env.SUPABASE_SUPER_KEY ?? ""
    );
  }
}
