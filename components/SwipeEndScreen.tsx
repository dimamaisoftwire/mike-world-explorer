"use client";

import Link from "next/link";

interface SwipeEndScreenProps {
  onExploreMore: () => void;
}

export default function SwipeEndScreen({ onExploreMore }: SwipeEndScreenProps) {
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
          onClick={onExploreMore}
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
