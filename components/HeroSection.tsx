"use client";

import { motion } from "framer-motion";
import { staggerContainer, fadeUp } from "@/lib/animations";

export default function HeroSection() {
  return (
    <section className="flex flex-col items-center justify-center min-h-dvh px-6 relative">
      <motion.div
        className="flex flex-col items-center gap-4 text-center"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <motion.div variants={fadeUp} className="text-5xl mb-2">
          🌍
        </motion.div>
        <motion.h1
          variants={fadeUp}
          className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl"
        >
          World Explorer
        </motion.h1>
        <motion.p
          variants={fadeUp}
          className="text-lg text-muted max-w-xs"
        >
          Discover your next adventure, one swipe at a time
        </motion.p>
      </motion.div>

      <motion.div
        className="absolute bottom-8 flex flex-col items-center gap-2 text-muted"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
      >
        <span className="text-xs font-medium uppercase tracking-widest">
          Set your preferences
        </span>
        <svg
          className="w-5 h-5 animate-bounce-down"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </motion.div>
    </section>
  );
}
