import React, { createContext, useCallback, useMemo, useState } from "react";

interface DiagramContextType {
  selectedShapeId: string | null;
  selectedAnchorId: string | null;
  selectShape: (shapeId: string) => void;
  selectAnchor: (anchorId: string) => void;
  isShapeSelected: (shapeId: string) => boolean;
  isAnchorSelected: (anchorId: string) => boolean;
  deselectAll: () => void;
};

interface DiagramProviderProps { children: React.ReactNode };

export const DiagramContext = createContext<DiagramContextType | null>(null);

export function DiagramProvider({ children }: DiagramProviderProps) {
  const [selectedShapeId, setSelectedShapeId] = useState<string | null>(null);
  const [selectedAnchorId, setSelectedAnchorId] = useState<string | null>(null);

  const selectShape = useCallback((id: string | null) => {
    setSelectedShapeId(id);
    if (id === null) setSelectedAnchorId(null);
  }, []);

  const selectAnchor = useCallback((id: string | null) => {
    setSelectedAnchorId(id);

    if (id !== null) {
      const shapeId = id.split("-")[0];
      setSelectedShapeId(shapeId);
    }
  }, []);

  const isShapeSelected = useCallback((id: string) => {
    return selectedShapeId === id;
  }, [selectedShapeId]);

  const isAnchorSelected = useCallback((id: string) => {
    return selectedAnchorId === id;
  }, [selectedAnchorId]);

  const deselectAll = useCallback(() => {
    setSelectedShapeId(null);
    setSelectedAnchorId(null);
  }, []);

  const value = useMemo(() => ({
    selectedShapeId, selectedAnchorId, deselectAll, selectShape,
    selectAnchor, isShapeSelected, isAnchorSelected
  }), [
    selectedShapeId, selectedAnchorId, deselectAll, selectShape,
    selectAnchor, isShapeSelected, isAnchorSelected
  ]);

  return (
    <DiagramContext.Provider value={value}>
      {children}
    </DiagramContext.Provider>
  );
};