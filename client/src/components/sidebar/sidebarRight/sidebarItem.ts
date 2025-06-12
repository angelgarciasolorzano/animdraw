import { cn } from "@/lib/utils";

type SidebarTabValue = "estilo" | "texto";

export interface SidebarTab {
  value: SidebarTabValue;
  name: string;
  className?: string;
};

export const sidebarTabOptions: SidebarTab[] = [
  {
    value: "estilo",
    name: "Estilo",
    className: cn(
      "border-l-transparent",
      "data-[state=active]:border-r-transparent"
    )
  },
  {
    value: "texto",
    name: "Texto",
    className: cn(
      "border-r-transparent",
      "data-[state=active]:border-l-transparent"
    )
  }
];