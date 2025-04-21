import { useState } from "react";
import { ShapeData } from "../types/shapeData";

/**Hook para manejar los estados y operaciones relacionadas con las figuras,
 * proporciona funciones para actualizar atributos y texto de figuras
 * @param initialShapes - Figuras iniciales
 * @returns - {
 *   shapes: Array de todas las figuras,
 *   updateShapeAttributes: Funcion para actualizar atributos de una figura,
 *   updateShapeText: Funcion para actualizar el texto de una figura
 * }
*/
function useShapes(initialShapes: ShapeData[] = []) {
  const [shapes, setShapes] = useState<ShapeData[]>(initialShapes);

  /**Agrega una figura a la colección de figuras
   * @param shape - Figura a agregar
  */
  function addShape(shape: ShapeData) {
    setShapes(prev => [...prev, shape]);
  };

  /**Actualiza atributos de una figura especifica como posicion y tamaño 
   * @param shapeId - ID de la figura a actualizar
   * @param newAttrs - Atributos a actualizar
  */
  function updateShapeAttributes(shapeId: string, newAttrs: Partial<ShapeData>) {
    setShapes(prev => prev.map(shape => 
      shape.id === shapeId ? { ...shape, ...newAttrs } : shape
    ));
  };

  /**Actualiza el texto de una figura especifica
   * @param shapeId - ID de la figura a actualizar
   * @param newText - Nuevo texto a asignar
  */
  function updateShapeText(shapeId: string, newText: string) {
    setShapes(prev => prev.map(shape => 
      shape.id === shapeId ? { ...shape, text: newText } : shape
    ));
  };

  return { shapes, addShape, updateShapeAttributes, updateShapeText };
};

export default useShapes;