import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    "Критическая ошибка: Пропущены переменные окружения для Supabase. Проверь .env.local или настройки Vercel.",
  );
}

export const supabase = createClient(supabaseUrl, supabaseKey);
