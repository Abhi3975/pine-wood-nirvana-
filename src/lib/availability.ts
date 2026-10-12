// Availability comes from a Google Sheet the resort keeps up to date — no developer needed.
//
// Sheet columns (first row is a header):   cottage | from | to | note
//   cottage: king, quad, pine — or "all" to close the whole resort
//   from/to: first and last NIGHT that is full, as 2026-11-14 or 14/11/2026 (both inclusive)
// Publish it via File → Share → Publish to web → CSV, and set the link as AVAILABILITY_CSV_URL
// in Vercel. Without it, every date shows as available.
import { stays } from "./site";

export type Blocked = Record<string, string[]>; // cottage id → full nights (YYYY-MM-DD)

const ids = stays.map((s) => s.id);
const DAY = 86_400_000;

/** Accepts 2026-11-14, 14/11/2026 or 14-11-2026 (Indian day-first). */
export function toIso(raw: string): string | null {
  const s = raw.trim();
  let m = s.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
  if (m) return `${m[1]}-${m[2].padStart(2, "0")}-${m[3].padStart(2, "0")}`;
  m = s.match(/^(\d{1,2})[/-](\d{1,2})[/-](\d{4})$/);
  if (m) return `${m[3]}-${m[2].padStart(2, "0")}-${m[1].padStart(2, "0")}`;
  return null;
}

const matchCottage = (raw: string): string[] => {
  const v = raw.trim().toLowerCase();
  if (v === "all" || v === "resort") return ids;
  const byId = ids.find((id) => v === id || v.includes(id));
  if (byId) return [byId];
  const byName = stays.find((s) => v.includes(s.short.toLowerCase().split(" ")[0]));
  return byName ? [byName.id] : [];
};

export function parseSheet(csv: string, maxNights = 400): Blocked {
  const out: Blocked = Object.fromEntries(ids.map((id) => [id, [] as string[]]));
  for (const line of csv.split(/\r?\n/).slice(1)) {
    const [cottage = "", from = "", to = ""] = line.split(",").map((c) => c.replace(/^"|"$/g, ""));
    const a = toIso(from);
    const b = toIso(to || from);
    if (!a || !b) continue;
    const start = Date.parse(a + "T00:00:00Z");
    const end = Date.parse(b + "T00:00:00Z");
    if (!(end >= start) || (end - start) / DAY > maxNights) continue;
    for (const id of matchCottage(cottage)) {
      for (let t = start; t <= end; t += DAY) out[id].push(new Date(t).toISOString().slice(0, 10));
    }
  }
  for (const id of ids) out[id] = [...new Set(out[id])].sort();
  return out;
}

/** Server-side: reads the sheet (cached for 5 minutes). */
export async function getAvailability(): Promise<{ source: "sheet" | "none"; blocked: Blocked }> {
  const url = process.env.AVAILABILITY_CSV_URL;
  const empty: Blocked = Object.fromEntries(ids.map((id) => [id, []]));
  if (!url) return { source: "none", blocked: empty };
  try {
    const res = await fetch(url, { next: { revalidate: 300 } });
    if (!res.ok) throw new Error(String(res.status));
    return { source: "sheet", blocked: parseSheet(await res.text()) };
  } catch (e) {
    console.error("Availability sheet unavailable", e);
    return { source: "none", blocked: empty };
  }
}

/** Nights a stay would use: check-in up to (not including) check-out. */
export function nightsOf(checkIn: string, checkOut: string): string[] {
  const out: string[] = [];
  for (let t = Date.parse(checkIn + "T00:00:00Z"); t < Date.parse(checkOut + "T00:00:00Z"); t += DAY)
    out.push(new Date(t).toISOString().slice(0, 10));
  return out;
}
