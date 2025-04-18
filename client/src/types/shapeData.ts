export interface AnchorPoint {
  id: string;
  x: number;
  y: number;
  shapeId: string;
}

export interface ShapeData {
  id: string;
  type: "rect" | "ellipse";
  x: number;
  y: number;
  width: number;
  height: number;
  fill: string;
  stroke: string;
  strokeWidth: number;
  text: string;
  rotation?: number;
  anchors: AnchorPoint[];
}

export interface Connection {
  id: string;
  fromAnchor: string;
  toAnchor: string;
  stroke?: string;
  strokeWidth?: number;
}