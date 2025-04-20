import { IconType } from "react-icons";
import { IoTriangleOutline } from "react-icons/io5";
import { MdOutlineCircle, MdOutlineRectangle } from "react-icons/md";

export interface IconItem {
  icon: IconType;
  label: string;
};

interface ItemsSections {
  title: string;
  value: string;
  icon: IconItem[];
};

export const sidebarItem: ItemsSections[] = [
  {
    title: "General",
    value: "general",
    icon: [
      {
        icon: MdOutlineRectangle,
        label: "Rectangulo"
      },
      {
        icon: MdOutlineCircle,
        label: "Círculo"
      },
      {
        icon: IoTriangleOutline,
        label: "Triángulo"
      }
    ]
  }
];