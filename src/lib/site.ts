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
