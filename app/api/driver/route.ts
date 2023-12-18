import { NextRequest, NextResponse } from 'next/server';
import { sql } from "@vercel/postgres";

export async function GET(req: NextRequest) {
  const url = new URL(req?.url || '');
  const plate = new URLSearchParams(url.search).get('plate');
  const { rows } = await sql`SELECT arrival, departure, id, value FROM rides WHERE ride_status = 'WAITING_FOR_DRIVER' AND drivers_queue[1] = ${plate} ORDER BY value ASC LIMIT 1`;

  return NextResponse.json({
    ride: rows[0]
  })
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  const { rows } = await sql`SELECT id FROM drivers WHERE id = ${data.plate}`;

  if (rows.length) {
    await sql`UPDATE drivers SET status = true, last_position = point(${data.lat},${data.lng}) WHERE id = ${data.plate}`;
  } else {
    await sql`INSERT INTO drivers(id, last_position, status) VALUES (${data.plate}, point(${data.lat}, ${data.lng}), true)`;
  }

  return NextResponse.json({
    status: true
  })
}

export async function PATCH(req: NextRequest) {
  const data = await req.json();
  await sql`UPDATE drivers SET status = false WHERE id = ${data.plate}`;
  await sql`UPDATE rides SET drivers_queue = drivers_queue[2:] WHERE drivers_queue[1] = ${data.plate}`;

  return NextResponse.json({
    status: false
  })
}

export async function DELETE(req: NextRequest) {
  const data = await req.json();
  await sql`UPDATE rides SET drivers_queue = drivers_queue[2:], ride_status = 'WAITING_FOR_DRIVER' WHERE id = ${data.id}`;

  return NextResponse.json({
    declined: true
  });
}