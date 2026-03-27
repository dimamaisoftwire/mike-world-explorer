"use client";

import { Suspense, useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { Itinerary } from "@/lib/types";
import { getItinerary } from "@/lib/data";
import { mockCollections } from "@/lib/mockData";
import ItineraryHeader from "./components/ItineraryHeader";
import ItinerarySummary from "./components/ItinerarySummary";
import ItineraryTimeline from "./components/ItineraryTimeline";

export default function ItineraryPage() {
  return (
    <Suspense
      fallback={
        <div className="flex flex-col items-center justify-center min-h-dvh px-6 pb-20">
          <div className="text-4xl mb-4 animate-pulse">✈️</div>
          <p className="text-muted text-sm font-medium">Generating your travel plan...</p>
        </div>
      }
    >
      <ItineraryContent />
    </Suspense>
  );
}

function ItineraryContent() {
  const searchParams = useSearchParams();
  const collectionId = searchParams.get("collectionId") ?? "";

  const collection = mockCollections.find((c) => c.id === collectionId);

  const [itinerary, setItinerary] = useState<Itinerary | null>(null);
  const [loading, setLoading] = useState(true);

  const loadItinerary = useCallback(async () => {
    setLoading(true);
    const data = await getItinerary(collectionId);
    setItinerary(data);
    setLoading(false);
  }, [collectionId]);

  useEffect(() => {
    loadItinerary();
  }, [loadItinerary]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-dvh px-6 pb-20">
        <div className="text-4xl mb-4 animate-pulse">✈️</div>
        <p className="text-muted text-sm font-medium">Generating your travel plan...</p>
      </div>
    );
  }

  if (!itinerary || !collection) {
    return (
      <div className="flex flex-col items-center justify-center min-h-dvh px-6 pb-20 gap-4 text-center">
        <div className="text-4xl">😕</div>
        <h2 className="text-xl font-bold text-foreground">No itinerary found</h2>
        <p className="text-sm text-muted max-w-xs">
          We couldn&apos;t generate a travel plan for this collection. Try a different one.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-dvh pb-20">
      <ItineraryHeader
        collectionName={collection.name}
        collectionEmoji={collection.emoji}
      />
      <ItinerarySummary
        totalDays={itinerary.totalDays}
        totalBudget={itinerary.totalBudget}
        stopCount={itinerary.stops.length}
      />
      <ItineraryTimeline stops={itinerary.stops} />
    </div>
  );
}
