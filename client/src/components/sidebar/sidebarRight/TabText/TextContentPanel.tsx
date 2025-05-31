import { Textarea } from "@/components/ui/textarea";
import { ShapeData } from "@/types";

interface TextContentPanelProps {
  shape: ShapeData | null | undefined;
  updateShapeAttributes: (shapeId: ShapeData["id"], attributes: Partial<ShapeData>) => void;
};

function TextContentPanel(props: TextContentPanelProps) {
  const { shape, updateShapeAttributes } = props;
  
  return (
    <div className="grid gap-1.5">
      <label htmlFor="text-content" className="text-xs font-semibold dark:text-gray-200">
        Contenido
      </label>

      <Textarea 
        id="text-content"
        className="resize-none h-24"
        value={shape?.text || ""}
        onChange={(e) => {
          if (!shape) return null;
          updateShapeAttributes(shape.id, { text: e.target.value });
        }}
      />
    </div>
  )
};

export default TextContentPanel;