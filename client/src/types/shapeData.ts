// types.ts
interface ShapeData {
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
};

export default ShapeData;