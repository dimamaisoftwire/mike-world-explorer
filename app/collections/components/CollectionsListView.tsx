"use client";

import { motion } from "framer-motion";
import CollectionListItem from "@/components/CollectionListItem";
import EmptyState from "./EmptyState";

interface Collection {
  id: string;
  name: string;
  emoji: string;
  count: number;
  destinations: Array<{ imageUrl: string }>;
}

interface CollectionsListViewProps {
  collections: Collection[];
  transitionDuration: number;
  likedCollectionId: string;
  onCollectionClick: (collection: { id: string; name: string; emoji: string }) => void;
  onEditClick: (collectionId: string) => void;
}

export default function CollectionsListView({
  collections,
  transitionDuration,
  likedCollectionId,
  onCollectionClick,
  onEditClick,
}: CollectionsListViewProps) {
  return (
    <motion.div
      key="collections"
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -100, opacity: 0 }}
      transition={{ duration: transitionDuration }}
      className="px-6 py-6"
    >
      {collections.length === 0 ? (
        <EmptyState
          icon="❤️"
          title="No collections yet"
          description="Start swiping to add destinations to your liked collection."
        />
      ) : (
        <div className="space-y-3">
          {collections.map((collection) => (
            <CollectionListItem
              key={collection.id}
              name={collection.name}
              emoji={collection.emoji}
              count={collection.count}
              previewImages={collection.destinations.map((d) => d.imageUrl)}
              onClick={() => onCollectionClick(collection)}
              onEdit={
                collection.id !== likedCollectionId
                  ? () => onEditClick(collection.id)
                  : undefined
              }
              isLiked={collection.id === likedCollectionId}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}
