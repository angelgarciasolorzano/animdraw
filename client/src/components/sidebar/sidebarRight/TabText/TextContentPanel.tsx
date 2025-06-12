import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { ShapeData } from "@/types";

interface TextContentPanelProps {
  shape: ShapeData | null | undefined;
  handleSimplePropertyChange: <T extends keyof Omit<ShapeData, "shadow" | "textStyle" | "line">>(
    property: T,
    value: ShapeData[T]
  ) => void;
};

function TextContentPanel(props: TextContentPanelProps) {
  const { shape, handleSimplePropertyChange } = props;
  
  return (
    <div className="grid gap-1.5">
      <label 
        htmlFor="text-content" 
        className={cn(
          "text-xs text-black/90 font-semibold dark:text-gray-300"
        )}
      >
        Contenido
      </label>

      <Textarea 
        id="text-content"
        className="resize-none h-24"
        value={shape?.text || ""}
        onChange={(e) => handleSimplePropertyChange("text", e.target.value)}
      />
    </div>
  )
};

export default TextContentPanel;