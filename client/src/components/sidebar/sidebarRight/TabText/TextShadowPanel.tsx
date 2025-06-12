import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

import { cn } from "@/lib/utils";
import { ShapeData } from "@/types";

interface TextShadowPanelProps {
  shape: ShapeData | null | undefined;
  handleNestedPropertyChange: <
    T extends keyof Pick<ShapeData, "textStyle">,
    k extends keyof NonNullable<ShapeData[T]>
  >(
    property: T, 
    key: k, 
    value: NonNullable<ShapeData[T]>[k]
  ) => void;
};

function TextShadowPanel(props: TextShadowPanelProps) {
  const { shape, handleNestedPropertyChange } = props;

  return (
    <div className="flex flex-col gap-2.5">
      <TextShadow shape={shape} handleNestedPropertyChange={handleNestedPropertyChange} />
      <TextBlurShadow shape={shape} handleNestedPropertyChange={handleNestedPropertyChange} />
      <TextOpacityShadow shape={shape} handleNestedPropertyChange={handleNestedPropertyChange} />
    </div>
  )
};

type TextShadowProps = TextShadowPanelProps;

function TextShadow({ shape, handleNestedPropertyChange }: TextShadowProps) {
  return (
    <div className="flex justify-between">
      <div className="flex items-center space-x-2">
        <Checkbox 
          id="shadow" 
          checked={shape?.textStyle?.hasShadow || false}
          onCheckedChange={(checked) => handleNestedPropertyChange("textStyle", "hasShadow", !!checked)}
        />

        <label 
          htmlFor="shadow" 
          className={cn(
            "text-xs text-black/90 font-semibold dark:text-gray-300",
          )}
        >
          Sombra
        </label>
      </div>

      <Input 
        type="color" 
        className="w-24 h-8"
        value={shape?.textStyle?.shadowColor || "#000000"}
        disabled={!shape?.textStyle?.hasShadow}
        onChange={(e) => handleNestedPropertyChange("textStyle", "shadowColor", e.target.value)}
      />
    </div>
  )
};

type TextBlurShadowProps = TextShadowPanelProps;

function TextBlurShadow({ shape, handleNestedPropertyChange }: TextBlurShadowProps) {
  return (
    <div className="flex items-center justify-between">
      <label 
        htmlFor="shadow-blur"
        className={cn(
          "text-xs font-semibold text-black/90 dark:text-gray-300",
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
        onChange={(e) => handleNestedPropertyChange("textStyle", "shadowBlur", parseInt(e.target.value))}
      />
    </div>
  )
};

type TextOpacityShadowProps = TextShadowPanelProps;

function TextOpacityShadow({ shape, handleNestedPropertyChange }: TextOpacityShadowProps) {
  return (
    <div className="flex items-center justify-between">
      <label 
        htmlFor="shadow-opacity"
        className={cn(
          "text-xs font-semibold text-black/90 dark:text-gray-300",
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
        onChange={(e) => handleNestedPropertyChange("textStyle", "shadowOpacity", parseFloat(e.target.value))}
      />
    </div>
  )
};

export default TextShadowPanel;