export interface AnchorPoint {
  id: string;
  x: number;
  y: number;
  shapeId: string;
};

export interface ShapeShadow {
  isActive?: boolean;
  color?: string;
  blur?: number;
  opacity?: number;
};

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
  opacity?: number;
  radius?: boolean;
  shadow?: ShapeShadow;
  textStyle: {
    opacity?: number;
    fontFamily?: string;
    fontSize?: number;
    fontWeight?: "normal" | "bold";
    fontStyle?: "normal" | "italic" | "oblique";
    textDecoration?: "none" | "underline" | "line-through";
    color?: string;
    align?: "left" | "center" | "right";
    verticalAlign?: "top" | "middle" | "bottom";
    hasShadow?: boolean;
    shadowColor?: string;
    shadowBlur?: number;
    shadowOpacity?: number;
  };
  rotation?: number;
  anchors: AnchorPoint[];
};

export interface Connection {
  id: string;
  fromAnchor: string;
  toAnchor: string;
  stroke?: string;
  strokeWidth?: number;
};