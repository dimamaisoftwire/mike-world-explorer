"use client";

import { useState, useMemo } from "react";
import { AnimatePresence } from "framer-motion";
import { Destination } from "@/lib/types";
import { mockCollections } from "@/lib/mockData";
import CollectionsViewHeader from "./components/CollectionsViewHeader";
import DestinationsViewHeader from "./components/DestinationsViewHeader";
import CollectionsListView from "./components/CollectionsListView";
import DestinationsListView from "./components/DestinationsListView";
import CreateCollectionDialog from "@/components/CreateCollectionDialog";
import EditCollectionDialog from "@/components/EditCollectionDialog";
import MoveItemDialog from "@/components/MoveItemDialog";

const VIEW_TRANSITION_DURATION = 0.3;
const LIKED_COLLECTION_ID = "liked";

type ViewType = "collections" | "destinations";

interface SelectedCollection {
  id: string;
  name: string;
  emoji: string;
}

type MoveDialogState = {
  destination: Destination | null;
  fromCollection: string;
};

export default function CollectionsPage() {
  const [currentView, setCurrentView] = useState<ViewType>("collections");
  const [selectedCollection, setSelectedCollection] = useState<SelectedCollection | null>(null);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [editingCollection, setEditingCollection] = useState<string | null>(null);
  const [moveDialogState, setMoveDialogState] = useState<MoveDialogState>({
    destination: null,
    fromCollection: "",
  });

  const openCollection = (collection: { id: string; name: string; emoji: string }) => {
    setSelectedCollection(collection);
    setCurrentView("destinations");
  };

  const backToCollections = () => {
    setCurrentView("collections");
    setSelectedCollection(null);
  };

  const handleCreateCollection = (name: string) => {
    // TODO: Implement with actual storage
    console.log("Create collection:", name);
  };

  const handleRenameCollection = (newName: string) => {
    // TODO: Implement with actual storage
    console.log("Rename collection to:", newName);
  };

  const handleDeleteCollection = () => {
    // TODO: Implement with actual storage
    console.log("Delete collection");
    backToCollections();
  };

  const handleMoveItem = (toCollectionId: string) => {
    // TODO: Implement with actual storage
    console.log("Move item to:", toCollectionId);
  };

  const handleRemoveItem = (destinationId: string) => {
    // TODO: Implement with actual storage
    console.log("Remove item:", destinationId);
  };

  const collectionsMap = useMemo(
    () => new Map(mockCollections.map((c) => [c.id, c])),
    []
  );

  const currentDestinations = selectedCollection
    ? collectionsMap.get(selectedCollection.id)?.destinations || []
    : [];

  return (
    <div className="flex flex-col min-h-dvh pb-20">
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-muted/20">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            {currentView === "collections" ? (
              <CollectionsViewHeader onCreateClick={() => setShowCreateDialog(true)} />
            ) : selectedCollection ? (
              <DestinationsViewHeader
                collection={selectedCollection}
                onBack={backToCollections}
                onEditClick={() => setEditingCollection(selectedCollection?.id || null)}
                canEdit={selectedCollection?.id !== LIKED_COLLECTION_ID}
              />
            ) : null}
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          {currentView === "collections" ? (
            <CollectionsListView
              collections={mockCollections}
              transitionDuration={VIEW_TRANSITION_DURATION}
              likedCollectionId={LIKED_COLLECTION_ID}
              onCollectionClick={openCollection}
              onEditClick={setEditingCollection}
            />
          ) : (
            <DestinationsListView
              destinations={currentDestinations}
              transitionDuration={VIEW_TRANSITION_DURATION}
              onMove={(destination) =>
                setMoveDialogState({
                  destination,
                  fromCollection: selectedCollection?.id || "",
                })
              }
              onRemove={handleRemoveItem}
            />
          )}
        </AnimatePresence>
      </div>

      {showCreateDialog && (
        <CreateCollectionDialog
          onClose={() => setShowCreateDialog(false)}
          onCreate={handleCreateCollection}
        />
      )}

      {editingCollection && (
        <EditCollectionDialog
          collectionName={collectionsMap.get(editingCollection)?.name || ""}
          onClose={() => setEditingCollection(null)}
          onRename={handleRenameCollection}
          onDelete={handleDeleteCollection}
        />
      )}

      {moveDialogState.destination && (
        <MoveItemDialog
          itemName={`${moveDialogState.destination.name}, ${moveDialogState.destination.country}`}
          currentCollection={moveDialogState.fromCollection}
          collections={mockCollections.map((c) => ({
            id: c.id,
            name: c.name,
            emoji: c.emoji,
          }))}
          onClose={() => setMoveDialogState({ destination: null, fromCollection: "" })}
          onMove={handleMoveItem}
        />
      )}
    </div>
  );
}
