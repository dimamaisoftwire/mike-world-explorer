interface DestinationsViewHeaderProps {
  collection: {
    id: string;
    name: string;
    emoji: string;
  };
  onBack: () => void;
  onEditClick: () => void;
  canEdit: boolean;
}

export default function DestinationsViewHeader({
  collection,
  onBack,
  onEditClick,
  canEdit,
}: DestinationsViewHeaderProps) {
  return (
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
          <h1 className="text-xl font-bold text-foreground truncate">
            {collection.name}
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
  );
}
