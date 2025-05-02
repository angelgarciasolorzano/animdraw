import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { sidebarItem, IconItem } from "./sidebarItem";
import useShape from "@/hooks/useShape";
import useDiagram from "@/hooks/useDiagram";

function SidebarLeft() {
  const { addShape } = useShape();
  const { selectShape } = useDiagram();

  const handleAddShape = (type:"rect" | "ellipse" ,x: number, y: number, width: number, height: number) => {
    const newShape = {
      type,
      x: x,
      y: y,
      width: width,
      height: height,
      fill: "#e5e7eb",
      stroke: "#6b7280",
      strokeWidth: 2,
      text: "Figura 1",
    };

    const newId = addShape(newShape);
    selectShape(newId);
  };

  return (
    <div className="w-48 bg-white border-r border-gray-200">
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
  onAddShape: (type: "rect" | "ellipse",x: number, y: number, width: number, height: number) => void;
  title: string;
  value: string;
  icon: IconItem[];
};

function SidebarSection({ title, value, icon, onAddShape }: SidebarSectionProps) {
  return (
    <div className="m-1">
      <Accordion type="single" collapsible>
        <AccordionItem value={value}>
          <AccordionTrigger className="px-1.5 py-2 rounded-sm hover:text-blue-700 
            hover:bg-blue-500/10 hover:no-underline"
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
                  className="cursor-pointer" 
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