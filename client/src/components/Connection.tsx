import { Line } from "react-konva";
//import { ShapeData } from "../types/ShapeData";

export interface ShapeData {
  id: string;
  type: "rect" | "ellipse" | "triangle" | "polygon";
  x: number;
  y: number;
  width: number;
  height: number;
  fill: string;
  stroke: string;
  strokeWidth: number;
  text: string;
}


type Props = {
  from: ShapeData;
  to: ShapeData;
};

export default function ConnectionLine({ from, to }: Props) {
  const fromX = from.x + from.width / 2;
  const fromY = from.y + from.height / 2;
  const toX = to.x + to.width / 2;
  const toY = to.y + to.height / 2;

  return (
    <Line
      points={[fromX, fromY, toX, toY]}
      stroke="black"
      strokeWidth={2}
      pointerLength={5}
      pointerWidth={5}
    />
  );
};