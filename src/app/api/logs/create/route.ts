import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { work_name, volume, unit, worker_name } = body;

    if (!work_name || !volume || !unit || !worker_name) {
      return NextResponse.json(
        {
          error: "Все поля (work_name, volume, unit, worker_name) обязательны",
        },
        { status: 400 },
      );
    }

    const autoDate = new Date().toISOString().split("T")[0];
    const { data, error } = await supabase
      .from("work_logs")
      .insert([
        {
          date: autoDate,
          work_name,
          volume,
          unit,
          worker_name,
        },
      ])
      .select();

    if (error) throw error;

    return NextResponse.json(data[0], { status: 201 });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : JSON.stringify(error);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
