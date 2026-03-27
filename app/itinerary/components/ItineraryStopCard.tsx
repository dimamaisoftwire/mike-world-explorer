"use client";

import { motion } from "framer-motion";
import { ItineraryStop } from "@/lib/types";

interface ItineraryStopCardProps {
  stop: ItineraryStop;
  index: number;
  isLast: boolean;
}

const cardVariant = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.45, ease: "easeOut" as const } },
};

export default function ItineraryStopCard({
  stop,
  index,
  isLast,
}: ItineraryStopCardProps) {
  return (
    <motion.div className="flex gap-4" variants={cardVariant}>
      {/* Timeline track */}
      <div className="flex flex-col items-center flex-shrink-0 w-10">
        {/* Node circle */}
        <div className="w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center text-sm font-bold shadow-md flex-shrink-0">
          {index + 1}
        </div>

        {/* Connector line */}
        {!isLast && (
          <div className="flex-1 flex flex-col items-center py-1">
            <div className="w-0.5 flex-1 border-l-2 border-dashed border-accent/30" />
            <div className="text-xs my-1">✈️</div>
            <div className="w-0.5 flex-1 border-l-2 border-dashed border-accent/30" />
          </div>
        )}
      </div>

      {/* Stop card */}
      <div className="flex-1 pb-6">
        <div className="bg-card-bg rounded-2xl p-5 shadow-sm border border-black/5">
          {/* Header */}
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="text-lg font-bold text-foreground">{stop.name}</h3>
              <p className="text-sm text-muted">{stop.country}</p>
            </div>
            <span className="text-xs font-semibold bg-accent/10 text-accent px-2.5 py-1 rounded-full flex-shrink-0">
              {stop.days} {stop.days === 1 ? "day" : "days"}
            </span>
          </div>

          {/* Summary */}
          <p className="text-sm text-foreground/80 leading-relaxed mb-3">
            {stop.summary}
          </p>

          {/* Highlights */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {stop.highlights.map((h) => (
              <span
                key={h}
                className="text-xs bg-pill-bg text-foreground/70 px-2.5 py-1 rounded-full font-medium"
              >
                {h}
              </span>
            ))}
          </div>

          {/* Tip */}
          <div className="flex items-start gap-2 bg-accent-light/50 rounded-xl p-3">
            <span className="text-sm flex-shrink-0">💡</span>
            <p className="text-xs text-foreground/70 leading-relaxed italic">
              {stop.tip}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
