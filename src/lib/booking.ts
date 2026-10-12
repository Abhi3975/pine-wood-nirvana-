// Shared by the booking form (to show the quote) and the payment API (to charge it).
// The server always recomputes the amount from these rules — never trusts the browser.
import { mealPlans, pricing, stays } from "./site";

export const bookingRules = {
  // Share of the stay total collected online; the rest is paid at the resort.
  advancePercent: 30,
  maxNights: 30,
  maxRooms: 10,
  // Guests per room, used to suggest how many rooms are needed.
  capacity: { king: 2, quad: 4, pine: 3 } as Record<string, number>,
};

export type BookingInput = {
  stayId: string;
  checkIn: string; // YYYY-MM-DD
  checkOut: string;
  rooms: number;
  payFull: boolean;
};

export type Quote = {
  stayName: string;
  nights: number;
  rooms: number;
  roomRate: number; // ₹ per room per night, before taxes
  taxesPerNight: number; // ₹ per room per night
  subtotal: number;
  taxes: number;
  total: number;
  payNow: number; // ₹ charged online
  payAtResort: number;
};

const DAY = 86_400_000;
const parse = (d: string) => (/^\d{4}-\d{2}-\d{2}$/.test(d) ? Date.parse(d + "T00:00:00Z") : NaN);

export function nightsBetween(checkIn: string, checkOut: string) {
  const a = parse(checkIn);
  const b = parse(checkOut);
  return Number.isNaN(a) || Number.isNaN(b) ? 0 : Math.round((b - a) / DAY);
}

export function suggestRooms(stayId: string, guests: number) {
  return Math.max(1, Math.ceil(guests / (bookingRules.capacity[stayId] ?? 2)));
}

/** Returns a quote, or an error message a guest can act on. */
export function quote(input: BookingInput, today = new Date()): Quote | { error: string } {
  const stay = stays.find((s) => s.id === input.stayId);
  const plan = pricing.plans.find((p) => p.stayId === input.stayId);
  if (!stay || !plan) return { error: "Please choose a cottage." };

  const nights = nightsBetween(input.checkIn, input.checkOut);
  const todayIso = today.toISOString().slice(0, 10);
  if (nights < 1) return { error: "Check-out must be after check-in." };
  if (input.checkIn < todayIso) return { error: "Check-in can't be in the past." };
  if (nights > bookingRules.maxNights) return { error: `Online booking is for up to ${bookingRules.maxNights} nights.` };

  const rooms = Math.trunc(input.rooms);
  if (!(rooms >= 1 && rooms <= bookingRules.maxRooms)) return { error: "Please choose between 1 and 10 rooms." };

  const subtotal = plan.from * nights * rooms;
  const taxes = plan.taxes * nights * rooms;
  const total = subtotal + taxes;
  const payNow = input.payFull ? total : Math.round((total * bookingRules.advancePercent) / 100);

  return {
    stayName: stay.name,
    nights,
    rooms,
    roomRate: plan.from,
    taxesPerNight: plan.taxes,
    subtotal,
    taxes,
    total,
    payNow,
    payAtResort: total - payNow,
  };
}

export const mealPlanName = (code: string) => mealPlans.find((m) => m.code === code)?.name;
