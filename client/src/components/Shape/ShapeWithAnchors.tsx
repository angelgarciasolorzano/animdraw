import { useMemo } from "react";
import { Group, Rect, Ellipse, Text } from "react-konva";

import { useShape, useDiagram, useConnection, useShapeInteraction } from "@/hooks";
import { ShapeData } from "@/types";

import AnchorPoint from "./AnchorPoint";

interface ShapeWithAnchorsProps { shape: ShapeData; };

function ShapeWithAnchors({ shape }: ShapeWithAnchorsProps) {
  const { selectShape, selectAnchor, isShapeSelected, isAnchorSelected, deselectAll } = useDiagram();
  const { updateShapeAttributes } = useShape();
  const { allAnchors, addConnection, getConnectionByShape } = useConnection();

  const isSelected = isShapeSelected(shape.id);

  const shapeConnections = useMemo(() => (
    getConnectionByShape(shape.id)
  ), [shape.id, getConnectionByShape]);

  const { isHovered, shapeGroupRef, updateHovered, handleDragEnd, handleDragMove } = useShapeInteraction({
    shape, isSelected, onDragEnd: (newAttributes) => updateShapeAttributes(shape.id, newAttributes)
  });

  const handleAnchorSelect = (anchorId: string) => {
    const selectedAnchor = allAnchors[anchorId];
    if (!selectedAnchor) return;
  
    const currentlySelectedAnchors = Object.keys(allAnchors).filter(id => 
      isAnchorSelected(id)
    );
  
    // Caso 1: Click en un anclaje YA seleccionado (deseleccionar)
    if (isAnchorSelected(anchorId)) {
      deselectAll();
      return;
    };
  
    // Caso 2: Click en un anclaje de la MISMA figura
    const isSameShape = currentlySelectedAnchors.some(selectedId => 
      allAnchors[selectedId]?.shapeId === selectedAnchor.shapeId
    );
  
    if (isSameShape) {
      // Deselecciona todos y selecciona solo el nuevo
      deselectAll();
      selectAnchor(anchorId);
      return;
    };
  
    // Caso 3: Click en anclaje de OTRA figura (crear conexión)
    if (currentlySelectedAnchors.length === 1) {
      addConnection(currentlySelectedAnchors[0], anchorId);
      deselectAll();
    } else {
      selectAnchor(anchorId);
    }
  };

  const shouldShowAnchors = (
    isSelected || isHovered || shape.anchors.some(a => isAnchorSelected(a.id))
  );

  const shapeStyle = useMemo(() => ({
    stroke: isSelected ? "#3b82f6" : shape.stroke,
    strokeWidth: isSelected ? 3 : shape.strokeWidth,
    shadowColor: shapeConnections.length > 0 ? "#3b82f6" : undefined,
    shadowBlur: shapeConnections.length > 0 ? 10 : 0
  }), [isSelected, shape.stroke, shape.strokeWidth, shapeConnections]);

  return (
    <Group>
      <Group
        ref={shapeGroupRef}
        x={shape.x}
        y={shape.y}
        width={shape.width}
        height={shape.height}
        draggable
        onClick={() => selectShape(shape.id)}
        onTap={() => selectShape(shape.id)}
        onDragEnd={handleDragEnd}
        onDragMove={handleDragMove}
        onMouseEnter={() => updateHovered(true)}
        onMouseLeave={() => updateHovered(false)}
      >
        {/* Renderizado de la figura */}
        {shape.type === "rect" && (
          <Rect
            width={shape.width}
            height={shape.height}
            fill={shape.fill}
            {...shapeStyle}
          />
        )}

        {shape.type === "ellipse" && (
          <Ellipse
            radiusX={shape.width / 2}
            radiusY={shape.height / 2}
            x={shape.width / 2}
            y={shape.height / 2}
            fill={shape.fill}
            {...shapeStyle}
          />
        )}

        {/* Texto de la figura */}
        <Text
          x={8}
          y={shape.height / 2 - 10}
          width={shape.width - 16}
          text={shape.text}
          align="center"
        />

        {/* Puntos de anclaje */}
        {shouldShowAnchors && (
          <>
            {shape.anchors.map((anchor) => (
              <AnchorPoint
                key={anchor.id}
                anchor={{
                  ...anchor,
                  x: anchor.x - shape.x,
                  y: anchor.y - shape.y,
                }}
                isSelected={isAnchorSelected(anchor.id)}
                onSelect={() => handleAnchorSelect(anchor.id)}
              />
            ))}
          </>
        )}
      </Group>
    </Group>
  );
}

export default ShapeWithAnchors;