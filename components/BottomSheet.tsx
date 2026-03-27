"use client";

import { ReactNode } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";

const DRAG_DISMISS_THRESHOLD = 100;
const BOTTOM_SHEET_SPRING = {
  damping: 25,
  stiffness: 300,
};

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function BottomSheet({
  isOpen,
  onClose,
  children,
}: BottomSheetProps) {
  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.y > DRAG_DISMISS_THRESHOLD) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[60] flex items-end justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="absolute inset-0 bg-black/30 pointer-events-none" />
        
        <motion.div
          className="relative z-10 w-full max-w-md bg-card-bg rounded-t-2xl p-6 pb-[calc(1.5rem+env(safe-area-inset-bottom))] pointer-events-auto"
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", ...BOTTOM_SHEET_SPRING }}
          drag="y"
          dragConstraints={{ top: 0, bottom: 0 }}
          dragElastic={{ top: 0, bottom: 0.5 }}
          onDragEnd={handleDragEnd}
        >
          <div className="w-10 h-1 rounded-full bg-muted/30 mx-auto mb-4" />
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
