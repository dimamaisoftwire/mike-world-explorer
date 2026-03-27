import { Destination } from "./types";

export const mockDestinations: Destination[] = [
  {
    id: "1",
    name: "Paris",
    country: "France",
    description: "The City of Light, famous for the Eiffel Tower and art",
    imageUrl: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400",
  },
  {
    id: "2",
    name: "Tokyo",
    country: "Japan",
    description: "A vibrant metropolis blending tradition and modernity",
    imageUrl: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400",
  },
  {
    id: "3",
    name: "Bali",
    country: "Indonesia",
    description: "Tropical paradise with beautiful beaches and temples",
    imageUrl: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400",
  },
  {
    id: "4",
    name: "Rome",
    country: "Italy",
    description: "Ancient city with incredible history and architecture",
    imageUrl: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=400",
  },
  {
    id: "5",
    name: "Santorini",
    country: "Greece",
    description: "Stunning island with white buildings and blue domes",
    imageUrl: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=400",
  },
];

export interface MockCollection {
  id: string;
  name: string;
  emoji: string;
  count: number;
  destinations: Destination[];
}

export const mockCollections: MockCollection[] = [
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
