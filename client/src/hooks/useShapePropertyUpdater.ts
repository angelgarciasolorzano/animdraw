import { ShapeData } from "@/types";

interface useShapePropertyUpdaterProps {
  shape: ShapeData | null | undefined;
  updateShapeAttributes: (shapeId: ShapeData["id"], attributes: Partial<ShapeData>) => void;
};

/**
 * Hook para actualizar propiedades simples y anidadas de una figura
 * @param shape - Figura actual
 * @param updateShapeAttributes - Función para actualizar atributos de la figura
 * @returns
 *   - `handleSimplePropertyChange`: Función para actualizar propiedades simples de la figura
 *   - `handleNestedPropertyChange`: Función para actualizar propiedades anidadas de la figura
*/
function useShapePropertyUpdater(props: useShapePropertyUpdaterProps) {
  const { shape, updateShapeAttributes } = props;

  /**
   * Actualiza una propiedad simple (no anidada) de la figura actual
   * @param property - Nombre de la propiedad a actualizar
   * @param value - Nuevo valor para la propiedad
  */
  const handleSimplePropertyChange = <
    T extends keyof Omit<ShapeData, "shadow" | "textStyle" | "line">
  >(property: T, value: ShapeData[T]) => {
    if (!shape) return;
    
    updateShapeAttributes(shape.id, { [property]: value } as Partial<ShapeData>);
  };

  /**
   * Actualiza una propiedad anidada de la figura actual
   * @param property - Nombre de la propiedad anidada
   * @param key - Nombre del atributo de la propiedad anidada
   * @param value - Nuevo valor para el atributo de la propiedad anidada
  */
  const handleNestedPropertyChange = <
    T extends keyof Pick<ShapeData, "textStyle" | "shadow" | "line">,
    K extends keyof NonNullable<ShapeData[T]>
  >(property: T, key: K, value: NonNullable<ShapeData[T]>[K]) => {
    if (!shape) return;

    const propertyValue = shape[property] || {};
    const newPropertyValue = { ...propertyValue, [key]: value };

    updateShapeAttributes(shape.id, { [property]: newPropertyValue });
  };

  return { handleNestedPropertyChange, handleSimplePropertyChange };
};

export default useShapePropertyUpdater;