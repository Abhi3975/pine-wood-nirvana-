import { getAvailability, nightsOf } from "@/lib/availability";
import { quote, type BookingInput } from "@/lib/booking";

// Creates a Razorpay order for the booking. Without RAZORPAY_KEY_ID / RAZORPAY_KEY_SECRET
// configured it answers in demo mode, so the flow can be shown before the client's
// Razorpay account is live.
export async function POST(req: Request) {
  let body: Partial<BookingInput> & { name?: string; phone?: string; email?: string };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const name = String(body.name ?? "").trim().slice(0, 80);
  const phone = String(body.phone ?? "").replace(/\D/g, "").slice(-10);
  if (name.length < 2 || phone.length !== 10) {
    return Response.json({ error: "Please enter your name and a 10-digit mobile number." }, { status: 400 });
  }

  // Recompute the price on the server from the published rates — never trust the browser's number.
  const q = quote({
    stayId: String(body.stayId ?? ""),
    checkIn: String(body.checkIn ?? ""),
    checkOut: String(body.checkOut ?? ""),
    rooms: Number(body.rooms ?? 1),
    payFull: Boolean(body.payFull),
  });
  if ("error" in q) return Response.json({ error: q.error }, { status: 400 });

  // Don't take money for nights the resort has marked full.
  const { blocked } = await getAvailability();
  const full = nightsOf(String(body.checkIn), String(body.checkOut)).filter((n) => blocked[String(body.stayId)]?.includes(n));
  if (full.length) {
    return Response.json(
      { error: `Sorry, ${q.stayName} is fully booked on ${full.map((n) => new Date(n + "T00:00:00Z").toLocaleDateString("en-IN", { day: "numeric", month: "short", timeZone: "UTC" })).join(", ")}. Please pick other dates or another cottage.` },
      { status: 409 },
    );
  }

  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keyId || !keySecret) return Response.json({ mode: "demo", quote: q });

  const res = await fetch("https://api.razorpay.com/v1/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Basic " + Buffer.from(`${keyId}:${keySecret}`).toString("base64"),
    },
    body: JSON.stringify({
      amount: q.payNow * 100, // paise
      currency: "INR",
      receipt: `pwn_${Date.now()}`,
      notes: {
        cottage: q.stayName,
        checkIn: String(body.checkIn),
        checkOut: String(body.checkOut),
        rooms: String(q.rooms),
        guest: name,
        phone,
      },
    }),
  });
  if (!res.ok) {
    console.error("Razorpay order failed", res.status, await res.text());
    return Response.json({ error: "Payment service is unavailable right now. Please book on WhatsApp." }, { status: 502 });
  }
  const order = (await res.json()) as { id: string; amount: number };
  return Response.json({ mode: "live", keyId, orderId: order.id, amount: order.amount, quote: q });
}
