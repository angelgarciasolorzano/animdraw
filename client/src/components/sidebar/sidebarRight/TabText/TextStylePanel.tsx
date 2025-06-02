import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

import { 
  Select, SelectContent, SelectGroup, SelectItem, 
  SelectLabel, SelectTrigger, SelectValue 
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { Toggle } from "@/components/ui/toggle";
import { cn } from "@/lib/utils";
import { ShapeData } from "@/types";

import { 
  sidebarFontOptions, sidebarFontStyleOptions, 
  sidebarTextAlignOptions, sidebarTextVerticalAlignOptions 
} from "../sidebarItem";

interface TextStylePanelProps {
  shape: ShapeData | null | undefined;
  handleTextStyleChange: (
    key: keyof ShapeData["textStyle"], 
    value: string | number | boolean
  ) => void;
};

function TextStylePanel(props: TextStylePanelProps) {
  const { shape, handleTextStyleChange } = props;

  return (
    <div className="grid gap-1.5">
      <TextTitle />
      <TextFont shape={shape} handleTextStyleChange={handleTextStyleChange} />
      <TextFontStyle shape={shape} handleTextStyleChange={handleTextStyleChange} />
      <TextAlign shape={shape} handleTextStyleChange={handleTextStyleChange} />
      <TextColor shape={shape} handleTextStyleChange={handleTextStyleChange} />
      <TextOpacity shape={shape} handleTextStyleChange={handleTextStyleChange} />
    </div>
  )
};

type TextFontProps = TextStylePanelProps;

function TextTitle() {
  return (
    <h3 className="text-sm font-semibold text-black/90 dark:text-gray-300">
      Fuente
    </h3>
  )
};

function TextFont({ shape, handleTextStyleChange }: TextFontProps) {
  return (
    <div className="mb-0.5">
      <Select
        value={shape?.textStyle?.fontFamily || "Arial"}
        onValueChange={(value) => handleTextStyleChange("fontFamily", value)}
      >
        <SelectTrigger className="w-full mt-1.5">
          <SelectValue placeholder="Arial" />
        </SelectTrigger>

        <SelectContent>
          <SelectGroup>
            <SelectLabel>Seleccione una fuente</SelectLabel>

            {sidebarFontOptions.map((option, index) => (
              <SelectItem key={index} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
};

type TextFontStyleProps = TextStylePanelProps;

function TextFontStyle({ shape, handleTextStyleChange }: TextFontStyleProps) {
  return (
    <div className="flex gap-3 justify-between">
      <div className="flex gap-1">
        <TooltipProvider>
          <div className="flex gap-1">
            {sidebarFontStyleOptions.map((item, index) => {
              const { prop, activeValue, inactiveValue, label, icon: Icon } = item;

              return (
                <Tooltip delayDuration={100} key={index}>
                  <TooltipTrigger asChild>
                    <div>
                      <Toggle
                        key={index}
                        pressed={shape?.textStyle?.[prop] === activeValue}
                        aria-label={label}
                        onPressedChange={(pressed) => (
                          handleTextStyleChange(prop, pressed ? activeValue : inactiveValue)
                        )}
                      >
                        <Icon className="text-gray-700 dark:text-gray-400" />
                      </Toggle>
                    </div>
                  </TooltipTrigger>

                  <TooltipContent>
                    {label}
                  </TooltipContent>
                </Tooltip>
              )
            })}
          </div>
        </TooltipProvider>
      </div>

      <Input 
        className="w-16" 
        type="number"
        min={1}
        value={shape?.textStyle?.fontSize || 15}
        onChange={(e) => (
          handleTextStyleChange("fontSize", parseInt(e.target.value))
        )}
      />
    </div>
  )
};

type TextAlignProps = TextStylePanelProps;

function TextAlign({ shape, handleTextStyleChange }: TextAlignProps) {
  return ( 
    <div className="flex justify-between">
      <TooltipProvider>
        <div className="flex gap-1">
          {sidebarTextAlignOptions.map((item, index) => {
            const { value, inactiveValue, label, icon: Icon } = item;

            return (
              <Tooltip delayDuration={100} key={index}>
                <TooltipTrigger asChild>
                  <div>
                    <Toggle
                      key={index}
                      pressed={(shape?.textStyle?.align ?? "center") === value}
                      aria-label={label}
                      onPressedChange={(pressed) => (
                        handleTextStyleChange("align", pressed ? value : inactiveValue)
                      )}
                    >
                      <Icon className="text-gray-700 dark:text-gray-400" />
                    </Toggle>
                  </div>
                </TooltipTrigger>

                <TooltipContent>
                  {label}
                </TooltipContent>
              </Tooltip>
            )
          })}
        </div>

        <div className="flex gap-0.5">
          {sidebarTextVerticalAlignOptions.map((item, index) => {
            const { value, inactiveValue, label, icon: Icon } = item;

            return (
              <Tooltip delayDuration={100} key={index}>
                <TooltipTrigger asChild>
                  <div>
                    <Toggle
                      key={index}
                      pressed={(shape?.textStyle?.verticalAlign ?? "middle") === value}
                      aria-label={label}
                      onPressedChange={(pressed) => (
                        handleTextStyleChange("verticalAlign", pressed ? value : inactiveValue)
                      )}
                    >
                      <Icon className="text-gray-700 dark:text-gray-400" />
                    </Toggle>
                  </div>
                </TooltipTrigger>

                <TooltipContent>
                  {label}
                </TooltipContent>
              </Tooltip>
            )
          })}
        </div>
      </TooltipProvider>
    </div>
  )
};

type TextColorProps = TextStylePanelProps;

function TextColor({ shape, handleTextStyleChange }: TextColorProps) {
  return (
    <div className="flex justify-between mt-2 items-center">
      <label 
        htmlFor="text-color" 
        className={cn(
          "text-xs text-black/90 font-semibold dark:text-gray-300",
        )}
      >
        Color de la fuente
      </label>

      <Input 
        id="text-color"
        type="color" 
        className="w-24 h-8"
        value={shape?.textStyle?.color || "#000000"}
        onChange={(e) => handleTextStyleChange("color", e.target.value)}
      />
    </div>
  )
};

type TextOpacityProps = TextStylePanelProps;

function TextOpacity({ shape, handleTextStyleChange }: TextOpacityProps) {
  return (
    <div className="flex items-center mt-2 justify-between">
      <label 
        htmlFor="text-opacity"
        className={cn(
          "text-xs text-black/90 font-semibold dark:text-gray-300"
        )}
      >
        Opacidad de texto
      </label>

      <Input
        id="text-opacity"
        type="number"
        className="w-16 h-8"
        step={0.1}
        min={0}
        max={1}
        value={shape?.textStyle?.opacity ?? 1}
        onChange={(e) => handleTextStyleChange("opacity", parseFloat(e.target.value))}
      />
    </div>
  )
};

export default TextStylePanel;