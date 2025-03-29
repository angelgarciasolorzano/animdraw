import { useState, useRef, MouseEvent } from "react";
import { drawLine, drawRectangle, drawCircle, drawStraightLine } from "../utils/drawShapes";

export function useDrawing() {
  const [drawing, setDrawing] = useState(false);
  const [shape, setShape] = useState<"line" | "rectangle" | "circle" | "straight-line">("line");
  const [color, setColor] = useState("#000000");
  const [startPos, setStartPos] = useState<{ x: number; y: number } | null>(null);
  const [canvasImage, setCanvasImage] = useState<ImageData | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const startDrawing = (e: MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    
    if (!ctx) return;

    ctx.strokeStyle = color;
    setDrawing(true);
    setStartPos({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });

    if (["rectangle", "circle", "straight-line"].includes(shape)) {
      setCanvasImage(ctx.getImageData(0, 0, canvas.width, canvas.height));
    } else {
      ctx.beginPath();
      ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    }
  };

  const draw = (e: MouseEvent<HTMLCanvasElement>) => {
    if (!drawing || !startPos) return;

    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });

    if (!ctx) return;

    switch (shape) {
      case "line":
        drawLine(ctx, e.nativeEvent.offsetX, e.nativeEvent.offsetY);
        break;
      case "rectangle":
        drawRectangle(ctx, startPos, e.nativeEvent.offsetX, e.nativeEvent.offsetY, canvasImage);
        break;
      case "straight-line":
        drawStraightLine(ctx, startPos, e.nativeEvent.offsetX, e.nativeEvent.offsetY, canvasImage);
        break;
      case "circle":
        drawCircle(ctx, startPos, e.nativeEvent.offsetX, e.nativeEvent.offsetY, canvasImage);
        break;
    }
  };

  const stopDrawing = () => {
    setDrawing(false);
    setStartPos(null);
  };

  return { canvasRef, startDrawing, draw, stopDrawing, setShape, setColor, shape, color };
};