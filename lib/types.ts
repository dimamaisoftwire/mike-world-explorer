export type Budget = "$" | "$$" | "$$$";
export type Experience = "Beginner" | "Intermediate" | "Expert";
export type Style = "Relaxed" | "Active";

export interface Preferences {
  budget: Budget;
  experience: Experience;
  style: Style;
}

export interface Destination {
  id: string;
  name: string;
  country: string;
  description: string;
  imageUrl: string;
  activities: string[];
  bestTime: string;
  tip: string;
}

export interface Collection {
  id: string;
  name: string;
  emoji: string;
  count: number;
  destinations: Destination[];
}

export interface ItineraryStop {
  destinationId: string;
  name: string;
  country: string;
  days: number;
  summary: string;
  highlights: string[];
  tip: string;
}

export interface Itinerary {
  id: string;
  collectionId: string;
  totalDays: number;
  totalBudget: string;
  stops: ItineraryStop[];
}
