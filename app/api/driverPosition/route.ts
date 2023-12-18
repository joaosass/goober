import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const url = new URL(req?.url || '');
  const id = new URLSearchParams(url.search).get('id');
  const { rows } = await sql`SELECT last_position FROM drivers WHERE id = ${id}`;

  return NextResponse.json({
    driver: rows[0]
  })
}