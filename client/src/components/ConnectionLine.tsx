import { Arrow } from "react-konva";
import { AnchorPoint } from "../types/shapeData";

interface ConnectionLineProps {
  startAnchor: AnchorPoint; //* Punto de inicio de la flecha
  endAnchor: AnchorPoint; //* Punto de fin de la flecha
  strokeColor?: string; //* Color del trazo de la flecha (Opcional)
  lineWidth?: number; //* Grosor del trazo de la flecha (Opcional)
};

//* Representa una conexión entre dos puntos de anclaje.
//* Se usa para representar las conexiones entre figuras.

function ConnectionLine(props: ConnectionLineProps) {
  const { startAnchor, endAnchor, strokeColor = "#4b5563", lineWidth = 2 } = props;

  return (
    <Arrow
      points={[startAnchor.x, startAnchor.y, endAnchor.x, endAnchor.y]}
      stroke={strokeColor}
      strokeWidth={lineWidth}
      fill={strokeColor}
      pointerLength={8}
      pointerWidth={8}
    />
  );
};

export default ConnectionLine;