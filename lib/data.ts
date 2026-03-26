import { Destination, Preferences } from "./types";

const mockDestinations: Destination[] = [
  {
    id: "1",
    name: "Santorini",
    country: "Greece",
    description:
      "Iconic white-washed buildings perched on volcanic cliffs overlooking the deep blue Aegean Sea.",
    imageUrl: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=600&h=800&fit=crop",
  },
  {
    id: "2",
    name: "Kyoto",
    country: "Japan",
    description:
      "Ancient temples, serene bamboo forests, and traditional tea houses in Japan's cultural heart.",
    imageUrl: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&h=800&fit=crop",
  },
  {
    id: "3",
    name: "Marrakech",
    country: "Morocco",
    description:
      "Vibrant souks, ornate palaces, and the intoxicating scent of spices fill this bustling medina city.",
    imageUrl: "https://images.unsplash.com/photo-1597212618440-806262de4f6b?w=600&h=800&fit=crop",
  },
  {
    id: "4",
    name: "Queenstown",
    country: "New Zealand",
    description:
      "Adventure capital surrounded by dramatic mountains, crystal lakes, and world-class bungee jumping.",
    imageUrl: "https://images.unsplash.com/photo-1589871973318-9ca1258faa5d?w=600&h=800&fit=crop",
  },
  {
    id: "5",
    name: "Havana",
    country: "Cuba",
    description:
      "Colourful vintage cars, crumbling colonial architecture, and salsa rhythms on every corner.",
    imageUrl: "https://images.unsplash.com/photo-1500759285222-a95626b934cb?w=600&h=800&fit=crop",
  },
  {
    id: "6",
    name: "Reykjavik",
    country: "Iceland",
    description:
      "Gateway to glaciers, geysers, and the mesmerising Northern Lights in the land of fire and ice.",
    imageUrl: "https://images.unsplash.com/photo-1504829857797-ddff29c27927?w=600&h=800&fit=crop",
  },
  {
    id: "7",
    name: "Bali",
    country: "Indonesia",
    description:
      "Lush rice terraces, sacred temples, and world-class surf breaks on this tropical island paradise.",
    imageUrl: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&h=800&fit=crop",
  },
  {
    id: "8",
    name: "Cape Town",
    country: "South Africa",
    description:
      "Where Table Mountain meets the ocean — stunning coastlines, vineyards, and vibrant culture.",
    imageUrl: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=600&h=800&fit=crop",
  },
  {
    id: "9",
    name: "Dubrovnik",
    country: "Croatia",
    description:
      "Walk the ancient city walls above the sparkling Adriatic, known as the Pearl of the Adriatic.",
    imageUrl: "https://images.unsplash.com/photo-1555990538-1e6c6bdc0ef1?w=600&h=800&fit=crop",
  },
  {
    id: "10",
    name: "Petra",
    country: "Jordan",
    description:
      "A rose-red city carved into towering sandstone cliffs — one of the New Seven Wonders of the World.",
    imageUrl: "https://images.unsplash.com/photo-1579606032821-4e6161c81571?w=600&h=800&fit=crop",
  },
];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function getDestinations(_preferences?: Preferences): Promise<Destination[]> {
  // TODO: Replace with AI API call that uses preferences to generate personalised destinations
  return [...mockDestinations];
}
