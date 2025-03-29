//* Función que dibuja una línea en el lienzo
export function drawLine(ctx: CanvasRenderingContext2D, x: number, y: number) {
  ctx.lineTo(x, y);
  ctx.stroke();
};


//* Función que dibuja un rectángulo en el lienzo
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

//* Función que dibuja una línea recta en el lienzo
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

//* Función que dibuja un círculo en el lienzo
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

//* Función que dibuja un triángulo en el lienzo
export function drawTriangle(
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
  ctx.lineTo(2 * startPos.x - x, y);
  ctx.closePath();
  ctx.stroke();
};

//* Funcion que dibuja un elipse en el lienzo
export function drawEllipse(
  ctx: CanvasRenderingContext2D,
  startPos: { x: number; y: number },
  x: number,
  y: number,
  canvasImage: ImageData | null
) {
  if (!canvasImage) return;

  ctx.putImageData(canvasImage, 0, 0);

  const radiusX = Math.abs(x - startPos.x) / 2;
  const radiusY = Math.abs(y - startPos.y) / 2;
  const centerX = (x + startPos.x) / 2;
  const centerY = (y + startPos.y) / 2;

  ctx.beginPath();
  ctx.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, Math.PI * 2);
  ctx.stroke();
};

//* Función que dibuja un polígono en el lienzo
export function drawPolygon(
  ctx: CanvasRenderingContext2D,
  startPos: { x: number; y: number },
  x: number,
  y: number,
  sides: number,
  canvasImage: ImageData | null
) {
  if (!canvasImage || sides < 3) return;

  ctx.putImageData(canvasImage, 0, 0);

  const centerX = (startPos.x + x) / 2;
  const centerY = (startPos.y + y) / 2;
  const radius = Math.sqrt((x - startPos.x) ** 2 + (y - startPos.y) ** 2) / 2;

  ctx.beginPath();

  for (let i = 0; i < sides; i++) {
    const angle = (i * 2 * Math.PI) / sides - Math.PI / 2;
    const px = centerX + radius * Math.cos(angle);
    const py = centerY + radius * Math.sin(angle);

    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.closePath();
  ctx.stroke();
};