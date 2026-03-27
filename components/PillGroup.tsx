"use client";

interface PillGroupProps<T extends string> {
  options: T[];
  selected: T;
  onSelect: (value: T) => void;
}

export default function PillGroup<T extends string>({
  options,
  selected,
  onSelect,
}: PillGroupProps<T>) {
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
