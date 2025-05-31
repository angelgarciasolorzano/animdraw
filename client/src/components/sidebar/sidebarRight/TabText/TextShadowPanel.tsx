import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

import { cn } from "@/lib/utils";
import { ShapeData } from "@/types";

interface TextShadowPanelProps {
  shape: ShapeData | null | undefined;
  handleTextStyleChange: (
    key: keyof ShapeData["textStyle"], 
    value: string | number | boolean
  ) => void;
};

function TextShadowPanel(props: TextShadowPanelProps) {
  const { shape, handleTextStyleChange } = props;

  return (
    <div className="flex flex-col gap-2.5">
      <TextShadow shape={shape} handleTextStyleChange={handleTextStyleChange} />
      <TextBlurShadow shape={shape} handleTextStyleChange={handleTextStyleChange} />
      <TextOpacityShadow shape={shape} handleTextStyleChange={handleTextStyleChange} />
    </div>
  )
};

type TextShadowProps = TextShadowPanelProps;

function TextShadow({ shape, handleTextStyleChange }: TextShadowProps) {
  return (
    <div className="flex justify-between">
      <div className="flex items-center space-x-2">
        <Checkbox 
          id="shadow" 
          checked={shape?.textStyle?.hasShadow || false}
          onCheckedChange={(checked) => handleTextStyleChange("hasShadow", checked)}
        />

        <label htmlFor="shadow" className="text-xs font-semibold dark:text-gray-200">
          Sombra
        </label>
      </div>

      <Input 
        type="color" 
        className="w-24 h-8"
        value={shape?.textStyle?.shadowColor || "#000000"}
        disabled={!shape?.textStyle?.hasShadow}
        onChange={(e) => handleTextStyleChange("shadowColor", e.target.value)}
      />
    </div>
  )
};

type TextBlurShadowProps = TextShadowPanelProps;

function TextBlurShadow({ shape, handleTextStyleChange }: TextBlurShadowProps) {
  return (
    <div className="flex items-center justify-between">
      <label 
        htmlFor="shadow-blur"
        className={cn(
          "text-xs font-semibold dark:text-gray-200",
          !shape?.textStyle?.hasShadow && "text-gray-500 dark:text-gray-400"
        )}
      >
        Difuminado de sombra
      </label>

      <Input
        id="shadow-blur"
        type="number"
        className="w-16 h-8"
        disabled={!shape?.textStyle?.hasShadow}
        min={0}
        value={shape?.textStyle?.shadowBlur ?? 3}
        onChange={(e) => handleTextStyleChange("shadowBlur", parseInt(e.target.value))}
      />
    </div>
  )
};

type TextOpacityShadowProps = TextShadowPanelProps;

function TextOpacityShadow({ shape, handleTextStyleChange }: TextOpacityShadowProps) {
  return (
    <div className="flex items-center justify-between">
      <label 
        htmlFor="shadow-opacity"
        className={cn(
          "text-xs font-semibold dark:text-gray-200",
          !shape?.textStyle?.hasShadow && "text-gray-500 dark:text-gray-400"
        )}
      >
        Opacidad de sombra
      </label>

      <Input
        id="shadow-opacity"
        type="number"
        className="w-16 h-8"
        step={0.1}
        min={0}
        max={1}
        disabled={!shape?.textStyle?.hasShadow}
        value={shape?.textStyle?.shadowOpacity ?? 1}
        onChange={(e) => handleTextStyleChange("shadowOpacity", parseFloat(e.target.value))}
      />
    </div>
  )
};

export default TextShadowPanel;