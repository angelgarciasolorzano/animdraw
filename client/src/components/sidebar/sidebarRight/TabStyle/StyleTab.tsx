import { useMemo, useRef, useState } from "react";
import { useClickOutside } from "@react-hooks-library/core";

import { ShapeData } from "@/types";
import { useDiagram, useShape } from "@/hooks";

import StyleBasePanel from "./StyleBasePanel";
import StyleBorderPanel from "./StyleBorderPanel";
import StyleShadowPanel from "./StyleShadowPanel";

function StyleTab() {
  const { selectedShapeId } = useDiagram();
  const { getShapeById, updateShapeAttributes } = useShape();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const ref = useRef(null);

  const shape = useMemo(() => {
    return selectedShapeId ? getShapeById(selectedShapeId) : null;
  }, [selectedShapeId, getShapeById]);

  useClickOutside(ref, () => setIsOpen(false));

  const handleNestedPropertyChange = <
    T extends keyof Pick<ShapeData, "textStyle" | "shadow" | "line">,
    k extends keyof NonNullable<ShapeData[T]>
  >(property: T, key: k, value: NonNullable<ShapeData[T]>[k]) => {
    if (!shape) return;

    const propertyValue = shape[property] || {};
    const newPropertyValue = { ...propertyValue, [key]: value };

    updateShapeAttributes(shape.id, {
      [property]: newPropertyValue
    });
  };

  const handleSimplePropertyChange = <T extends keyof Omit<ShapeData, 'shadow' | 'textStyle'>>(
    property: T,
    value: ShapeData[T]
  ) => {
    if (!shape) return;
    
    updateShapeAttributes(shape.id, {
      [property]: value
    } as Partial<ShapeData>);
  };

  return (
    <div className="flex flex-col gap-3 items-center mx-2.5 mt-2.5">
      <StyleBasePanel 
        shape={shape} 
        handleSimplePropertyChange={handleSimplePropertyChange}
        handleNestedPropertyChange={handleNestedPropertyChange}
      />
      
      <StyleBorderPanel 
        isOpen={isOpen}  
        ref={ref} 
        setIsOpen={setIsOpen} 
        shape={shape}
        handleNestedPropertyChange={handleNestedPropertyChange}
      />
      
      <StyleShadowPanel shape={shape} handleNestedPropertyChange={handleNestedPropertyChange} />
    </div>
  )
};

export default StyleTab;