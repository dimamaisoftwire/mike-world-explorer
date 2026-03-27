"use client";

import Image from "next/image";
import { Destination } from "@/lib/types";

const THUMBNAIL_SIZE = 80;
const FALLBACK_IMAGE = "/fallback-destination.svg";

interface DestinationListItemProps {
  destination: Destination;
  onMove?: () => void;
  onRemove?: () => void;
}

export default function DestinationListItem({
  destination,
  onMove,
  onRemove,
}: DestinationListItemProps) {
  return (
    <div className="bg-card-bg rounded-xl overflow-hidden shadow-sm">
      <div className="flex gap-3 p-3">
        <div 
          className="rounded-lg overflow-hidden bg-muted/20 flex-shrink-0 relative"
          style={{ width: THUMBNAIL_SIZE, height: THUMBNAIL_SIZE }}
        >
          <Image
            src={destination.imageUrl}
            alt={`${destination.name}, ${destination.country}`}
            fill
            className="object-cover"
            onError={(e) => {
              e.currentTarget.srcset = "";
              e.currentTarget.src = FALLBACK_IMAGE;
            }}
            sizes="80px"
          />
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground truncate">
            {destination.name}
          </h3>
          <p className="text-sm text-muted truncate">{destination.country}</p>
          <p className="text-xs text-muted mt-1 line-clamp-2">
            {destination.description}
          </p>
        </div>
      </div>

      {(onMove || onRemove) && (
        <div className="flex gap-2 px-3 pb-3">
          {onMove && (
            <button
              onClick={onMove}
              className="flex-1 py-2 px-3 rounded-lg bg-pill-bg text-foreground text-sm font-medium hover:bg-accent-light transition-colors cursor-pointer min-h-[40px]"
            >
              Move
            </button>
          )}
          {onRemove && (
            <button
              onClick={onRemove}
              className="py-2 px-3 rounded-lg bg-red-50 text-red-600 text-sm font-medium hover:bg-red-100 transition-colors cursor-pointer min-h-[40px]"
            >
              Remove
            </button>
          )}
        </div>
      )}
    </div>
  );
}
