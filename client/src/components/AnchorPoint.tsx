import { Circle } from "react-konva";
import { AnchorPoint as Anchor } from "../types/shapeData";
import { KonvaEventObject } from "konva/lib/Node";

interface AnchorPointProps {
  anchor: Anchor; //* Punto de anclaje con coordenadas y referencia a la figura
  isSelected: boolean; //* Indica si el punto de anclaje está seleccionado
  onSelect: () => void; //* Funcion que se ejecuta cuando se hace click en el punto de anclaje
};

//* Representa un punto de anclaje de una figura.
//* Se usa para representar los puntos de anclaje de las figuras.

function AnchorPoint (props: AnchorPointProps) {
  const { anchor, isSelected, onSelect } = props;

  //* Se ejecuta cuando se hace click en el punto de anclaje
  //* Se cancela el evento para evitar que se dispare un evento de click en el grupo de la figura
  const handleClick = (e: KonvaEventObject<MouseEvent>) => {
    e.cancelBubble = true;
    onSelect();
  };

  return (
    <Circle
      x={anchor.x}
      y={anchor.y}
      radius={6}
      fill={isSelected ? "#3b42f6" : "#fff"} //* Color del punto de anclaje (si es seleccionado)
      stroke="#4b5563"
      strokeWidth={1.5}
      onClick={handleClick}
      onTap={onSelect}
    />
  );
};

export default AnchorPoint;