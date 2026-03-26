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
