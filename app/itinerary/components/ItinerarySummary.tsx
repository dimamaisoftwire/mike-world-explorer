"use client";

import { motion } from "framer-motion";

interface ItinerarySummaryProps {
  totalDays: number;
  totalBudget: string;
  stopCount: number;
}

const fadeIn = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
};

export default function ItinerarySummary({
  totalDays,
  totalBudget,
  stopCount,
}: ItinerarySummaryProps) {
  const stats = [
    { label: "Days", value: String(totalDays), emoji: "📅" },
    { label: "Budget", value: totalBudget, emoji: "💰" },
    { label: "Stops", value: String(stopCount), emoji: "📍" },
  ];

  return (
    <motion.div
      className="flex gap-3 px-6 py-4"
      variants={fadeIn}
      initial="hidden"
      animate="visible"
    >
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="flex-1 bg-card-bg rounded-xl p-3 text-center shadow-sm"
        >
          <div className="text-lg mb-1">{stat.emoji}</div>
          <div className="text-base font-bold text-foreground">{stat.value}</div>
          <div className="text-xs text-muted font-medium">{stat.label}</div>
        </div>
      ))}
    </motion.div>
  );
}
