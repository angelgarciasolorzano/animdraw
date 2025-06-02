import { useCallback, useEffect, useMemo, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { cn } from "@/lib/utils";
import { useDiagram, useShape } from "@/hooks";
import { ShapeData } from "@/types";

import { sidebarTabOptions} from "./sidebarItem";
import { getSidebarTabsContent } from "./SidebarTabsContent";

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

  const sidebarTabsContext = getSidebarTabsContent({
    shape, handleTextStyleChange, updateShapeAttributes
  });

  return (
    <div className="w-[264px] border-l border-gray-300 dark:border-border">
      <Tabs 
        defaultValue="estilo" 
        value={activeTap}
        onValueChange={setActiveTap}
      >
        <TabsList className="w-full rounded-none p-0">
          {sidebarTabOptions.map((option, index) => (
            <TabsTrigger
              key={index}
              value={option.value}
              disabled={option.value === "texto" && !selectedShapeId} 
              className={cn(
                "rounded-none h-full border-gray-300 border-t-transparent",
                "data-[state=active]:shadow-none data-[state=active]:border-b-transparent",
                "dark:border-border dark:data-[state=inactive]:bg-background/30",
                "dark:data-[state=active]:bg-background",
                "dark:data-[state=active]:border-transparent",
                "dark:data-[state=inactive]:border-t-transparent",
                option.className
              )}
            >
              {option.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {sidebarTabsContext.map(({ value, component }) => (
          <TabsContent value={value} key={value}>
            <div
              className={cn(
                "max-h-[calc(100vh-100px)] overflow-auto scrollbar-thin pb-2",
                "scrollbar-track-transparent scrollbar-thumb-black/40",
                "dark:scrollbar-thumb-gray-500/50"
              )}
            >
              {component}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
};

export default SidebarRight;