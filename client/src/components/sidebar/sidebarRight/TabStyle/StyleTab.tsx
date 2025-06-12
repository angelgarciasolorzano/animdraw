import { useRef, useState } from "react";
import { useClickOutside } from "@react-hooks-library/core";

import { ShapeData } from "@/types";

import StyleBasePanel from "./StyleBasePanel";
import StyleBorderPanel from "./StyleBorderPanel";
import StyleShadowPanel from "./StyleShadowPanel";

interface StyleTabProps {
  shape: ShapeData | null | undefined;

  handleSimplePropertyChange: <T extends keyof Omit<ShapeData, "shadow" | "textStyle" | "line">>(
    property: T,
    value: ShapeData[T]
  ) => void;

  handleNestedPropertyChange: <
    T extends keyof Pick<ShapeData, "textStyle" | "shadow" | "line">,
    k extends keyof NonNullable<ShapeData[T]>
  >(
    property: T, 
    key: k, 
    value: NonNullable<ShapeData[T]>[k]
  ) => void;
};

function StyleTab(props: StyleTabProps) {
  const { shape, handleSimplePropertyChange, handleNestedPropertyChange } = props
  const [isOpen, setIsOpen] = useState<boolean>(false);
  
  const ref = useRef(null);
  useClickOutside(ref, () => setIsOpen(false));

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
      
      <StyleShadowPanel 
        shape={shape} 
        handleNestedPropertyChange={handleNestedPropertyChange} 
      />
    </div>
  )
};

export default StyleTab;