import { Destination } from "./types";

const LIKED_KEY = "liked";
const COLLECTIONS_KEY = "collections";

export function getLiked(): Destination[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(LIKED_KEY);
  return raw ? JSON.parse(raw) : [];
}

export function addLiked(destination: Destination): void {
  const liked = getLiked();
  if (liked.some((d) => d.id === destination.id)) return;
  liked.push(destination);
  localStorage.setItem(LIKED_KEY, JSON.stringify(liked));
}

export function getCollections(): Record<string, Destination[]> {
  if (typeof window === "undefined") return {};
  const raw = localStorage.getItem(COLLECTIONS_KEY);
  return raw ? JSON.parse(raw) : {};
}

export function getCollectionNames(): string[] {
  return Object.keys(getCollections());
}

export function addToCollection(name: string, destination: Destination): void {
  const collections = getCollections();
  if (!collections[name]) {
    collections[name] = [];
  }
  if (collections[name].some((d) => d.id === destination.id)) return;
  collections[name].push(destination);
  localStorage.setItem(COLLECTIONS_KEY, JSON.stringify(collections));
}

export function createCollection(name: string): void {
  const collections = getCollections();
  if (!collections[name]) {
    collections[name] = [];
    localStorage.setItem(COLLECTIONS_KEY, JSON.stringify(collections));
  }
}
