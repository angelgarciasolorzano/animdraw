import { Group, Text, Rect, Ellipse } from "react-konva";
import { calculateOptimalFontSize } from "../utils/textShapes";
import ShapeData from "../types/shapeData";

interface ShapeWithTextProps {
  shape: ShapeData;
  isSelected?: boolean;
  onClick?: () => void;
}

export const ShapeWithText = ({
  shape,
  isSelected,
  onClick,
}: ShapeWithTextProps) => {
  const padding = 8;
  const availableWidth = Math.max(0, shape.width - padding * 2);
  const availableHeight = Math.max(0, shape.height - padding * 2);
  
  const fontSize = calculateOptimalFontSize(
    shape.text, 
    availableWidth, 
    availableHeight
  );

  // Estilo diferente cuando está seleccionado
  const commonProps = {
    fill: shape.fill,
    stroke: isSelected ? "#3b82f6" : shape.stroke, // Borde azul cuando está seleccionado
    strokeWidth: isSelected ? 3 : shape.strokeWidth, // Borde más grueso cuando está seleccionado
    shadowColor: isSelected ? "#93c5fd" : "transparent", // Sombra azul clara
    shadowBlur: isSelected ? 10 : 0,
    shadowOpacity: isSelected ? 0.8 : 0,
    shadowOffset: { x: 0, y: 0 },
  };

  return (
    <Group 
      draggable
      onClick={onClick}
      onTap={onClick} // Para soporte móvil
    >
      {shape.type === "rect" && (
        <Rect
          x={shape.x}
          y={shape.y}
          width={shape.width}
          height={shape.height}
          {...commonProps}
          cornerRadius={isSelected ? 5 : 0} // Esquinas redondeadas cuando está seleccionado
        />
      )}
      {shape.type === "ellipse" && (
        <Ellipse
          x={shape.x + shape.width / 2}
          y={shape.y + shape.height / 2}
          radiusX={shape.width / 2}
          radiusY={shape.height / 2}
          {...commonProps}
        />
      )}
      <Text
        x={shape.x + padding}
        y={shape.y + padding}
        width={availableWidth}
        height={availableHeight}
        align="center"
        verticalAlign="middle"
        text={shape.text}
        fontSize={fontSize}
        fill={isSelected ? "#1e40af" : "#1f2937"} // Texto más oscuro cuando está seleccionado
        padding={4}
        ellipsis
        wrap="word"
      />
    </Group>
  );
};