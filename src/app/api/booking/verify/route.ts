import { createHmac, timingSafeEqual } from "node:crypto";

// Confirms a Razorpay payment really happened: Razorpay signs order_id|payment_id with our secret.
export async function POST(req: Request) {
  const secret = process.env.RAZORPAY_KEY_SECRET;
  if (!secret) return Response.json({ ok: false, error: "Payments are not configured." }, { status: 503 });

  let body: { razorpay_order_id?: string; razorpay_payment_id?: string; razorpay_signature?: string };
  try {
    body = await req.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }
  const { razorpay_order_id: orderId, razorpay_payment_id: paymentId, razorpay_signature: signature } = body;
  if (!orderId || !paymentId || !signature) return Response.json({ ok: false, error: "Missing payment details." }, { status: 400 });

  const expected = createHmac("sha256", secret).update(`${orderId}|${paymentId}`).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  const ok = a.length === b.length && timingSafeEqual(a, b);
  return Response.json({ ok }, { status: ok ? 200 : 400 });
}
