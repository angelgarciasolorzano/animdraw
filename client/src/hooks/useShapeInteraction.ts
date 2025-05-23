import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { ShapeData } from "@/types";
import Konva from "konva";

interface useShapeInteractionProps {
  shape: ShapeData,
  isSelected: boolean,
  onDragEnd: (newAttrs: Partial<ShapeData>) => void
};

const DEFAULT_SCALE = { x: 1, y: 1 };
const MIN_DIMENSION = 5;

/**Hook para manejar interacciones con figuras en el canvas Konva 
 * Proporciona funciones para actualizar el estado de hover y el arrastre de figuras
 * @param shape - Figura actual
 * @param isSelected - Indica si la figura es seleccionada
 * @param onDragEnd - Callback para actualizar atributos de la figura cuando se arrastre
 * @returns - {
 *   isHovered: Indica si la figura está siendo arrastrada,
 *   shapeGroupRef: Referencia al grupo de Konva de la figura,
 *   transformerRef: Referencia al transformador de Konva de la figura,
 *   updateHovered: Función para actualizar el estado de hover,
 *   handleDragEnd: Función para calcular los nuevos atributos de la figura cuando se arrastre,
 *   handleDragMove: Función para actualizar atributos de la figura cuando se arrastre
 * } 
*/
function useShapeInteraction(props: useShapeInteractionProps) {
  const { shape, isSelected, onDragEnd } = props;

  const [isHovered, setIsHovered] = useState(false);
  const shapeGroupRef = useRef<Konva.Group | null>(null);
  const transformerRef = useRef<Konva.Transformer | null>(null);

  /**Efecto que configura el transformer de konva cuando la figura es seleccionada 
   * Asocia el transformer al grupo de la figura
  */
  useEffect(() => {
    if (isSelected && transformerRef.current && shapeGroupRef.current) {
      transformerRef.current.nodes([shapeGroupRef.current]);
      transformerRef.current.getLayer()?.batchDraw();
    };
  }, [isSelected]);

  /**Calcula y actualiza las nuevas posiciones de los puntos de anclaje 
   * en funcion del desplazamiento de la figura
   * @param dx - Desplazamiento en el eje x
   * @param dy - Desplazamiento en el eje y
   * @returns Array de anclajes con las nuevas posiciones
  */
  const calculateUpdateAnchors = useCallback((dx: number, dy: number) => {
    return shape.anchors.map(anchor => ({
      ...anchor,
      x: anchor.x + dx,
      y: anchor.y + dy,
    }));
  }, [shape.anchors]);

  /**Maneja el evento de movimiento durante el arrastre 
   * Actualiza la posicion y el anclaje de la figura
   * Llama al callback de actualización de atributos
  */
  const handleDragMove = useCallback(() => {
    const groupNode = shapeGroupRef.current;

    if (!groupNode) return;

    const dx = groupNode.x() - shape.x;
    const dy = groupNode.y() - shape.y;
  
    onDragEnd({
      x: groupNode.x(),
      y: groupNode.y(),
      width: shape.width,
      height: shape.height,
      anchors: calculateUpdateAnchors(dx, dy)
    });
  }, [shape, onDragEnd, calculateUpdateAnchors]);

  /**Maneja el evento de finalizacion de arrastre 
   * Calcula la nueva posicion, escala y actualiza los anclajes
   * Llama al callback de actualización de atributos
  */
  const handleDragEnd = useCallback(() => {
    const groupNode = shapeGroupRef.current;
    if (!groupNode) return;

    const scaleX = groupNode.scaleX();
    const scaleY = groupNode.scaleY();

    const dx = groupNode.x() - shape.x;
    const dy = groupNode.y() - shape.y;

    onDragEnd({
      x: groupNode.x(),
      y: groupNode.y(),
      width: Math.max(MIN_DIMENSION, shape.width * scaleX),
      height: Math.max(MIN_DIMENSION, shape.height * scaleY),
      anchors: calculateUpdateAnchors(dx, dy)
    });

    groupNode.scale(DEFAULT_SCALE);
  }, [shape, onDragEnd, calculateUpdateAnchors]);

  /**Actualiza el estado de hover de la figura 
   * @param estado - Nuevo valor para el estado de hover
  */
  const updateHovered = useCallback((estado: boolean) => {
    setIsHovered(estado);
  }, []);

  return useMemo(() => ({
    isHovered,
    shapeGroupRef,
    transformerRef,
    updateHovered,
    handleDragEnd,
    handleDragMove,
  }), [isHovered, updateHovered, handleDragEnd, handleDragMove]);
};

export default useShapeInteraction;