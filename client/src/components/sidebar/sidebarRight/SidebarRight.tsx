import { useCallback, useEffect, useMemo, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { cn } from "@/lib/utils";
import { useDiagram, useShape } from "@/hooks";
import { ShapeData } from "@/types";

import { sidebarTabOptions} from "./sidebarItem";
import { TextTab } from "./TabText";
import { StyleTab } from "./TabStyle";

function SidebarRight() {
  const { selectedShapeId } = useDiagram();
  const { getShapeById, updateShapeAttributes } = useShape();
  const [activeTap, setActiveTap] = useState<string>("estilo");

  useEffect(() => {
    if (!selectedShapeId) setActiveTap("estilo");
    else setActiveTap("texto");
  }, [selectedShapeId]);

  const shape = useMemo(() => {
    return selectedShapeId ? getShapeById(selectedShapeId) : null;
  }, [selectedShapeId, getShapeById]);

  const handleTextStyleChange = useCallback((
    key: keyof ShapeData["textStyle"], 
    value: string | number | boolean
  ) => {
    if (!shape) return null;

    updateShapeAttributes(shape.id, {
      textStyle: { ...shape.textStyle, [key]: value }
    })
  }, [shape, updateShapeAttributes]);

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
          <StyleTab />
        </TabsContent>
        <TabsContent value="texto">
          <TextTab
            shape={shape}
            handleTextStyleChange={handleTextStyleChange}
            updateShapeAttributes={updateShapeAttributes}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
};

export default SidebarRight;