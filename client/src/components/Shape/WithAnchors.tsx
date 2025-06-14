import { Group, Rect, Ellipse, Text } from "react-konva";

import { useShape, useDiagram, useConnection, useShapeInteraction, useTheme } from "@/hooks";
import { ShapeData } from "@/types";

import AnchorPoint from "./AnchorPoint";

interface ShapeWithAnchorsProps { shape: ShapeData; };

function WithAnchors({ shape }: ShapeWithAnchorsProps) {
  const { selectShape, selectAnchor, isShapeSelected, isAnchorSelected, deselectAll } = useDiagram();
  const { updateShapeAttributes } = useShape();
  const { allAnchors, addConnection } = useConnection();
  const {  theme} = useTheme();

  const isSelected = isShapeSelected(shape.id);
  const isDark = theme === "dark";

  const shapeFill = (isDark 
    ? shape.fill === "#e5e7eb" ? "#0D0D0D" : shape.fill 
    : shape.fill === "#0D0D0D" ? "#e5e7eb" : shape.fill
  );

  const shapeStroke = (isDark 
    ? shape.line?.stroke === "#000000" ? "#ffffff" : shape.line?.stroke 
    : shape.line?.stroke === "#ffffff" ? "#000000" : shape.line?.stroke
  );

  const shapeText = (isDark 
    ? shape.textStyle?.color === "#000000" ? "#ffffff" : shape.textStyle?.color 
    : shape.textStyle?.color === "#ffffff" ? "#000000" : shape.textStyle?.color
  );

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
            fill={shapeFill}
            opacity={shape.opacity ?? 1}
            cornerRadius={shape.radius ? 10 : undefined }
            dash={shape.line?.dash}
            stroke={shapeStroke}
            strokeWidth={shape.line?.strokeWidth || 1}
            strokeEnabled={shape.line?.isActive ?? true}
            shadowColor={shape.shadow?.color ? shape.shadow?.color : undefined}
            shadowBlur={shape.shadow?.isActive ? shape.shadow?.blur ?? 3 : 0}
            shadowOpacity={shape.shadow?.isActive ? shape.shadow?.opacity ?? 1 : 0}
          />
        )}

        {shape.type === "ellipse" && (
          <Ellipse
            radiusX={shape.width / 2}
            radiusY={shape.height / 2}
            x={shape.width / 2}
            y={shape.height / 2}
            fill={shapeFill}
            opacity={shape.opacity ?? 1}
            dash={shape.line?.dash}
            stroke={shapeStroke}
            strokeWidth={shape.line?.strokeWidth || 1}
            strokeEnabled={shape.line?.isActive ?? true}
            shadowColor={shape.shadow?.color ? shape.shadow?.color : undefined}
            shadowBlur={shape.shadow?.isActive ? shape.shadow?.blur ?? 3 : 0}
            shadowOpacity={shape.shadow?.isActive ? shape.shadow?.opacity ?? 1 : 0}
          />
        )}

        {/* Texto de la figura */}
        <Text
          x={8}
          y={0}
          padding={6}
          wrap="word"
          width={shape.width - 16}
          height={shape.height}
          text={shape.text}
          opacity={shape.textStyle?.opacity ?? 1}
          align={shape.textStyle?.align || "center"}
          verticalAlign={shape.textStyle?.verticalAlign || "middle"}
          fontFamily={shape.textStyle?.fontFamily || 'Arial'}
          fontSize={shape.textStyle?.fontSize || 15}
          fontStyle={
            [
              shape.textStyle?.fontStyle === 'italic' ? 'italic' : '',
              shape.textStyle?.fontWeight === 'bold' ? 'bold' : ''
            ].filter(Boolean).join(' ') || 'normal'
          }
          fill={shapeText}
          textDecoration={shape.textStyle?.textDecoration === 'underline' ? 'underline' : ''}
          shadowColor={shape.textStyle?.shadowColor ? shape.textStyle?.shadowColor : undefined}
          shadowBlur={shape.textStyle?.hasShadow ? shape.textStyle?.shadowBlur ?? 3 : 0}
          shadowOpacity={shape.textStyle?.hasShadow ? shape.textStyle?.shadowOpacity ?? 1 : 0}
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

export default WithAnchors;