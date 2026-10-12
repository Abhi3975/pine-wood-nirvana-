// Single source of truth for everything client-specific.
// Change a number, price or photo here and the whole site follows.

export const site = {
  name: "Pine Wood Nirvana",
  fullName: "Pine Wood Nirvana Jungle Resort",
  brand: "GhumoG Stay",
  tagline: "Your Stay • Your Comfort • Your Mountain Experience",
  // WhatsApp + calls (from ghumog.in). Digits only, with country code.
  whatsapp: "917018939901",
  phones: ["+91 70189 39901", "+91 93199 99913", "+91 86799 99913"],
  email: "ghomogbharke@gmail.com",
  address: "Village Paughat, Shoghi, Shimla, Himachal Pradesh",
  mapsQuery: "Pine Wood Nirvana Jungle Resort, Shoghi, Shimla",
  youtubeId: "oYVyzkuprbg",
  parentSite: "https://www.ghumog.in",
} as const;

export const telHref = (phone: string = site.phones[0]) =>
  `tel:${phone.replace(/\s/g, "")}`;

export const waHref = (text: string) =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;

export const mapsDirectionsHref = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  site.mapsQuery,
)}`;

export type Stay = {
  id: string;
  name: string;
  short: string;
  guests: string;
  blurb: string;
  highlights: string[];
  images: { src: string; alt: string }[];
};

export const stays: Stay[] = [
  {
    id: "king",
    name: "Luxury King Cottage",
    short: "King Cottage",
    guests: "2 guests",
    blurb:
      "A red-roofed stone cottage tucked into the pines — king bed, warm wooden ceilings, a kitchenette and a stone path to your door.",
    highlights: ["King bed", "Kitchenette & fridge", "Marble bathroom", "Forest-facing windows"],
    images: [
      { src: "/images/king-cover.webp", alt: "Red-roofed stone King Cottage among the pines" },
      { src: "/images/king-room.webp", alt: "King Cottage bedroom with wooden ceiling and chandelier" },
      { src: "/images/king-room-2.webp", alt: "King Cottage living space" },
      { src: "/images/king-room-3.webp", alt: "King bed with rattan headboard" },
      { src: "/images/king-kitchen.webp", alt: "Kitchenette and dining table in King Cottage" },
      { src: "/images/king-bath.webp", alt: "Marble bathroom" },
    ],
  },
  {
    id: "quad",
    name: "Luxury Quad Cottage",
    short: "Quad Cottage",
    guests: "4 guests",
    blurb:
      "Two-storey stone cottages built for families and friends — two double beds, a lounge, a long forest balcony and valley views.",
    highlights: ["2 double beds", "Lounge & sofa", "Private balcony", "Family friendly"],
    images: [
      { src: "/images/quad-cover.webp", alt: "Two-storey stone Quad Cottage on the hillside" },
      { src: "/images/quad-room.webp", alt: "Quad Cottage room with two beds and timber ceiling" },
      { src: "/images/quad-room-2.webp", alt: "Spacious Quad Cottage interior" },
      { src: "/images/quad-lounge.webp", alt: "Lounge with green sofa and wooden ceiling" },
      { src: "/images/quad-balcony.webp", alt: "Long balcony overlooking the pine forest" },
      { src: "/images/quad-bath.webp", alt: "Bathroom with bathtub" },
    ],
  },
  {
    id: "pine",
    name: "Pine Wood Cottage",
    short: "Pine Cottage",
    guests: "2–3 guests",
    blurb:
      "The original jungle cottages — all wood inside and out, with a sit-out verandah, flower beds and the forest right at your doorstep.",
    highlights: ["All-wood interiors", "Private verandah", "Pet friendly", "Steps from the pool"],
    images: [
      { src: "/images/pine-cover.webp", alt: "Green-roofed Pine Wood Cottages in the forest" },
      { src: "/images/pine-room.webp", alt: "Wooden Pine Cottage bedroom" },
      { src: "/images/pine-room-2.webp", alt: "Pine Cottage bed and seating" },
      { src: "/images/pine-porch.webp", alt: "Path between the pine cottages" },
      { src: "/images/pine-sitout.webp", alt: "Verandah sit-out with red chair" },
      { src: "/images/pine-bath.webp", alt: "Pine Cottage bathroom" },
    ],
  },
];

export const experiences = [
  { title: "Swimming pool", text: "A forest-edge pool with the Shimla hills on the horizon.", img: "/images/pool.webp" },
  { title: "Bonfire nights", text: "Fire pits, fairy lights and music under the pines.", img: "/images/bonfire.webp" },
  { title: "Restaurant & dining", text: "Hearty home-style meals in the hall or out in the open.", img: "/images/dining-tent.webp" },
  { title: "Trekking & nature walks", text: "Trails start right from the resort into the forest.", img: "/images/nature-trail.webp" },
  { title: "Sunset gazebo", text: "Watch the valley turn gold from the hilltop gazebo.", img: "/images/gazebo-sunset.webp" },
  { title: "Events & celebrations", text: "Birthdays, get-togethers and small weddings on the lawn.", img: "/images/lawn-night.webp" },
];

export const amenities = [
  "Luxury cottages",
  "Luxury villa",
  "Swimming pool",
  "Restaurant",
  "Ample parking",
  "Trekking trails",
  "Bonfire",
  "Pet friendly",
];

export type GalleryItem = { src: string; alt: string; tag: "Resort" | "Rooms" | "Evenings" };

export const gallery: GalleryItem[] = [
  { src: "/images/pool-sunset.webp", alt: "Pool at sunset framed by pine trees", tag: "Resort" },
  { src: "/images/path-cottage.webp", alt: "Lantern-lit walkway to a stone cottage", tag: "Resort" },
  { src: "/images/king-room.webp", alt: "King Cottage interior", tag: "Rooms" },
  { src: "/images/fairy-lights.webp", alt: "Fairy lights strung through the forest at night", tag: "Evenings" },
  { src: "/images/red-roof-sunset.webp", alt: "Red-roof cottage glowing at golden hour", tag: "Resort" },
  { src: "/images/quad-room-3.webp", alt: "Quad Cottage bedroom", tag: "Rooms" },
  { src: "/images/bonfire-night.webp", alt: "Bonfire beside the cottages", tag: "Evenings" },
  { src: "/images/pool-2.webp", alt: "Pool with valley views", tag: "Resort" },
  { src: "/images/pine-room-3.webp", alt: "Wooden Pine Cottage room", tag: "Rooms" },
  { src: "/images/pine-cottages-row.webp", alt: "Row of pine cottages under tall trees", tag: "Resort" },
  { src: "/images/lounge.webp", alt: "Lounge decorated for a celebration", tag: "Evenings" },
  { src: "/images/verandah.webp", alt: "Cottage verandah lit up in the evening", tag: "Evenings" },
  { src: "/images/balcony-walk.webp", alt: "Balcony walkway along the stone cottages", tag: "Rooms" },
  { src: "/images/red-roof-door.webp", alt: "Entrance to a red-roof cottage", tag: "Resort" },
  { src: "/images/banquet.webp", alt: "Banquet hall with wooden ceiling", tag: "Resort" },
  { src: "/images/courtyard.webp", alt: "Courtyard between the cottages", tag: "Resort" },
];

export const highlights = [
  { icon: "🌲", title: "Private pine forest", text: "Cottages spread out under tall chir pines" },
  { icon: "🏊", title: "Swimming pool", text: "With views across the Shimla hills" },
  { icon: "🔥", title: "Bonfire nights", text: "Fire pits and fairy lights after dark" },
  { icon: "🐾", title: "Pet friendly", text: "Bring the whole family along" },
  { icon: "🍽️", title: "In-house restaurant", text: "Hot meals without leaving the forest" },
  { icon: "🚗", title: "Ample parking", text: "Drive right up — space for every car" },
];

export const dayHere = [
  {
    time: "7:00 AM",
    title: "Wake to birdsong",
    text: "Step out onto a sunlit stone path with mist still hanging in the valley below. Chai tastes better up here.",
    img: "/images/morning-path.webp",
  },
  {
    time: "10:00 AM",
    title: "Into the forest",
    text: "Nature walks and short treks start right from the resort — no driving, just pine needles underfoot.",
    img: "/images/nature-trail.webp",
  },
  {
    time: "1:00 PM",
    title: "Poolside afternoon",
    text: "A lazy swim, a book on the deck and the whole range of Shimla hills on the horizon.",
    img: "/images/pool-noon.webp",
  },
  {
    time: "6:00 PM",
    title: "Golden hour",
    text: "The sun drops behind the ridge and the red roofs glow. Find a spot at the gazebo and watch.",
    img: "/images/red-roof-sunset.webp",
  },
  {
    time: "8:30 PM",
    title: "Fire & fairy lights",
    text: "Dinner under the stars, a crackling bonfire and stories that go on long past midnight.",
    img: "/images/firelit-dinner.webp",
  },
];

export const waysToStay = [
  {
    title: "Couples",
    pitch: "Quiet, private and a little romantic.",
    points: ["King Cottage with kitchenette", "Sunset from the gazebo", "Bonfire for two"],
    img: "/images/king-room-3.webp",
    stayId: "king",
    message: "Hi! We're a couple looking for a quiet getaway at Pine Wood Nirvana.",
  },
  {
    title: "Families",
    pitch: "Room for everyone — pets included.",
    points: ["Quad Cottage for 4", "Pool & forest walks for kids", "Pet friendly"],
    img: "/images/quad-room.webp",
    stayId: "quad",
    message: "Hi! We're planning a family trip to Pine Wood Nirvana.",
  },
  {
    title: "Friends & groups",
    pitch: "Book a cluster of cottages and take over the lawn.",
    points: ["Multiple cottages side by side", "Bonfire & music nights", "Group dining"],
    img: "/images/lawn-day.webp",
    stayId: "pine",
    message: "Hi! We're a group of friends planning a stay at Pine Wood Nirvana. How many cottages can we book together?",
  },
  {
    title: "Celebrations",
    pitch: "Birthdays, anniversaries and small functions in the pines.",
    points: ["Lawn & banquet hall", "Decor on request", "Catering by our kitchen"],
    img: "/images/lounge.webp",
    stayId: undefined,
    message: "Hi! I'd like to plan a celebration at Pine Wood Nirvana. Can you share the options?",
  },
];

// Approximate drive times from the resort; traffic and season change these.
export const nearby = [
  { name: "Tara Devi Temple", time: "20 min", text: "Hilltop temple with sweeping views of Shimla." },
  { name: "The Ridge & Mall Road", time: "45 min", text: "Shimla's colonial heart — cafés, shopping, Christ Church." },
  { name: "Jakhoo Temple", time: "1 hr", text: "Shimla's highest point, with the giant Hanuman statue." },
  { name: "Kufri", time: "1 hr 15 min", text: "Snow in winter, horse rides and the Himalayan Nature Park." },
  { name: "Chail", time: "1 hr 30 min", text: "Old palace town with one of the world's highest cricket grounds." },
  { name: "Kasauli", time: "2 hr", text: "Quiet cantonment town with Monkey Point and sunset views." },
];

// From ghumog.in.
export const ghumog = {
  founder: "Aviral Jain",
  years: "20 years",
  stats: [
    { value: "120+", label: "curated stays" },
    { value: "10,000+", label: "happy travellers" },
    { value: "4.8★", label: "average rating" },
    { value: "7+", label: "destinations" },
  ],
};

export const faqs = [
  {
    q: "How do I book?",
    a: "Tap any WhatsApp button, pick your cottage and dates, and send. Our team replies with availability and the best rate — or just call us. No booking fees.",
  },
  {
    q: "Where exactly is the resort?",
    a: "Village Paughat, Shoghi, on the Kalka–Shimla highway. Take the U-turn near the Shoghi Police Check Post and follow the slip road down about 2.5 km. We'll happily send you the live location on WhatsApp.",
  },
  {
    q: "Can I bring my pet?",
    a: "Yes — Pine Wood Nirvana is pet friendly. Just let us know when you book so we can give you the right cottage.",
  },
  {
    q: "Is food available at the resort?",
    a: "Yes, there's an in-house restaurant, and meals can be served in the dining hall or outdoors by the lawn and bonfire.",
  },
  {
    q: "Can we host a birthday or small event?",
    a: "Absolutely. The lawn, banquet hall and bonfire area work beautifully for celebrations. Message us your plan and headcount.",
  },
  {
    q: "What are the check-in and check-out times?",
    a: "Our team confirms timings with your booking, and we try to accommodate early arrivals and late departures when we can.",
  },
];
