"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { label: "Home", href: "/", icon: "🏠" },
  { label: "Explore", href: "/swipe", icon: "🧭" },
  { label: "Collections", href: "/collections", icon: "❤️" },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card-bg border-t border-black/5 pb-[env(safe-area-inset-bottom)]">
      <div className="flex items-center justify-around h-14 max-w-md mx-auto">
        {tabs.map((tab) => {
          const isActive = pathname === tab.href;
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`flex flex-col items-center justify-center gap-0.5 min-w-[64px] min-h-[44px] text-xs font-medium transition-colors ${
                isActive ? "text-accent" : "text-muted"
              }`}
            >
              <span className="text-lg">{tab.icon}</span>
              <span>{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
