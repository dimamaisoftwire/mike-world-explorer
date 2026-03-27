"use client";

import { useState, FormEvent } from "react";
import BottomSheet from "./BottomSheet";

interface EditCollectionDialogProps {
  isOpen: boolean;
  collectionName: string;
  onClose: () => void;
  onRename: (newName: string) => void;
  onDelete: () => void;
}

export default function EditCollectionDialog({
  isOpen,
  collectionName,
  onClose,
  onRename,
  onDelete,
}: EditCollectionDialogProps) {
  const [name, setName] = useState(collectionName);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleRename = (e: FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim();
    
    if (trimmedName && trimmedName !== collectionName) {
      onRename(trimmedName);
      onClose();
    } else if (trimmedName === collectionName) {
      onClose();
    }
  };

  const handleDelete = () => {
    onDelete();
    setShowDeleteConfirm(false);
    onClose();
  };

  const handleClose = () => {
    setName(collectionName);
    setShowDeleteConfirm(false);
    onClose();
  };

  return (
    <BottomSheet isOpen={isOpen} onClose={handleClose}>
          
          {!showDeleteConfirm ? (
            <>
              <h2 className="text-xl font-bold text-foreground mb-4">
                Edit Collection
              </h2>
              
              <form onSubmit={handleRename}>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Collection name"
                  className="w-full px-4 py-3 rounded-lg bg-pill-bg text-foreground placeholder:text-muted border-2 border-transparent focus:border-accent outline-none transition-colors"
                  autoFocus
                />
                
                <div className="flex flex-col gap-3 mt-6">
                  <div className="flex gap-3">
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
                      Rename
                    </button>
                  </div>
                  
                  <button
                    type="button"
                    onClick={() => setShowDeleteConfirm(true)}
                    className="w-full py-3 rounded-full bg-red-50 text-red-600 font-medium hover:bg-red-100 transition-colors cursor-pointer min-h-[48px]"
                  >
                    Delete Collection
                  </button>
                </div>
              </form>
            </>
          ) : (
            <>
              <h2 className="text-xl font-bold text-foreground mb-2">
                Delete Collection?
              </h2>
              <p className="text-muted text-sm mb-6">
                This will permanently delete &quot;{collectionName}&quot; and all its items.
              </p>
              
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="flex-1 py-3 rounded-full bg-pill-bg text-foreground font-medium hover:bg-accent-light transition-colors cursor-pointer min-h-[48px]"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="flex-1 py-3 rounded-full bg-red-600 text-white font-medium hover:bg-red-700 transition-colors cursor-pointer min-h-[48px]"
                >
                  Delete
                </button>
              </div>
            </>
          )}
    </BottomSheet>
  );
}
