"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Destination } from "@/lib/types";
import { getCollectionNames, addToCollection } from "@/lib/storage";

interface CollectionPopupProps {
  destination: Destination;
  onClose: () => void;
}

export default function CollectionPopup({
  destination,
  onClose,
}: CollectionPopupProps) {
  const [collectionNames, setCollectionNames] = useState<string[]>([]);
  const [addedTo, setAddedTo] = useState<string | null>(null);

  useEffect(() => {
    setCollectionNames(getCollectionNames());

    const timer = setTimeout(() => {
      onClose();
    }, 4000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const handleAdd = (name: string) => {
    addToCollection(name, destination);
    setAddedTo(name);
    setTimeout(onClose, 800);
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-end justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/30" onClick={onClose} />

        {/* Bottom sheet */}
        <motion.div
          className="relative z-10 w-full max-w-md bg-card-bg rounded-t-2xl p-6 pb-[calc(1.5rem+env(safe-area-inset-bottom))]"
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
        >
          {/* Handle */}
          <div className="w-10 h-1 rounded-full bg-muted/30 mx-auto mb-4" />

          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">✓</span>
            <div>
              <p className="font-semibold text-foreground">
                Added to Liked
              </p>
              <p className="text-sm text-muted">
                {destination.name}, {destination.country}
              </p>
            </div>
          </div>

          {collectionNames.length > 0 && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-muted mb-3">
                Also add to collection
              </p>
              <div className="flex flex-wrap gap-2">
                {collectionNames.map((name) => (
                  <button
                    key={name}
                    onClick={() => handleAdd(name)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all min-h-[40px] cursor-pointer ${
                      addedTo === name
                        ? "bg-accent text-white"
                        : "bg-pill-bg text-foreground hover:bg-accent-light"
                    }`}
                  >
                    {addedTo === name ? `✓ ${name}` : name}
                  </button>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={onClose}
            className="w-full mt-4 py-3 rounded-full bg-pill-bg text-foreground font-medium text-sm hover:bg-accent-light transition-colors cursor-pointer min-h-[44px]"
          >
            Continue swiping
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
