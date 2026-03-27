"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, useInView } from "framer-motion";
import { Theme } from "@/lib/types";
import { staggerContainer, fadeUp } from "@/lib/animations";

const recommendations: { theme: Theme; label: string; emoji: string; description: string }[] = [
  { theme: "food", label: "Food Holidays", emoji: "🍜", description: "Eat your way around the world" },
  { theme: "beach", label: "Beach Holidays", emoji: "🏖️", description: "Sun, sand and crystal waters" },
  { theme: "sightseeing", label: "Sightseeing Holidays", emoji: "🏛️", description: "Iconic landmarks and history" },
  { theme: "beginner", label: "New to Travelling", emoji: "🌱", description: "Easy, safe first adventures" },
];

export default function Recommendations() {
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="flex flex-col items-center px-6 py-16"
    >
      <motion.div
        className="flex flex-col items-center gap-8 w-full max-w-sm"
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={staggerContainer}
      >
        <motion.div variants={fadeUp} className="text-center">
          <h2 className="text-2xl font-bold tracking-tight">
            Not sure where to start?
          </h2>
          <p className="text-sm text-muted mt-2">
            Pick a theme and get curated destinations instantly
          </p>
        </motion.div>

        <motion.div variants={fadeUp} className="grid grid-cols-2 gap-3 w-full">
          {recommendations.map((rec) => (
            <button
              key={rec.theme}
              onClick={() => router.push(`/swipe?theme=${rec.theme}`)}
              className="flex flex-col items-center gap-2 p-5 rounded-2xl bg-card-bg shadow-sm border border-black/5 hover:shadow-md hover:scale-[1.02] active:scale-95 transition-all duration-200 cursor-pointer text-center"
            >
              <span className="text-3xl">{rec.emoji}</span>
              <span className="text-sm font-semibold text-foreground leading-tight">
                {rec.label}
              </span>
              <span className="text-xs text-muted leading-snug">
                {rec.description}
              </span>
            </button>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
