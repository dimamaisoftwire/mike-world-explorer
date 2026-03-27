"use client";

import { useRouter } from "next/navigation";

interface ItineraryHeaderProps {
  collectionName: string;
  collectionEmoji: string;
}

export default function ItineraryHeader({
  collectionName,
  collectionEmoji,
}: ItineraryHeaderProps) {
  const router = useRouter();

  return (
    <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-muted/20">
      <div className="px-6 py-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push("/collections")}
            className="w-10 h-10 rounded-full bg-pill-bg hover:bg-accent-light transition-colors flex items-center justify-center cursor-pointer flex-shrink-0"
            aria-label="Back to collections"
          >
            <svg
              className="w-5 h-5 text-foreground"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <span className="text-2xl">{collectionEmoji}</span>
          <h1 className="text-xl font-bold text-foreground truncate">
            {collectionName}
          </h1>
        </div>
      </div>
    </div>
  );
}
