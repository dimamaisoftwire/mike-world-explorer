"use client";

interface CollectionsHeaderProps {
  currentView: "collections" | "destinations";
  selectedCollection?: {
    id: string;
    name: string;
    emoji: string;
  } | null;
  onBack: () => void;
  onCreateClick: () => void;
  onEditClick: () => void;
  canEdit: boolean;
}

export default function CollectionsHeader({
  currentView,
  selectedCollection,
  onBack,
  onCreateClick,
  onEditClick,
  canEdit,
}: CollectionsHeaderProps) {
  return (
    <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-muted/20">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {currentView === "collections" ? (
            <>
              <h1 className="text-2xl font-bold text-foreground">Collections</h1>
              <button
                onClick={onCreateClick}
                className="w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center text-xl hover:bg-accent-hover transition-colors cursor-pointer"
                aria-label="Create collection"
              >
                +
              </button>
            </>
          ) : (
            <>
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <button
                  onClick={onBack}
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
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-2xl flex-shrink-0">{selectedCollection?.emoji}</span>
                  <h1 className="text-xl font-bold text-foreground truncate">
                    {selectedCollection?.name}
                  </h1>
                </div>
              </div>
              {canEdit && (
                <button
                  onClick={onEditClick}
                  className="w-10 h-10 rounded-full bg-pill-bg hover:bg-accent-light transition-colors flex items-center justify-center cursor-pointer flex-shrink-0"
                  aria-label="Edit collection"
                >
                  <span className="text-lg">⋯</span>
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
