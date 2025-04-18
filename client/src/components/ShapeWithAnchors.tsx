import { useRef, useEffect, useState } from "react";
import { Group, Rect, Ellipse, Text } from "react-konva";
import { ShapeData } from "../types/shapeData";
import AnchorPoint from "./AnchorPoint";

import Konva from "konva";

interface ShapeWithAnchorsProps {
  shape: ShapeData;
  isSelected: boolean;
  selectedAnchorId: string | null;
  onSelectShape: () => void;
  onSelectAnchor: (anchorId: string) => void;
  onDragEnd: (newAttrs: Partial<ShapeData>) => void;
};

function ShapeWithAnchors(props: ShapeWithAnchorsProps) {
  const { shape, isSelected, selectedAnchorId, onSelectShape, onSelectAnchor, onDragEnd } = props;
  const [isHovered, setIsHovered] = useState(false);
  
  const shapeGroupRef = useRef<Konva.Group | null>(null);
  const transformerRef = useRef<Konva.Transformer | null>(null);

  //* Se ejecuta cuando se selecciona una figura.
  //* Si está seleccionada, asocia el Transformer para habilitar redimensionamiento.
  useEffect(() => {
    if (isSelected && transformerRef.current && shapeGroupRef.current) {
      transformerRef.current.nodes([shapeGroupRef.current]);
      transformerRef.current.getLayer()?.batchDraw();
    }
  }, [isSelected]);

  //* Maneja el final del arrastre de la figura.
  //* Actualiza posición y tamaño, y ajusta la posición de los puntos de anclaje.
  const handleDragEnd = () => {
    const groupNode = shapeGroupRef.current;

    if (!groupNode) return;

    const scaleX = groupNode.scaleX();
    const scaleY = groupNode.scaleY();

    //* Calculamos desplazamiento
    const dx = groupNode.x() - shape.x;
    const dy = groupNode.y() - shape.y;

    //* Actualizamos posición de los anclajes
    const updatedAnchors = shape.anchors.map(anchor => ({
      ...anchor,
      x: anchor.x + dx,
      y: anchor.y + dy,
    }));

    onDragEnd({
      x: groupNode.x(),
      y: groupNode.y(),
      width: Math.max(5, shape.width * scaleX),
      height: Math.max(5, shape.height * scaleY),
      anchors: updatedAnchors,
    });

    //* Reseteamos la transformación
    groupNode.scaleX(1);
    groupNode.scaleY(1);
  };

  //* Se ejecuta durante el arrastre de la figura (en tiempo real).
  //* Permite que las conexiones se actualicen dinámicamente junto con los anclajes.
  const handleDragMove = () => {
    const groupNode = shapeGroupRef.current;

    if (!groupNode) return;

    const dx = groupNode.x() - shape.x;
    const dy = groupNode.y() - shape.y;
  
    const updatedAnchors = shape.anchors.map(anchor => ({
      ...anchor,
      x: anchor.x + dx,
      y: anchor.y + dy,
    }));
  
    //* Emitimos en tiempo real para actualizar conexiones
    onDragEnd({
      x: groupNode.x(),
      y: groupNode.y(),
      width: shape.width,
      height: shape.height,
      anchors: updatedAnchors,
    });
  };
  

  return (
    <Group>
      {/* Contenedor principal de la figura */}
      <Group
        ref={shapeGroupRef} //* Referencia al grupo para maniupular su tamaño y posición dinámicamente
        x={shape.x}
        y={shape.y}
        width={shape.width}
        height={shape.height}
        draggable //* Permite arrastrar la figura
        onClick={onSelectShape}
        onTap={onSelectShape}
        onDragEnd={handleDragEnd}
        onDragMove={handleDragMove}
        onMouseEnter={() => setIsHovered(true)} //* Al hacer hover, se activan los puntos de anclaje
        onMouseLeave={() => setIsHovered(false)} //* Al dejar de hover, se desactivan los puntos de anclaje
      >
        {/*Renderización de la figura según su tipo*/}

        {shape.type === "rect" && (
          <Rect
            width={shape.width}
            height={shape.height}
            fill={shape.fill}
            stroke={isSelected ? "#3b82f6" : shape.stroke}
            strokeWidth={isSelected ? 3 : shape.strokeWidth}
          />
        )}

        {shape.type === "ellipse" && (
          <Ellipse
            radiusX={shape.width / 2}
            radiusY={shape.height / 2}
            fill={shape.fill}
            stroke={isSelected ? "#3b82f6" : shape.stroke}
            strokeWidth={isSelected ? 3 : shape.strokeWidth}
          />
        )}

        {/*Renderización del texto de la figura*/}

        <Text
          x={8}
          y={shape.height / 2 - 10}
          width={shape.width - 16}
          text={shape.text}
          fontSize={16}
          align="center"
          fill="#1f2937"
        />

        {/*Renderización de los puntos de anclaje*/}
        {(isSelected || isHovered) &&
          shape.anchors.map((anchor) => (
            <AnchorPoint
              key={anchor.id}
              anchor={{
                ...anchor,
                x: anchor.x - shape.x, //* coordenadas relativas al grupo
                y: anchor.y - shape.y,
              }}
              isSelected={selectedAnchorId === anchor.id}
              onSelect={() => onSelectAnchor(anchor.id)}
            />
          )
        )}
      </Group>

      {/* Transformer para redimensionar */}
      {/* {isSelected && (
        <Transformer
          ref={transformerRef}
          anchorSize={8}
          borderStroke="#3b82f6"
          borderStrokeWidth={2}
          boundBoxFunc={(oldBox, newBox) => {
            if (newBox.width < 5 || newBox.height < 5) return oldBox;
            return newBox;
          }}
        />
      )} */}
    </Group>
  );
};

export default ShapeWithAnchors;