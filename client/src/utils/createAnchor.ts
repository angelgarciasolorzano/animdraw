import { AnchorPoint } from "@/types/shapeData";

const createAnchors = (
  shapeId: string,
  x: number,
  y: number,
  width: number,
  height: number,
  type: "rect" | "ellipse"
): AnchorPoint[] => {
  if (type === "rect") {
    return [
      { id: `${shapeId}-top`, x: x + width / 2, y: y, shapeId },
      { id: `${shapeId}-right`, x: x + width, y: y + height / 2, shapeId },
      { id: `${shapeId}-bottom`, x: x + width / 2, y: y + height, shapeId },
      { id: `${shapeId}-left`, x: x, y: y + height / 2, shapeId },
    ];
  } else {
    const radiusX = width / 2;
    const radiusY = height / 2;

    return [
      { id: `${shapeId}-top`, x: x + radiusX, y: y, shapeId },
      { id: `${shapeId}-right`, x: x + width, y: y + radiusY, shapeId },
      { id: `${shapeId}-bottom`, x: x + radiusX, y: y + height, shapeId },
      { id: `${shapeId}-left`, x: x, y: y + radiusY, shapeId },
    ];
  }
};

export default createAnchors;