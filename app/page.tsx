"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, useInView } from "framer-motion";

type Budget = "$" | "$$" | "$$$";
type Experience = "Beginner" | "Intermediate" | "Expert";
type Style = "Relaxed" | "Active";

interface Preferences {
  budget: Budget;
  experience: Experience;
  style: Style;
}

function PillGroup<T extends string>({
  options,
  selected,
  onSelect,
}: {
  options: T[];
  selected: T;
  onSelect: (value: T) => void;
}) {
  return (
    <div className="flex gap-2">
      {options.map((option) => (
        <button
          key={option}
          onClick={() => onSelect(option)}
          className={`px-5 py-3 rounded-full text-sm font-medium transition-all duration-200 min-w-[44px] min-h-[44px] cursor-pointer ${
            selected === option
              ? "bg-pill-active-bg text-pill-active-text shadow-md scale-105"
              : "bg-pill-bg text-foreground hover:bg-accent-light"
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export default function Home() {
  const router = useRouter();
  const prefsRef = useRef<HTMLDivElement>(null);
  const prefsInView = useInView(prefsRef, { once: true, margin: "-100px" });

  const [preferences, setPreferences] = useState<Preferences>({
    budget: "$$",
    experience: "Beginner",
    style: "Relaxed",
  });

  const handleStart = () => {
    localStorage.setItem("preferences", JSON.stringify(preferences));
    router.push("/swipe");
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
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

        {/* Scroll indicator */}
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

      {/* Preferences Section */}
      <section
        ref={prefsRef}
        className="flex flex-col items-center justify-center min-h-dvh px-6 py-12"
      >
        <motion.div
          className="flex flex-col items-center gap-10 w-full max-w-sm"
          initial="hidden"
          animate={prefsInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          <motion.h2
            variants={fadeUp}
            className="text-2xl font-bold tracking-tight text-center"
          >
            Personalise your journey
          </motion.h2>

          {/* Budget */}
          <motion.div variants={fadeUp} className="flex flex-col items-center gap-3 w-full">
            <label className="text-sm font-semibold uppercase tracking-wide text-muted">
              Budget per place
            </label>
            <PillGroup<Budget>
              options={["$", "$$", "$$$"]}
              selected={preferences.budget}
              onSelect={(v) => setPreferences((p) => ({ ...p, budget: v }))}
            />
          </motion.div>

          {/* Experience */}
          <motion.div variants={fadeUp} className="flex flex-col items-center gap-3 w-full">
            <label className="text-sm font-semibold uppercase tracking-wide text-muted">
              Travel experience
            </label>
            <PillGroup<Experience>
              options={["Beginner", "Intermediate", "Expert"]}
              selected={preferences.experience}
              onSelect={(v) => setPreferences((p) => ({ ...p, experience: v }))}
            />
          </motion.div>

          {/* Style */}
          <motion.div variants={fadeUp} className="flex flex-col items-center gap-3 w-full">
            <label className="text-sm font-semibold uppercase tracking-wide text-muted">
              Holiday style
            </label>
            <PillGroup<Style>
              options={["Relaxed", "Active"]}
              selected={preferences.style}
              onSelect={(v) => setPreferences((p) => ({ ...p, style: v }))}
            />
          </motion.div>

          {/* Start Button */}
          <motion.button
            variants={fadeUp}
            onClick={handleStart}
            className="w-full max-w-xs py-4 rounded-full bg-accent text-white font-semibold text-lg shadow-lg hover:bg-accent-hover active:scale-95 transition-all duration-200 cursor-pointer min-h-[48px]"
          >
            Start Exploring
          </motion.button>
        </motion.div>
      </section>
    </div>
  );
}
