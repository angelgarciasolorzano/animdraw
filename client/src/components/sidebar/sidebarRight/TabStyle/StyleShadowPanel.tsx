import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

function StyleShadowPanel() {
  return (
    <div className="grid gap-3 w-full mt-2">
      <StyleShadow />
      <StyleBlurShadow />
      <StyleOpacityShadow />
    </div>
  )
};

function StyleShadow() {
  return (
    <div className="flex justify-between w-full">
      <div className="flex items-center space-x-2">
        <Checkbox 
          id="style-shadow" 
          className="border-gray-300"
        />

        <label htmlFor="style-shadow" className="text-xs font-semibold">
          Sombra
        </label>
      </div>

      <Input 
        type="color" 
        className="w-24 h-8 border-gray-300"
      />
    </div>
  )
};

function StyleBlurShadow() {
  return (
    <div className="flex items-center justify-between w-full">
      <label 
        htmlFor="style-shadow-blur"
        className={cn(
          "text-xs font-semibold",
        )}
      >
        Difuminado de sombra
      </label>

      <Input
        id="style-shadow-blur"
        type="number"
        min={0}
        className="w-16 border-gray-300 h-8"
      />
    </div>
  )
};

function StyleOpacityShadow() {
  return (
    <div className="flex items-center justify-between w-full">
      <label 
        htmlFor="style-shadow-opacity"
        className={cn(
          "text-xs font-semibold",
        )}
      >
        Opacidad de sombra
      </label>

      <Input
        id="style-shadow-opacity"
        type="number"
        className="w-16 border-gray-300 h-8"
        step={0.1}
        min={0}
        max={1}
      />
    </div>
  )
};

export default StyleShadowPanel;