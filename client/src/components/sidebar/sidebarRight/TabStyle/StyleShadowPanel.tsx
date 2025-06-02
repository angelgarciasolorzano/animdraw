import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

import { cn } from "@/lib/utils";
import { ShapeData } from "@/types";

interface StyleShadowPanelProps {
  shape: ShapeData | null | undefined;
  handleNestedPropertyChange: <
    T extends keyof Pick<ShapeData, "shadow">,
    k extends keyof NonNullable<ShapeData[T]>
  >(
    property: T, 
    key: k, 
    value: NonNullable<ShapeData[T]>[k]
  ) => void;
};

function StyleShadowPanel({ shape, handleNestedPropertyChange }: StyleShadowPanelProps) {
  return (
    <div className="grid gap-3 w-full mt-2">
      <StyleShadow shape={shape} handleNestedPropertyChange={handleNestedPropertyChange} />
      <StyleBlurShadow shape={shape} handleNestedPropertyChange={handleNestedPropertyChange} />
      <StyleOpacityShadow shape={shape} handleNestedPropertyChange={handleNestedPropertyChange} />
    </div>
  )
};

type StyleShadowProps = StyleShadowPanelProps;

function StyleShadow({ shape, handleNestedPropertyChange }: StyleShadowProps) {
  return (
    <div className="flex justify-between w-full">
      <div className="flex items-center space-x-2">
        <Checkbox 
          id="style-shadow" 
          checked={shape?.shadow?.isActive || false}
          onCheckedChange={(checked) => handleNestedPropertyChange("shadow", "isActive", !!checked)}
        />

        <label 
          htmlFor="style-shadow" 
          className={cn(
            "text-xs text-black/90 font-semibold dark:text-gray-300"
          )}
        >
          Sombra
        </label>
      </div>

      <Input 
        type="color" 
        className="w-24 h-8"
        value={shape?.shadow?.color || "#000000"}
        disabled={!shape?.shadow?.isActive}
        onChange={(e) => handleNestedPropertyChange("shadow", "color", e.target.value)}
      />
    </div>
  )
};

type StyleBlurShadowProps = StyleShadowPanelProps;

function StyleBlurShadow({ shape, handleNestedPropertyChange }: StyleBlurShadowProps) {
  return (
    <div className="flex items-center justify-between w-full">
      <label 
        htmlFor="style-shadow-blur"
        className={cn(
          "text-xs text-black/90 font-semibold dark:text-gray-300",
          !shape?.shadow?.isActive && "text-gray-500 dark:text-gray-400"
        )}
      >
        Difuminado de sombra
      </label>

      <Input
        id="style-shadow-blur"
        type="number"
        className="w-16 h-8"
        min={0}
        disabled={!shape?.shadow?.isActive}
        value={shape?.shadow?.blur ?? 3}
        onChange={(e) => handleNestedPropertyChange("shadow", "blur", parseInt(e.target.value))}
      />
    </div>
  )
};

type StyleOpacityShadowProps = StyleShadowPanelProps;

function StyleOpacityShadow({ shape, handleNestedPropertyChange }: StyleOpacityShadowProps) {
  return (
    <div className="flex items-center justify-between w-full">
      <label 
        htmlFor="style-shadow-opacity"
        className={cn(
          "text-xs text-black/90 font-semibold dark:text-gray-300",
          !shape?.shadow?.isActive && "text-gray-500 dark:text-gray-400"
        )}
      >
        Opacidad de sombra
      </label>

      <Input
        id="style-shadow-opacity"
        type="number"
        className="w-16 h-8"
        step={0.1}
        min={0}
        max={1}
        disabled={!shape?.shadow?.isActive}
        value={shape?.shadow?.opacity ?? 1}
        onChange={(e) => handleNestedPropertyChange("shadow", "opacity", parseFloat(e.target.value))}
      />
    </div>
  )
};

export default StyleShadowPanel;