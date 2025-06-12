import { ShapeData } from "@/types";

import TextStylePanel from "./TextStylePanel";
import TextContentPanel from "./TextContentPanel";
import TextShadowPanel from "./TextShadowPanel";

interface TextTabProps {
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

function TextTab(props: TextTabProps) {
  const { shape, handleSimplePropertyChange, handleNestedPropertyChange } = props;

  return (
    <div className="flex flex-col gap-3 mx-2.5">
      <TextStylePanel shape={shape} handleNestedPropertyChange={handleNestedPropertyChange} />
      <TextContentPanel shape={shape} handleSimplePropertyChange={handleSimplePropertyChange} />
      <TextShadowPanel shape={shape} handleNestedPropertyChange={handleNestedPropertyChange} />
    </div>
  )
};

export default TextTab;