"use client";

import { useState, FormEvent } from "react";
import BottomSheet from "./BottomSheet";

interface CreateCollectionDialogProps {
  onClose: () => void;
  onCreate: (name: string) => void;
}

export default function CreateCollectionDialog({
  onClose,
  onCreate,
}: CreateCollectionDialogProps) {
  const [name, setName] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim();
    
    if (trimmedName) {
      onCreate(trimmedName);
      setName("");
      onClose();
    }
  };

  const handleClose = () => {
    setName("");
    onClose();
  };

  return (
    <BottomSheet onClose={handleClose}>
      <h2 className="text-xl font-bold text-foreground mb-4">
        Create Collection
      </h2>
      
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Collection name"
          className="w-full px-4 py-3 rounded-lg bg-pill-bg text-foreground placeholder:text-muted border-2 border-transparent focus:border-accent outline-none transition-colors"
          autoFocus
        />
        
        <div className="flex gap-3 mt-6">
          <button
            type="button"
            onClick={handleClose}
            className="flex-1 py-3 rounded-full bg-pill-bg text-foreground font-medium hover:bg-accent-light transition-colors cursor-pointer min-h-[48px]"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 py-3 rounded-full bg-accent text-white font-medium hover:bg-accent-hover transition-colors cursor-pointer min-h-[48px]"
          >
            Create
          </button>
        </div>
      </form>
    </BottomSheet>
  );
}
