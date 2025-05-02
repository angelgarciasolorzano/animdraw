import { Circle } from "react-konva";
import { KonvaEventObject } from "konva/lib/Node";
import { AnchorPoint as Anchor } from "@/types";

interface AnchorPointProps {
  anchor: Anchor;
  isSelected: boolean;
  onSelect: () => void;
};

function AnchorPoint (props: AnchorPointProps) {
  const { anchor, isSelected, onSelect } = props;

  const handleClick = (e: KonvaEventObject<MouseEvent>) => {
    e.cancelBubble = true;
    onSelect();
  };

  return (
    <Circle
      x={anchor.x}
      y={anchor.y}
      radius={6}
      fill={isSelected ? "#3b42f6" : "#fff"} 
      stroke="#4b5563"
      strokeWidth={1.5}
      onClick={handleClick}
      onTap={handleClick}
    />
  );
};

export default AnchorPoint;