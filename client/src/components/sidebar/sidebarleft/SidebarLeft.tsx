import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

import { cn } from "@/lib/utils";
import { ShapeData } from "@/types";
import { useShape, useDiagram, useTheme } from "@/hooks";

import { sidebarItem, IconItem } from "./sidebarItem";

type NewShape = Omit<ShapeData, "id" | "anchors">;

function SidebarLeft() {
  const { addShape } = useShape();
  const { selectShape } = useDiagram();
  const { theme } = useTheme();

  const isDark = theme === "dark";

  const handleAddShape = (
    type: ShapeData["type"],
    x: number, y: number, 
    width: number, height: number
  ) => {
    const newShape: NewShape = {
      type,
      x: x,
      y: y,
      width: width,
      height: height,
      fill: isDark ? "#0D0D0D" : "#e5e7eb",
      textStyle: {
        color: isDark ? "#ffffff" : "#000000"
      },
      line: {
        stroke: isDark ? "#ffffff" : "#000000"
      }
    };

    const newId = addShape(newShape);
    selectShape(newId);
  };

  return (
    <div className="w-48 border-r border-gray-300 dark:border-border">
      {sidebarItem.map((section) => (
        <SidebarSection 
          key={section.value} 
          value={section.value} 
          title={section.title} 
          icon={section.icon} 
          onAddShape={handleAddShape}
        />
      ))}
    </div>
  )
};

interface SidebarSectionProps {
  title: string;
  value: string;
  icon: IconItem[];
  onAddShape: (
    type: ShapeData["type"], 
    x: number, y: number, 
    width: number, height: number
  ) => void;
};

function SidebarSection({ title, value, icon, onAddShape }: SidebarSectionProps) {
  return (
    <div className="m-1">
      <Accordion type="single" collapsible>
        <AccordionItem value={value}>
          <AccordionTrigger 
            className={cn(
              "px-1.5 py-2 rounded-sm text-black/90 hover:bg-gray-200 hover:no-underline",
              "dark:text-[#fcfcfc] dark:hover:bg-gray-500/20"
            )}
          >
            {title}
          </AccordionTrigger>

          <AccordionContent className="px-1.5">
            <SidebarTooltip icon={icon} onAddShape={onAddShape} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
};

type SidebarIconsProps = Pick<SidebarSectionProps, "icon" | "onAddShape">;

function SidebarTooltip({ icon, onAddShape }: SidebarIconsProps) {
  return (
    <TooltipProvider>
      <div className="grid grid-cols-4 text-2xl gap-2 py-2">
        {icon.map((item, index) => {
          const { icon: Icon, label, type, x, y, width, height } = item;

          return (
            <Tooltip key={index}>
              <TooltipTrigger asChild>
                <Icon 
                  className="cursor-pointer text-gray-700 dark:text-gray-400" 
                  onClick={() => onAddShape(type, x, y, width, height)} 
                />
              </TooltipTrigger>

              <TooltipContent>
                {label}
              </TooltipContent>
            </Tooltip>
          )
        })}
      </div>
    </TooltipProvider>
  )
};

export default SidebarLeft;