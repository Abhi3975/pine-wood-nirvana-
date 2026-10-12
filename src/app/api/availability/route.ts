import { getAvailability } from "@/lib/availability";

// Full nights per cottage, read from the resort's Google Sheet (see src/lib/availability.ts).
export async function GET() {
  const data = await getAvailability();
  return Response.json(data, { headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600" } });
}
