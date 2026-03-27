"use client";

interface SwipeActionsProps {
  onSkip: () => void;
  onLike: () => void;
}

export default function SwipeActions({ onSkip, onLike }: SwipeActionsProps) {
  return (
    <div className="flex items-center gap-8">
      <button
        onClick={onSkip}
        className="w-14 h-14 rounded-full bg-red-50 text-red-500 flex items-center justify-center text-2xl shadow-md hover:bg-red-100 active:scale-90 transition-all cursor-pointer"
        aria-label="Skip"
      >
        ✗
      </button>
      <button
        onClick={onLike}
        className="w-14 h-14 rounded-full bg-green-50 text-green-500 flex items-center justify-center text-2xl shadow-md hover:bg-green-100 active:scale-90 transition-all cursor-pointer"
        aria-label="Like"
      >
        ♥
      </button>
    </div>
  );
}
