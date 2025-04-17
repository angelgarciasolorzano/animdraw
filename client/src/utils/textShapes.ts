export const calculateOptimalFontSize = (
  text: string,
  availableWidth: number,
  availableHeight: number,
  options = {
    minSize: 8,
    maxSize: 24,
    lineHeight: 1.2
  }
): number => {
  if (!text || availableWidth <= 0 || availableHeight <= 0) {
    return options.maxSize;
  }

  const lines = text.split('\n');
  const maxLineLength = Math.max(...lines.map(line => line.length));
  
  // Calcular tamaño basado en el ancho
  const widthBasedSize = Math.min(
    options.maxSize,
    Math.max(
      options.minSize,
      (availableWidth / Math.max(1, maxLineLength)) * 1.5
    )
  );

  // Calcular tamaño basado en la altura
  const heightBasedSize = Math.min(
    options.maxSize,
    Math.max(
      options.minSize,
      (availableHeight / Math.max(1, lines.length)) / options.lineHeight
    )
  );

  // Tomar el menor de los dos tamaños
  return Math.min(widthBasedSize, heightBasedSize);
};