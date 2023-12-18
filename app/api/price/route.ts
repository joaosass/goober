import { NextRequest, NextResponse } from 'next/server';
import { sql } from "@vercel/postgres";

export async function GET(req: NextRequest) {
  const url = new URL(req?.url || '');
  const distanceInKms = Number(new URLSearchParams(url.search).get('distance')) / 1000;
  const lat = Number(new URLSearchParams(url.search).get('lat'));
  const lng = Number(new URLSearchParams(url.search).get('lng'));

  const { rows: rowsPrices } = await sql`SELECT * FROM prices`;
  const { rows: rowsTaxes } = await sql`SELECT * FROM dynamic_taxes ORDER BY rides_quantity DESC`;
  const { rows: rowsCount } = await sql`
  WITH user_location AS (
    SELECT ST_MakePoint(${lat}, ${lng})::geography AS user_point
  )
  SELECT COUNT(id)
  FROM rides
  JOIN user_location ON
      ST_DWithin(ST_GeogFromText('POINT(' || departure[0] || ' ' || departure[1] || ')'), user_location.user_point, 3000)
  WHERE start_date >= CURRENT_TIMESTAMP - INTERVAL '30 minutes';
`;

  const multiplier = Number(rowsTaxes.find((tax) => tax.rides_quantity <= Number(rowsCount[0].count))?.multiplier || 1);

  return NextResponse.json({
    price: Math.ceil(rowsPrices[0].price_per_km * distanceInKms * multiplier)
  })
}