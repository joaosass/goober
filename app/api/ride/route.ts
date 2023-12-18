import { NextRequest, NextResponse } from 'next/server';
import { sql } from "@vercel/postgres";

export async  function GET(req: NextRequest) {
  const url = new URL(req?.url || '');
  const id = new URLSearchParams(url.search).get('id');
  const { rows } = await sql`SELECT drivers_queue, ride_status, value FROM rides WHERE id = ${id}`;

  return NextResponse.json({
    ride: rows[0],
  })
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  const { rows } = await sql`
  WITH user_location AS (
      SELECT ST_MakePoint(${data.departure.lat}, ${data.departure.lng})::geography AS user_point
  )
  SELECT id
  FROM drivers
  JOIN user_location ON
      ST_DWithin(ST_GeogFromText('POINT(' || last_position[0] || ' ' || last_position[1] || ')'), user_location.user_point, 3000)
  WHERE status = true
  AND NOT EXISTS (
    SELECT 1
    FROM rides
    WHERE rides.drivers_queue[1] = drivers.id
      AND rides.ride_status IN ('WAITING_FOR_DRIVER', 'DRIVER_ACCEPTED_RIDE', 'DRIVER_STARTED_RIDE')
  )
  ORDER BY COALESCE(last_ride, '1900-01-01'::TIMESTAMP) ASC LIMIT 5;
  `;
  const driversQueue = rows.map(({ id }) => id) as any;

  const { rows: insertedRows } = await sql`
  INSERT INTO rides(departure, arrival, ride_status, drivers_queue, value)
    VALUES (point(${data.departure.lat}, ${data.departure.lng}), point(${data.arrival.lat}, ${data.arrival.lng}), 'WAITING_FOR_DRIVER', ${driversQueue}, ${data.value}) RETURNING id
  `;

  return NextResponse.json({
    id: insertedRows[0].id
  });
}

export async function PUT(req: NextRequest) {
  const data = await req.json();
  await sql`UPDATE rides SET ride_status = ${data.started ? 'DRIVER_STARTED_RIDE' : 'DRIVER_ACCEPTED_RIDE'} WHERE id = ${data.id}`;

  return NextResponse.json({
    started: data.started,
    updated: true
  });
}

export async function PATCH(req: NextRequest) {
  const data = await req.json();
  await sql`UPDATE rides SET ride_status = 'FINISHED' WHERE id = ${data.id}`;
  await sql`UPDATE drivers SET last_ride = CURRENT_TIMESTAMP WHERE id = ${data.plate}`;

  return NextResponse.json({
    finished: true
  });
}

export async function DELETE(req: NextRequest) {
  const data = await req.json();
  await sql`UPDATE rides SET ride_status = 'CANCELED' WHERE id = ${data.id}`;

  return NextResponse.json({
    canceled: true
  });
}