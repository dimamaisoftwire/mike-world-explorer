"use client";

import { motion, useMotionValue, useTransform, PanInfo } from "framer-motion";
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
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 0, 200], [-15, 0, 15]);
  const likeOpacity = useTransform(x, [0, SWIPE_THRESHOLD], [0, 1]);
  const skipOpacity = useTransform(x, [-SWIPE_THRESHOLD, 0], [1, 0]);

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x > SWIPE_THRESHOLD) {
      onSwipeRight();
    } else if (info.offset.x < -SWIPE_THRESHOLD) {
      onSwipeLeft();
    }
  };

  return (
    <motion.div
      className="absolute inset-0 cursor-grab active:cursor-grabbing"
      style={{ x, rotate, zIndex: isTop ? 10 : 0 }}
      drag={isTop ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.9}
      onDragEnd={handleDragEnd}
      initial={{ scale: isTop ? 1 : 0.95, opacity: isTop ? 1 : 0.7 }}
      animate={{ scale: isTop ? 1 : 0.95, opacity: isTop ? 1 : 0.7 }}
      exit={{
        x: x.get() > 0 ? 300 : -300,
        opacity: 0,
        transition: { duration: 0.3 },
      }}
    >
      <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-xl bg-card-bg">
        {/* Image */}
        <img
          src={destination.imageUrl}
          alt={destination.name}
          className="absolute inset-0 w-full h-full object-cover"
          draggable={false}
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Like overlay */}
        <motion.div
          className="absolute top-8 left-6 border-4 border-green-500 rounded-xl px-4 py-2 -rotate-12"
          style={{ opacity: likeOpacity }}
        >
          <span className="text-green-500 text-3xl font-black">LIKE</span>
        </motion.div>

        {/* Skip overlay */}
        <motion.div
          className="absolute top-8 right-6 border-4 border-red-500 rounded-xl px-4 py-2 rotate-12"
          style={{ opacity: skipOpacity }}
        >
          <span className="text-red-500 text-3xl font-black">NOPE</span>
        </motion.div>

        {/* Card content */}
        <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
          <h2 className="text-2xl font-bold">{destination.name}</h2>
          <p className="text-sm text-white/80 font-medium">{destination.country}</p>
          <p className="text-sm text-white/70 mt-2 leading-relaxed">
            {destination.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
