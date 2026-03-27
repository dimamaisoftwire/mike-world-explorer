import { Destination, Preferences, Collection } from "./types";

const mockDestinations: Destination[] = [
  {
    id: "1",
    name: "Santorini",
    country: "Greece",
    description:
      "Iconic white-washed buildings perched on volcanic cliffs overlooking the deep blue Aegean Sea.",
    imageUrl: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=600&h=800&fit=crop",
    activities: ["Watch the Oia sunset", "Sail the caldera", "Wine tasting in Megalochori", "Hike Fira to Oia trail"],
    bestTime: "April – October",
    tip: "Book accommodation in Oia early — sunset-view rooms sell out months ahead.",
  },
  {
    id: "2",
    name: "Kyoto",
    country: "Japan",
    description:
      "Ancient temples, serene bamboo forests, and traditional tea houses in Japan's cultural heart.",
    imageUrl: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&h=800&fit=crop",
    activities: ["Walk Arashiyama Bamboo Grove", "Visit Fushimi Inari Shrine", "Traditional tea ceremony", "Explore Nishiki Market"],
    bestTime: "March – May & October – November",
    tip: "Get a bus day-pass — it covers most major temple routes and saves a fortune.",
  },
  {
    id: "3",
    name: "Marrakech",
    country: "Morocco",
    description:
      "Vibrant souks, ornate palaces, and the intoxicating scent of spices fill this bustling medina city.",
    imageUrl: "https://images.unsplash.com/photo-1597212618440-806262de4f6b?w=600&h=800&fit=crop",
    activities: ["Haggle in the souks", "Visit Jardin Majorelle", "Rooftop dinner at Jemaa el-Fnaa", "Day trip to Atlas Mountains"],
    bestTime: "March – May & September – November",
    tip: "Always agree on a price before getting in a taxi — or use a ride-hailing app.",
  },
  {
    id: "4",
    name: "Queenstown",
    country: "New Zealand",
    description:
      "Adventure capital surrounded by dramatic mountains, crystal lakes, and world-class bungee jumping.",
    imageUrl: "https://images.unsplash.com/photo-1589871973318-9ca1258faa5d?w=600&h=800&fit=crop",
    activities: ["Bungee at Kawarau Bridge", "Milford Sound cruise", "Skyline luge", "Jet boating on Shotover River"],
    bestTime: "December – February (summer)",
    tip: "Book a multi-activity combo pass — you'll save up to 30% on adventure activities.",
  },
  {
    id: "5",
    name: "Havana",
    country: "Cuba",
    description:
      "Colourful vintage cars, crumbling colonial architecture, and salsa rhythms on every corner.",
    imageUrl: "https://images.unsplash.com/photo-1500759285222-a95626b934cb?w=600&h=800&fit=crop",
    activities: ["Classic car tour of Old Havana", "Salsa dancing lesson", "Visit El Morro fortress", "Sip mojitos at La Bodeguita"],
    bestTime: "November – April",
    tip: "Bring cash (EUR or USD) — ATMs are unreliable and most places don't accept cards.",
  },
  {
    id: "6",
    name: "Reykjavik",
    country: "Iceland",
    description:
      "Gateway to glaciers, geysers, and the mesmerising Northern Lights in the land of fire and ice.",
    imageUrl: "https://images.unsplash.com/photo-1504829857797-ddff29c27927?w=600&h=800&fit=crop",
    activities: ["Golden Circle day trip", "Blue Lagoon soak", "Northern Lights chase", "Glacier hiking on Sólheimajökull"],
    bestTime: "June – August (midnight sun) or Sept – March (Northern Lights)",
    tip: "Rent a campervan for the Ring Road — it's the most flexible and scenic way to explore.",
  },
  {
    id: "7",
    name: "Bali",
    country: "Indonesia",
    description:
      "Lush rice terraces, sacred temples, and world-class surf breaks on this tropical island paradise.",
    imageUrl: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&h=800&fit=crop",
    activities: ["Tegallalang rice terrace walk", "Surf lesson in Canggu", "Ubud monkey forest", "Sunrise hike up Mount Batur"],
    bestTime: "April – October (dry season)",
    tip: "Rent a scooter for ultimate flexibility — but get an international driving permit first.",
  },
  {
    id: "8",
    name: "Cape Town",
    country: "South Africa",
    description:
      "Where Table Mountain meets the ocean — stunning coastlines, vineyards, and vibrant culture.",
    imageUrl: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=600&h=800&fit=crop",
    activities: ["Cable car up Table Mountain", "Drive Chapman's Peak", "Wine tasting in Stellenbosch", "Penguin colony at Boulders Beach"],
    bestTime: "November – March (summer)",
    tip: "The Cape of Good Hope is stunning but windy — bring layers even in summer.",
  },
  {
    id: "9",
    name: "Dubrovnik",
    country: "Croatia",
    description:
      "Walk the ancient city walls above the sparkling Adriatic, known as the Pearl of the Adriatic.",
    imageUrl: "https://images.unsplash.com/photo-1555990538-1e6c6bdc0ef1?w=600&h=800&fit=crop",
    activities: ["Walk the city walls", "Kayak around Lokrum Island", "Cable car to Mount Srđ", "Game of Thrones filming tour"],
    bestTime: "May – June & September",
    tip: "Visit the walls first thing in the morning to avoid cruise-ship crowds.",
  },
  {
    id: "10",
    name: "Petra",
    country: "Jordan",
    description:
      "A rose-red city carved into towering sandstone cliffs — one of the New Seven Wonders of the World.",
    imageUrl: "https://images.unsplash.com/photo-1579606032821-4e6161c81571?w=600&h=800&fit=crop",
    activities: ["Walk the Siq to the Treasury", "Hike to the Monastery", "Petra by Night candlelit tour", "Wadi Rum desert camp"],
    bestTime: "March – May & September – November",
    tip: "Buy a two-day pass — Petra is massive and one day barely scratches the surface.",
  },
];

export const mockCollections: Collection[] = [
  {
    id: "liked",
    name: "Liked",
    emoji: "❤️",
    count: 5,
    destinations: mockDestinations,
  },
  {
    id: "europe",
    name: "Europe Trip",
    emoji: "🇪🇺",
    count: 3,
    destinations: [mockDestinations[0], mockDestinations[3], mockDestinations[4]],
  },
  {
    id: "beaches",
    name: "Beach Destinations",
    emoji: "🏖️",
    count: 2,
    destinations: [mockDestinations[2], mockDestinations[4]],
  },
];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function getDestinations(_preferences?: Preferences): Promise<Destination[]> {
  // TODO: Replace with AI API call that uses preferences to generate personalised destinations
  return [...mockDestinations];
}
