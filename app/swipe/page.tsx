"use client";

import { Suspense, useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import { Destination, Preferences, Theme } from "@/lib/types";
import { getDestinations } from "@/lib/data";
import { addLiked } from "@/lib/storage";
import SwipeCard from "@/components/SwipeCard";
import SwipeActions from "@/components/SwipeActions";
import SwipeEndScreen from "@/components/SwipeEndScreen";
import CollectionPopup from "@/components/CollectionPopup";

const themeLabels: Record<Theme, string> = {
  food: "Food Holidays",
  beach: "Beach Holidays",
  sightseeing: "Sightseeing Holidays",
  beginner: "New to Travelling",
};

const validThemes: Theme[] = ["food", "beach", "sightseeing", "beginner"];

export default function SwipePage() {
  return (
    <Suspense
      fallback={
        <div className="flex flex-col items-center justify-center min-h-dvh px-6 pb-20">
          <div className="text-4xl mb-4 animate-pulse">🌍</div>
          <p className="text-muted text-sm font-medium">Loading destinations...</p>
        </div>
      }
    >
      <SwipeContent />
    </Suspense>
  );
}

function SwipeContent() {
  const searchParams = useSearchParams();
  const themeParam = searchParams.get("theme");
  const theme: Theme | undefined = validThemes.includes(themeParam as Theme)
    ? (themeParam as Theme)
    : undefined;

  const [cards, setCards] = useState<Destination[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [popupDestination, setPopupDestination] = useState<Destination | null>(null);
  const [loading, setLoading] = useState(true);

  const loadCards = useCallback(async () => {
    setLoading(true);
    const raw = localStorage.getItem("preferences");
    const prefs: Preferences | undefined = raw ? JSON.parse(raw) : undefined;
    const data = await getDestinations(prefs, theme);
    setCards(data);
    setCurrentIndex(0);
    setLoading(false);
  }, [theme]);

  useEffect(() => {
    loadCards();
  }, [loadCards]);

  const handleSwipeLeft = () => {
    setCurrentIndex((prev) => prev + 1);
  };

  const handleSwipeRight = () => {
    const destination = cards[currentIndex];
    addLiked(destination);
    setPopupDestination(destination);
    setCurrentIndex((prev) => prev + 1);
  };

  const done = currentIndex >= cards.length && cards.length > 0;
  const total = cards.length;
  const visibleCards = cards.slice(currentIndex, currentIndex + 2);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-dvh px-6 pb-20">
        <div className="text-4xl mb-4 animate-pulse">🌍</div>
        <p className="text-muted text-sm font-medium">Loading destinations...</p>
      </div>
    );
  }

  if (done) {
    return <SwipeEndScreen onExploreMore={loadCards} />;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-dvh px-6 py-6 pb-20">
      {theme && (
        <div className="text-xs font-semibold uppercase tracking-wide text-accent mb-1">
          {themeLabels[theme]}
        </div>
      )}

      <div className="text-sm font-medium text-muted mb-4">
        {currentIndex + 1} / {total}
      </div>

      <div className="relative w-full max-w-xs aspect-[3/5] mb-6">
        <AnimatePresence>
          {visibleCards
            .slice()
            .reverse()
            .map((destination, i) => {
              const isTop = i === visibleCards.length - 1;
              return (
                <SwipeCard
                  key={destination.id}
                  destination={destination}
                  isTop={isTop}
                  onSwipeLeft={handleSwipeLeft}
                  onSwipeRight={handleSwipeRight}
                />
              );
            })}
        </AnimatePresence>
      </div>

      <SwipeActions onSkip={handleSwipeLeft} onLike={handleSwipeRight} />

      {popupDestination && (
        <CollectionPopup
          destination={popupDestination}
          onClose={() => setPopupDestination(null)}
        />
      )}
    </div>
  );
}
