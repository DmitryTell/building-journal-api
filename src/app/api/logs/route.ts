import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const sortParam = searchParams.get("sort");
    const dateFilter = searchParams.get("date");
    let query = supabase
      .from("work_logs")
      .select("id, date, work_name, volume, unit, worker_name");

    if (dateFilter) {
      query = query.eq("date", dateFilter);
    }

    if (sortParam === "asc" || sortParam === "desc") {
      query = query.order("date", { ascending: sortParam === "asc" });
    }

    const { data, error } = await query;

    if (error) throw error;

    return NextResponse.json(data, { status: 200 });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Неизвестная ошибка сервера";

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
