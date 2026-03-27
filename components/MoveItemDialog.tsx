"use client";

import BottomSheet from "./BottomSheet";

interface MoveItemDialogProps {
  itemName: string;
  currentCollection: string;
  collections: Array<{ id: string; name: string; emoji: string }>;
  onClose: () => void;
  onMove: (collectionId: string) => void;
}

export default function MoveItemDialog({
  itemName,
  currentCollection,
  collections,
  onClose,
  onMove,
}: MoveItemDialogProps) {
  const availableCollections = collections.filter(
    (c) => c.id !== currentCollection
  );

  return (
    <BottomSheet onClose={onClose}>
          
          <h3 className="text-lg font-bold text-foreground mb-2">
            Move to Collection
          </h3>
          <p className="text-sm text-muted mb-4 truncate">
            {itemName}
          </p>
          
          {availableCollections.length === 0 ? (
            <p className="text-muted text-sm text-center py-8">
              No other collections available
            </p>
          ) : (
            <div className="space-y-2 max-h-[50vh] overflow-y-auto mb-4">
              {availableCollections.map((collection) => (
                <button
                  key={collection.id}
                  onClick={() => {
                    onMove(collection.id);
                    onClose();
                  }}
                  className="w-full py-3 px-4 rounded-lg bg-pill-bg text-foreground text-left font-medium hover:bg-accent-light transition-colors cursor-pointer flex items-center gap-3 min-h-[48px]"
                >
                  <span className="text-xl">{collection.emoji}</span>
                  <span>{collection.name}</span>
                </button>
              ))}
            </div>
          )}
          
          <button
            onClick={onClose}
            className="w-full py-3 rounded-full bg-accent text-white font-medium hover:bg-accent-hover transition-colors cursor-pointer min-h-[48px]"
          >
            Cancel
          </button>
    </BottomSheet>
  );
}
