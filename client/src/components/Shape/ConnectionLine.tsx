import { Arrow } from "react-konva";
import { AnchorPoint } from "@/types";

interface ConnectionLineProps {
  startAnchor: AnchorPoint;
  endAnchor: AnchorPoint;
  strokeColor?: string;
  lineWidth?: number;
};

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