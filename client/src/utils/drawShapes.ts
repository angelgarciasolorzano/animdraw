export function drawLine(ctx: CanvasRenderingContext2D, x: number, y: number) {
  ctx.lineTo(x, y);
  ctx.stroke();
};

export function drawRectangle(
  ctx: CanvasRenderingContext2D,
  starPos: { x: number; y: number },
  x: number,
  y: number,
  canvasImage: ImageData | null
) {
  if (!canvasImage) return;

  ctx.putImageData(canvasImage, 0, 0);
  const width = x - starPos.x;
  const height = y - starPos.y;
  ctx.strokeRect(starPos.x, starPos.y, width, height);
};

export function drawStraightLine(
  ctx: CanvasRenderingContext2D,
  startPos: { x: number; y: number },
  x: number,
  y: number,
  canvasImage: ImageData | null
) {
  if (!canvasImage) return;
  ctx.putImageData(canvasImage, 0, 0);
  ctx.beginPath();
  ctx.moveTo(startPos.x, startPos.y);
  ctx.lineTo(x, y);
  ctx.stroke();
};

export function drawCircle(
  ctx: CanvasRenderingContext2D,
  startPos: { x: number; y: number },
  x: number,
  y: number,
  canvasImage: ImageData | null
) {
  if (!canvasImage) return;
  ctx.putImageData(canvasImage, 0, 0);
  const radius = Math.sqrt((x - startPos.x) ** 2 + (y - startPos.y) ** 2);
  ctx.beginPath();
  ctx.arc(startPos.x, startPos.y, radius, 0, Math.PI * 2);
  ctx.stroke();
};