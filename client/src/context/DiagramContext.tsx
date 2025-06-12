import React, { createContext, useCallback, useMemo, useRef, useState } from "react";
import { CanvasSize } from "@/types";

interface DiagramContextType {
  selectedShapeId: string | null;
  selectedAnchorId: string | null;
  canvasSize: CanvasSize;
  containerRef: React.RefObject<HTMLDivElement | null>;
  selectShape: (shapeId: string) => void;
  selectAnchor: (anchorId: string) => void;
  isShapeSelected: (shapeId: string) => boolean;
  isAnchorSelected: (anchorId: string) => boolean;
  deselectAll: () => void;
  updateCanvasSize: (newSize: CanvasSize) => void;
  resetCanvasSize: () => void;
};

interface DiagramProviderProps { children: React.ReactNode };

export const DiagramContext = createContext<DiagramContextType | null>(null);

export function DiagramProvider({ children }: DiagramProviderProps) {
  const [selectedShapeId, setSelectedShapeId] = useState<string | null>(null);
  const [selectedAnchorId, setSelectedAnchorId] = useState<string | null>(null);
  const [canvasSize, setCanvasSize] = useState<CanvasSize>({ width: 1000, height: 1000 });
  const containerRef = useRef<HTMLDivElement>(null);

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

  const updateCanvasSize = useCallback((newSize: Partial<CanvasSize>) => {
    setCanvasSize((prev) => ({ ...prev, ...newSize }));
  }, []);

  const resetCanvasSize = useCallback(() => {
    setCanvasSize({ width: 1000, height: 1000 });
  }, []);

  const value = useMemo(() => ({
    selectedShapeId, selectedAnchorId, containerRef, canvasSize, deselectAll, selectShape,
    selectAnchor, isShapeSelected, isAnchorSelected, updateCanvasSize,
    resetCanvasSize
  }), [
    selectedShapeId, selectedAnchorId, containerRef, canvasSize, deselectAll, selectShape,
    selectAnchor, isShapeSelected, isAnchorSelected, updateCanvasSize,
    resetCanvasSize
  ]);

  return (
    <DiagramContext.Provider value={value}>
      {children}
    </DiagramContext.Provider>
  );
};