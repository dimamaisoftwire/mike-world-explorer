"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Collection } from "@/lib/types";

const TAP_SCALE = 0.98;
const MAX_PREVIEW_IMAGES = 3;
const PREVIEW_THUMBNAIL_SIZE = 40;
const FALLBACK_IMAGE = "/fallback-destination.svg";

interface CollectionListItemProps {
  collection: Collection;
  onClick: () => void;
  onEdit?: () => void;
  likedCollectionId: string;
}

export default function CollectionListItem({
  collection,
  onClick,
  onEdit,
  likedCollectionId,
}: CollectionListItemProps) {
  const isLiked = collection.id === likedCollectionId;
  return (
    <motion.div
      className="bg-card-bg rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
      whileTap={{ scale: TAP_SCALE }}
    >
      <div className="flex items-center gap-3">
        <button
          onClick={onClick}
          className="flex-1 flex items-center gap-3 min-h-[44px]"
        >
          <span className="text-3xl">{collection.emoji}</span>
          
          <div className="flex-1 text-left">
            <h3 className="font-semibold text-foreground">{collection.name}</h3>
            <p className="text-sm text-muted">{collection.count} {collection.count === 1 ? 'place' : 'places'}</p>
          </div>

          {collection.destinations.length > 0 && (
            <div className="flex -space-x-2">
              {collection.destinations.slice(0, MAX_PREVIEW_IMAGES).map((dest, idx) => (
                <div
                  key={idx}
                  className="rounded-full border-2 border-card-bg overflow-hidden bg-muted/20 relative"
                  style={{ width: PREVIEW_THUMBNAIL_SIZE, height: PREVIEW_THUMBNAIL_SIZE }}
                >
                  <Image
                    src={dest.imageUrl}
                    alt={`${dest.name}, ${dest.country}`}
                    fill
                    className="object-cover"
                    onError={(e) => {
                      e.currentTarget.srcset = "";
                      e.currentTarget.src = FALLBACK_IMAGE;
                    }}
                    sizes="40px"
                  />
                </div>
              ))}
            </div>
          )}

          <svg
            className="w-5 h-5 text-muted flex-shrink-0"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {!isLiked && onEdit && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
            className="w-10 h-10 rounded-full bg-pill-bg text-muted hover:bg-accent-light hover:text-foreground transition-colors flex items-center justify-center flex-shrink-0"
            aria-label="Edit collection"
          >
            <span className="text-lg">⋯</span>
          </button>
        )}
      </div>
    </motion.div>
  );
}
