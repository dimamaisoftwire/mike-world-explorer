"use client";

import { motion } from "framer-motion";
import { Destination } from "@/lib/types";
import DestinationListItem from "@/components/DestinationListItem";
import EmptyState from "./EmptyState";

interface DestinationsListViewProps {
  destinations: Destination[];
  transitionDuration: number;
  onMove: (destination: Destination) => void;
  onRemove: (destinationId: string) => void;
}

export default function DestinationsListView({
  destinations,
  transitionDuration,
  onMove,
  onRemove,
}: DestinationsListViewProps) {
  return (
    <motion.div
      key="destinations"
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 100, opacity: 0 }}
      transition={{ duration: transitionDuration }}
      className="px-6 py-6"
    >
      {destinations.length === 0 ? (
        <EmptyState
          icon="📭"
          title="Collection is empty"
          description="Move items from other collections or swipe to add new destinations."
        />
      ) : (
        <div className="space-y-3">
          {destinations.map((destination) => (
            <DestinationListItem
              key={destination.id}
              destination={destination}
              onMove={() => onMove(destination)}
              onRemove={() => onRemove(destination.id)}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}
