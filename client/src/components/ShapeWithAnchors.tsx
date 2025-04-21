import { Group, Rect, Ellipse, Text } from "react-konva";
import { ShapeData } from "../types/shapeData";
import AnchorPoint from "./AnchorPoint";
import useShapeInteraction from "../hooks/useShapeInteraction";

interface ShapeWithAnchorsProps {
  shape: ShapeData;
  isSelected: boolean;
  selectedAnchorId: string | null;
  onSelectShape: () => void;
  onSelectAnchor: (anchorId: string) => void;
  onDragEnd: (newAttrs: Partial<ShapeData>) => void;
};

function ShapeWithAnchors(props: ShapeWithAnchorsProps) {
  const { 
    shape, isSelected, selectedAnchorId, 
    onSelectShape, onSelectAnchor, onDragEnd 
  } = props;
  
  const {
    isHovered, shapeGroupRef, 
    updateHovered, handleDragEnd, handleDragMove
  } = useShapeInteraction({ shape, isSelected, onDragEnd });

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
        //onMouseEnter={() => setIsHovered(true)} //* Al hacer hover, se activan los puntos de anclaje
        //onMouseLeave={() => setIsHovered(false)} //* Al dejar de hover, se desactivan los puntos de anclaje
        onMouseEnter={() => updateHovered(true)}
        onMouseLeave={() => updateHovered(false)}
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
            x={shape.width / 2}
            y={shape.height / 2}
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