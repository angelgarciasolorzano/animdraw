import React, { createContext, useCallback, useMemo, useState } from "react";
import { ShapeData } from "@/types";
import { createAnchors, mergeShapeAttributes } from "@/utils";

interface ShapesContextType {
  shapes: ShapeData[];
  addShape: (shape: Omit<ShapeData, "id" | "anchors">) => string;
  updateShapeAttributes: (shapeId: ShapeData["id"], attributes: Partial<ShapeData>) => void;
  removeShape: (shapeId: ShapeData["id"]) => void;
  getShapeById: (shapeId: ShapeData["id"]) => ShapeData | undefined;
};

interface ShapesProviderProps { children: React.ReactNode };

export const ShapesContext = createContext<ShapesContextType | null>(null);

export function ShapesProvider({ children }: ShapesProviderProps) {
  const [shapes, setShapes] = useState<ShapeData[]>([]);

  const addShape = useCallback((shape: Omit<ShapeData, "id" | "anchors">) => {
    const newId = `shape-${Date.now()}`;
    
    const newShape: ShapeData = {
      ...shape,
      id: newId,
      anchors: createAnchors(newId, shape.x, shape.y, shape.width, shape.height, shape.type)
    };

    setShapes((prevShapes) => [...prevShapes, newShape]);
    return newId;
  }, []);

  const updateShapeAttributes = useCallback((shapeId: ShapeData["id"], attributes: Partial<ShapeData>) => {
    setShapes(prevShapes => prevShapes.map((shape) => (
      shape.id === shapeId ? mergeShapeAttributes(shape, attributes) : shape
    )));
  }, []);

  const removeShape = useCallback((shapeId: ShapeData["id"]) => {
    setShapes(prevShapes => prevShapes.filter((shape) => shape.id !== shapeId));
  }, []);

  const getShapeById = useCallback((shapeId: ShapeData["id"]) => {
    return shapes.find((shape) => shape.id === shapeId);
  }, [shapes]);

  const value = useMemo(() => ({
    shapes, addShape, updateShapeAttributes, removeShape, getShapeById
  }), [
    shapes, addShape, updateShapeAttributes, removeShape, getShapeById
  ]);

  return (
    <ShapesContext.Provider value={value}>
      {children}
    </ShapesContext.Provider>
  );
};