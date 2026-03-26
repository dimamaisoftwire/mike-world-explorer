"use client";

import { useState, useEffect, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import { Destination, Preferences } from "@/lib/types";
import { getDestinations } from "@/lib/data";
import { addLiked } from "@/lib/storage";
import SwipeCard from "@/components/SwipeCard";
import CollectionPopup from "@/components/CollectionPopup";
import Link from "next/link";

export default function SwipePage() {
  const [cards, setCards] = useState<Destination[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [popupDestination, setPopupDestination] = useState<Destination | null>(null);
  const [loading, setLoading] = useState(true);

  const loadCards = useCallback(async () => {
    setLoading(true);
    const raw = localStorage.getItem("preferences");
    const prefs: Preferences | undefined = raw ? JSON.parse(raw) : undefined;
    const data = await getDestinations(prefs);
    setCards(data);
    setCurrentIndex(0);
    setLoading(false);
  }, []);

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
    return (
      <div className="flex flex-col items-center justify-center min-h-dvh px-6 pb-20 gap-6 text-center">
        <div className="text-5xl">🎉</div>
        <h2 className="text-2xl font-bold text-foreground">
          You&apos;ve explored all cards!
        </h2>
        <p className="text-muted text-sm max-w-xs">
          Check your collections or load a fresh batch of destinations.
        </p>
        <div className="flex flex-col gap-3 w-full max-w-xs">
          <button
            onClick={loadCards}
            className="w-full py-3 rounded-full bg-accent text-white font-semibold shadow-lg hover:bg-accent-hover active:scale-95 transition-all cursor-pointer min-h-[48px]"
          >
            Explore More
          </button>
          <Link
            href="/collections"
            className="w-full py-3 rounded-full bg-pill-bg text-foreground font-semibold text-center hover:bg-accent-light transition-colors min-h-[48px] flex items-center justify-center"
          >
            View Collections
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-dvh px-6 py-6 pb-20">
      {/* Progress */}
      <div className="text-sm font-medium text-muted mb-4">
        {currentIndex + 1} / {total}
      </div>

      {/* Card stack */}
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

      {/* Action buttons */}
      <div className="flex items-center gap-8">
        <button
          onClick={handleSwipeLeft}
          className="w-14 h-14 rounded-full bg-red-50 text-red-500 flex items-center justify-center text-2xl shadow-md hover:bg-red-100 active:scale-90 transition-all cursor-pointer"
          aria-label="Skip"
        >
          ✗
        </button>
        <button
          onClick={handleSwipeRight}
          className="w-14 h-14 rounded-full bg-green-50 text-green-500 flex items-center justify-center text-2xl shadow-md hover:bg-green-100 active:scale-90 transition-all cursor-pointer"
          aria-label="Like"
        >
          ♥
        </button>
      </div>

      {/* Collection popup */}
      {popupDestination && (
        <CollectionPopup
          destination={popupDestination}
          onClose={() => setPopupDestination(null)}
        />
      )}
    </div>
  );
}
