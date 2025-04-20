import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { sidebarItem, IconItem } from "./sidebarItem";

function SidebarLeft() {
  return (
    <div className="w-48 bg-white border-r border-gray-200">
      {sidebarItem.map((section) => (
        <SidebarSection 
          key={section.value} 
          value={section.value} 
          title={section.title} 
          icon={section.icon} 
        />
      ))}
    </div>
  )
};

interface SidebarSectionProps {
  title: string;
  value: string;
  icon: IconItem[];
};

function SidebarSection({ title, value, icon }: SidebarSectionProps) {
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
            <SidebarIcons icon={icon} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
};

type SidebarIconsProps = Pick<SidebarSectionProps, "icon">;

function SidebarIcons({ icon }: SidebarIconsProps) {
  return (
    <TooltipProvider>
      <div className="grid grid-cols-4 text-2xl gap-2 py-2">
        {icon.map(({ icon: Icon, label }, index) => (
          <Tooltip key={index}>
            <TooltipTrigger asChild>
              <Icon className="cursor-pointer" />
            </TooltipTrigger>

            <TooltipContent>
              {label}
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  )
};

export default SidebarLeft;