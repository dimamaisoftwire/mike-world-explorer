"use client";

import { useState } from "react";
import { motion, useMotionValue, useTransform, PanInfo, AnimatePresence } from "framer-motion";
import { Destination } from "@/lib/types";

const SWIPE_THRESHOLD = 100;

interface SwipeCardProps {
  destination: Destination;
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  isTop: boolean;
}

export default function SwipeCard({
  destination,
  onSwipeLeft,
  onSwipeRight,
  isTop,
}: SwipeCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 0, 200], [-15, 0, 15]);
  const likeOpacity = useTransform(x, [0, SWIPE_THRESHOLD], [0, 1]);
  const skipOpacity = useTransform(x, [-SWIPE_THRESHOLD, 0], [1, 0]);

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    setIsDragging(false);
    if (info.offset.x > SWIPE_THRESHOLD) {
      onSwipeRight();
    } else if (info.offset.x < -SWIPE_THRESHOLD) {
      onSwipeLeft();
    }
  };

  const handleTap = () => {
    if (!isDragging && isTop) {
      setExpanded((prev) => !prev);
    }
  };

  return (
    <motion.div
      className="absolute inset-0 cursor-grab active:cursor-grabbing"
      style={{ x, rotate: expanded ? 0 : rotate, zIndex: isTop ? 10 : 0 }}
      drag={isTop && !expanded ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.9}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      initial={{ scale: isTop ? 1 : 0.95, opacity: isTop ? 1 : 0.7 }}
      animate={{ scale: isTop ? 1 : 0.95, opacity: isTop ? 1 : 0.7 }}
      exit={{
        x: x.get() > 0 ? 300 : -300,
        opacity: 0,
        transition: { duration: 0.3 },
      }}
    >
      <div
        className="relative w-full h-full rounded-2xl overflow-hidden shadow-xl bg-card-bg"
        onClick={handleTap}
      >
        <img
          src={destination.imageUrl}
          alt={destination.name}
          className="absolute inset-0 w-full h-full object-cover"
          draggable={false}
        />

        <motion.div
          className="absolute inset-0"
          animate={{
            background: expanded
              ? "linear-gradient(to top, rgba(0,0,0,0.85) 60%, rgba(0,0,0,0.4) 100%)"
              : "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 40%, transparent 100%)",
          }}
          transition={{ duration: 0.3 }}
        />

        <motion.div
          className="absolute top-8 left-6 border-4 border-green-500 rounded-xl px-4 py-2 -rotate-12"
          style={{ opacity: likeOpacity }}
        >
          <span className="text-green-500 text-3xl font-black">LIKE</span>
        </motion.div>

        <motion.div
          className="absolute top-8 right-6 border-4 border-red-500 rounded-xl px-4 py-2 rotate-12"
          style={{ opacity: skipOpacity }}
        >
          <span className="text-red-500 text-3xl font-black">NOPE</span>
        </motion.div>

        {isTop && !expanded && (
          <div className="absolute top-4 left-0 right-0 flex justify-center pointer-events-none">
            <span className="text-white/50 text-xs font-medium bg-black/20 px-3 py-1 rounded-full">
              Tap for more info
            </span>
          </div>
        )}

        <div className="absolute bottom-0 left-0 right-0 p-5 text-white overflow-y-auto max-h-[85%]">
          <h2 className="text-2xl font-bold">{destination.name}</h2>
          <p className="text-sm text-white/80 font-medium">{destination.country}</p>
          <p className="text-sm text-white/70 mt-2 leading-relaxed">
            {destination.description}
          </p>

          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" as const }}
                className="overflow-hidden"
              >
                <div className="mt-4 pt-4 border-t border-white/20 space-y-4">
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-wide text-white/50 mb-2">
                      Things to do
                    </h3>
                    <ul className="space-y-1.5">
                      {destination.activities.map((activity) => (
                        <li
                          key={activity}
                          className="text-sm text-white/80 flex items-start gap-2"
                        >
                          <span className="mt-0.5 shrink-0">•</span>
                          {activity}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-wide text-white/50 mb-1">
                      Best time to visit
                    </h3>
                    <p className="text-sm text-white/80">{destination.bestTime}</p>
                  </div>

                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-wide text-white/50 mb-1">
                      Top tip
                    </h3>
                    <p className="text-sm text-white/80 italic">
                      {destination.tip}
                    </p>
                  </div>
                </div>

                <p className="text-center text-white/40 text-xs mt-4">
                  Tap to collapse
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
