/* CONFIGURAÇÃO DO SUPABASE */

const SUPABASE_URL = "https://biybukmmwrrhvwsgwqff.supabase.co";

const SUPABASE_ANON_KEY = "sb_publishable_e8ZNRG4-tRkiGHCV2Dx_Dw_ZrvXdOt7";

const supabaseClient = supabase.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
);

console.log("✅ Supabase conectado.");