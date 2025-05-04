import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { 
  Select, SelectContent, SelectGroup, SelectItem, 
  SelectLabel, SelectTrigger, SelectValue 
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Toggle } from "@/components/ui/toggle";
import { Checkbox } from "@/components/ui/checkbox";

import { cn } from "@/lib/utils";
import { useDiagram, useShape } from "@/hooks";
import { ShapeData } from "@/types";

import { 
  sidebarTabOptions, sidebarFontOptions, sidebarFontStyleOptions, 
  sidebarTextAlignOptions, sidebarTextVerticalAlignOptions 
} from "./sidebarItem";

function SidebarRight() {
  const { selectedShapeId } = useDiagram();
  const { getShapeById, updateShapeAttributes } = useShape();
  const [activeTap, setActiveTap] = useState<string>("estilo");
  const shape = selectedShapeId ? getShapeById(selectedShapeId) : null;

  useEffect(() => {
    if (!selectedShapeId) setActiveTap("estilo");
    else setActiveTap("texto");
  }, [selectedShapeId]);

  const handleTextStyleChange = (
    key: keyof ShapeData["textStyle"], 
    value: string | number | boolean
  ) => {
    if (!shape) return null;

    updateShapeAttributes(shape?.id, {
      textStyle: {
        [key]: value
      }
    });
  };

  return (
    <div className="w-64 bg-white border-l border-gray-300">
      <Tabs 
        defaultValue="estilo" 
        value={activeTap}
        onValueChange={setActiveTap}
      >
        <TabsList className="grid grid-cols-2 w-full rounded-none p-0">
          {sidebarTabOptions.map((option, index) => (
            <TabsTrigger
              key={index}
              value={option.value}
              disabled={option.value === "texto" && !selectedShapeId} 
              className={cn(
                "rounded-none h-full border-gray-300",
                "data-[state=active]:shadow-none data-[state=active]:border-b-transparent",
                option.className
              )}
            >
              {option.name}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value="estilo">
          Herramientas para el estilo de la figura
        </TabsContent>
        <TabsContent value="texto">
          <SectionText
            shape={shape}
            handleTextStyleChange={handleTextStyleChange}
            updateShapeAttributes={updateShapeAttributes}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
};

interface SectionTextProps {
  shape: ShapeData | null | undefined;
  handleTextStyleChange: (key: keyof ShapeData["textStyle"], value: string | number | boolean) => void;
  updateShapeAttributes: (shapeId: ShapeData["id"], attributes: Partial<ShapeData>) => void;
};

function SectionText({ shape, handleTextStyleChange, updateShapeAttributes }: SectionTextProps) {
  return (
    <div className="mx-2.5 flex flex-col gap-3">
      <div className="grid gap-1.5">
        <div>
          <span className="text-sm font-semibold">
            Fuente
          </span>

          <Select
            value={shape?.textStyle?.fontFamily || "Arial"}
            onValueChange={(value) => handleTextStyleChange("fontFamily", value)}
          >
            <SelectTrigger className="w-full mt-1.5 border-gray-300">
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

        <div className="flex gap-3 justify-between">
          <div className="flex gap-1">
            {sidebarFontStyleOptions.map((option, index) => {
              const { prop, activeValue, inactiveValue, label, icon: Icon } = option;

              return (
                <Toggle
                  key={index}
                  pressed={shape?.textStyle?.[prop] === activeValue}
                  aria-label={label}
                  onPressedChange={(pressed) => (
                    handleTextStyleChange(prop, pressed ? activeValue : inactiveValue)
                  )}
                >
                  <Icon />
                </Toggle>
              )
            })}
          </div>

          <Input 
            className="w-16 border-gray-300" 
            type="number" 
            value={shape?.textStyle?.fontSize || 15}
            onChange={(e) => (
              handleTextStyleChange("fontSize", parseInt(e.target.value))
            )}
          />
        </div>
        
        <div className="flex justify-between">
          <div className="flex">
            {sidebarTextAlignOptions.map((option, index) => {
              const { value, inactiveValue, label, icon: Icon } = option;

              return (
                <Toggle
                  key={index}
                  pressed={shape?.textStyle?.align === value}
                  aria-label={label}
                  onPressedChange={(pressed) => (
                    handleTextStyleChange("align", pressed ? value : inactiveValue)
                  )}
                >
                  <Icon />
                </Toggle>
              )
            })}
          </div>

          <div className="flex">
            {sidebarTextVerticalAlignOptions.map((option, index) => {
              const { value, inactiveValue, label, icon: Icon } = option;

              return (
                <Toggle
                  key={index}
                  pressed={shape?.textStyle?.verticalAlign === value}
                  aria-label={label}
                  onPressedChange={(pressed) => (
                    handleTextStyleChange("verticalAlign", pressed ? value : inactiveValue)
                  )}
                >
                  <Icon />
                </Toggle>
              )
            })}
          </div>
        </div>

        <div className="flex justify-between mt-2 items-center">
          <span className="text-xs font-medium">Color de la fuente</span>

          <Input 
            type="color" 
            className="w-24 h-8 border-gray-300"
            value={shape?.textStyle?.color || "#000000"}
            onChange={(e) => handleTextStyleChange("color", e.target.value)}
          />
        </div>

        <div className="flex items-center mt-2 justify-between">
          <label 
            id="text-opacity"
            className="text-xs font-semibold"
          >
            Opacidad de texto
          </label>

          <Input
            id="text-opacity"
            type="number"
            className="w-16 border-gray-300 h-8"
            step={0.1}
            min={0}
            max={1}
            value={shape?.textStyle?.opacity ?? 1}
            onChange={(e) => handleTextStyleChange("opacity", parseFloat(e.target.value))}
          />
        </div>
      </div>

      <div className="grid gap-1.5">
        <span className="text-xs font-semibold">
          Contenido
        </span>

        <Textarea 
          className="resize-none h-24 border-gray-300"
          value={shape?.text || ""}
          onChange={(e) => {
            if (!shape) return null;
            updateShapeAttributes(shape.id, { text: e.target.value });
          }}
        />
      </div>

      <div className="flex flex-col gap-2.5">
        <div className="flex justify-between">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="shadow" 
              className="border-gray-300"
              checked={shape?.textStyle?.hasShadow || false}
              onCheckedChange={(checked) => handleTextStyleChange("hasShadow", checked)}
            />
            <label htmlFor="shadow" className="text-xs font-semibold">Sombra</label>
          </div>

          <Input 
            type="color" 
            className="w-24 h-8 border-gray-300"
            value={shape?.textStyle?.shadowColor || "#000000"}
            disabled={!shape?.textStyle?.hasShadow}
            onChange={(e) => handleTextStyleChange("shadowColor", e.target.value)}
          />
        </div>

        <div className="flex items-center justify-between">
          <label 
            id="shadow-blur" 
            className={cn(
              "text-xs font-semibold",
              !shape?.textStyle?.hasShadow && "text-gray-500"
            )}
          >
            Difuminado de sombra
          </label>

          <Input
            id="shadow-blur"
            type="number"
            className="w-16 border-gray-300 h-8"
            disabled={!shape?.textStyle?.hasShadow}
            value={shape?.textStyle?.shadowBlur ?? 3}
            onChange={(e) => handleTextStyleChange("shadowBlur", parseInt(e.target.value))}
          />
        </div>

        <div className="flex items-center justify-between">
          <label 
            id="shadow-blur" 
            className={cn(
              "text-xs font-semibold",
              !shape?.textStyle?.hasShadow && "text-gray-500"
            )}
          >
            Opacidad de sombra
          </label>

          <Input
            id="shadow-blur"
            type="number"
            className="w-16 border-gray-300 h-8"
            step={0.1}
            min={0}
            max={1}
            disabled={!shape?.textStyle?.hasShadow}
            value={shape?.textStyle?.shadowOpacity ?? 1}
            onChange={(e) => handleTextStyleChange("shadowOpacity", parseFloat(e.target.value))}
          />
        </div>
      </div>
    </div>
  )
};

export default SidebarRight;