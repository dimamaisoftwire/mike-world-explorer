interface CollectionsViewHeaderProps {
  onCreateClick: () => void;
}

export default function CollectionsViewHeader({ onCreateClick }: CollectionsViewHeaderProps) {
  return (
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
  );
}
