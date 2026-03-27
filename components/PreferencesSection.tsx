"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, useInView } from "framer-motion";
import { Budget, Experience, Style, Preferences } from "@/lib/types";
import { staggerContainer, fadeUp } from "@/lib/animations";
import PillGroup from "@/components/PillGroup";

interface PreferencesSectionProps {
  preferences: Preferences;
  onPreferencesChange: (prefs: Preferences) => void;
}

export default function PreferencesSection({
  preferences,
  onPreferencesChange,
}: PreferencesSectionProps) {
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const handleStart = () => {
    localStorage.setItem("preferences", JSON.stringify(preferences));
    router.push("/swipe");
  };

  return (
    <section
      ref={ref}
      className="flex flex-col items-center justify-center min-h-dvh px-6 py-12"
    >
      <motion.div
        className="flex flex-col items-center gap-10 w-full max-w-sm"
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={staggerContainer}
      >
        <motion.h2
          variants={fadeUp}
          className="text-2xl font-bold tracking-tight text-center"
        >
          Personalise your journey
        </motion.h2>

        <motion.div variants={fadeUp} className="flex flex-col items-center gap-3 w-full">
          <label className="text-sm font-semibold uppercase tracking-wide text-muted">
            Budget per place
          </label>
          <PillGroup<Budget>
            options={["$", "$$", "$$$"]}
            selected={preferences.budget}
            onSelect={(v) => onPreferencesChange({ ...preferences, budget: v })}
          />
        </motion.div>

        <motion.div variants={fadeUp} className="flex flex-col items-center gap-3 w-full">
          <label className="text-sm font-semibold uppercase tracking-wide text-muted">
            Travel experience
          </label>
          <PillGroup<Experience>
            options={["Beginner", "Intermediate", "Expert"]}
            selected={preferences.experience}
            onSelect={(v) => onPreferencesChange({ ...preferences, experience: v })}
          />
        </motion.div>

        <motion.div variants={fadeUp} className="flex flex-col items-center gap-3 w-full">
          <label className="text-sm font-semibold uppercase tracking-wide text-muted">
            Holiday style
          </label>
          <PillGroup<Style>
            options={["Relaxed", "Active"]}
            selected={preferences.style}
            onSelect={(v) => onPreferencesChange({ ...preferences, style: v })}
          />
        </motion.div>

        <motion.button
          variants={fadeUp}
          onClick={handleStart}
          className="w-full max-w-xs py-4 rounded-full bg-accent text-white font-semibold text-lg shadow-lg hover:bg-accent-hover active:scale-95 transition-all duration-200 cursor-pointer min-h-[48px]"
        >
          Start Exploring
        </motion.button>
      </motion.div>
    </section>
  );
}
