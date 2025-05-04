import { ShapeData } from "@/types";

import TextStylePanel from "./TextStylePanel";
import TextContentPanel from "./TextContentPanel";
import TextShadowPanel from "./TextShadowPanel";

interface TextTabProps {
  shape: ShapeData | null | undefined;
  handleTextStyleChange: (key: keyof ShapeData["textStyle"], value: string | number | boolean) => void;
  updateShapeAttributes: (shapeId: ShapeData["id"], attributes: Partial<ShapeData>) => void;
};

function TextTab(props: TextTabProps) {
  const { shape, handleTextStyleChange, updateShapeAttributes } = props;

  return (
    <div className="flex flex-col gap-3 mx-2.5">
      <TextStylePanel shape={shape} handleTextStyleChange={handleTextStyleChange} />
      <TextContentPanel shape={shape} updateShapeAttributes={updateShapeAttributes} />
      <TextShadowPanel shape={shape} handleTextStyleChange={handleTextStyleChange} />
    </div>
  )
};

export default TextTab;