"use client";

import { motion } from "framer-motion";
import { Collection } from "@/lib/types";
import CollectionListItem from "@/components/CollectionListItem";
import EmptyListView from "./EmptyListView";

interface CollectionsListViewProps {
  collections: Collection[];
  transitionDuration: number;
  likedCollectionId: string;
  onCollectionClick: (collection: { id: string; name: string; emoji: string }) => void;
  onEditClick: (collectionId: string) => void;
  onPlanTrip: (collectionId: string) => void;
}

export default function CollectionsListView({
  collections,
  transitionDuration,
  likedCollectionId,
  onCollectionClick,
  onEditClick,
  onPlanTrip,
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
        <EmptyListView
          icon="❤️"
          title="No collections yet"
          description="Start swiping to add destinations to your liked collection."
        />
      ) : (
        <div className="space-y-3">
          {collections.map((collection) => (
            <CollectionListItem
              key={collection.id}
              collection={collection}
              onClick={() => onCollectionClick(collection)}
              onEdit={
                collection.id !== likedCollectionId
                  ? () => onEditClick(collection.id)
                  : undefined
              }
              onPlanTrip={() => onPlanTrip(collection.id)}
              likedCollectionId={likedCollectionId}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}
