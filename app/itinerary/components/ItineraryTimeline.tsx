"use client";

import { motion } from "framer-motion";
import { ItineraryStop } from "@/lib/types";
import ItineraryStopCard from "./ItineraryStopCard";

interface ItineraryTimelineProps {
  stops: ItineraryStop[];
}

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.18, delayChildren: 0.2 },
  },
};

export default function ItineraryTimeline({ stops }: ItineraryTimelineProps) {
  return (
    <motion.div
      className="px-6 py-4"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      {stops.map((stop, i) => (
        <ItineraryStopCard
          key={stop.destinationId}
          stop={stop}
          index={i}
          isLast={i === stops.length - 1}
        />
      ))}

      {/* Journey end marker */}
      <motion.div
        className="flex gap-4"
        variants={{
          hidden: { opacity: 0, scale: 0.8 },
          visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
        }}
      >
        <div className="flex flex-col items-center w-10">
          <div className="w-10 h-10 rounded-full bg-accent/20 text-accent flex items-center justify-center text-lg flex-shrink-0">
            🏁
          </div>
        </div>
        <div className="flex items-center">
          <p className="text-sm font-semibold text-muted">End of journey</p>
        </div>
      </motion.div>
    </motion.div>
  );
}
