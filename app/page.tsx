"use client";

import { useState } from "react";
import { Preferences } from "@/lib/types";
import HeroSection from "@/components/HeroSection";
import PreferencesSection from "@/components/PreferencesSection";
import Recommendations from "@/components/Recommendations";

export default function Home() {
  const [preferences, setPreferences] = useState<Preferences>({
    budget: "$$",
    experience: "Beginner",
    style: "Relaxed",
  });

  return (
    <div className="flex flex-col">
      <HeroSection />
      <PreferencesSection
        preferences={preferences}
        onPreferencesChange={setPreferences}
      />
      <Recommendations />
    </div>
  );
}
