import { useState, useEffect } from "react";
import { ShapeData } from "../types/shapeData";

interface useSelectedShapeProps {
  shapes: ShapeData[];
};

/**Hook para manejar la seleccion y edicion de figuras en el canvas,
 * proporciona funciones para actualizar el texto de la figura seleccionada
 * @param shapes - Figuras actuales
 * @returns - {
 *   selectedShapeId: ID de la figura seleccionada,
 *   shapeTextInput: Texto actual de la figura seleccionada,
 *   updateText: Funcion para actualizar el texto de la figura seleccionada,
 *   onSelectShape: Funcion para seleccionar una figura,
 *   ofSelectShape: Funcion para deseleccionar una figura
 * }
*/
function useSelectedShape({ shapes }: useSelectedShapeProps) {
  const [selectedShapeId, setSelectedShapeId] = useState<string | null>(null);
  const [shapeTextInput, setShapeTextInput] = useState<string | null>(null);

  /**Sincroniza el texto de la figura seleccionada
   * con el estado local cuando cambia la figura seleccionada
  */
  useEffect(() => {
    if (selectedShapeId) {
      const shape = shapes.find(s => s.id === selectedShapeId);
      setShapeTextInput(shape?.text || "");
    }
  }, [selectedShapeId, shapes]);

  /**Actualiza el texto de la figura seleccionada 
   * @param newText - Nuevo texto a asignar
  */
  const updateText = (newText: string) => setShapeTextInput(newText);

  /**Maneja la seleccion de una figura en el canvas
   * @param shapeId - ID de la figura a seleccionar
  */
  const onSelectShape = (shapeId: string | null) => setSelectedShapeId(shapeId);

  /**Desactiva la figura seleccionada */
  const ofSelectShape = () => setSelectedShapeId(null);

  return { 
    selectedShapeId, 
    shapeTextInput, 
    updateText, 
    onSelectShape, 
    ofSelectShape 
  };
};

export default useSelectedShape;