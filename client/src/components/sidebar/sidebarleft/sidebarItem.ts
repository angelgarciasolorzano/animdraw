import { IconType } from "react-icons";
import { IoTriangleOutline } from "react-icons/io5";
import { MdOutlineCircle, MdOutlineRectangle } from "react-icons/md";

export interface IconItem {
  icon: IconType;
  label: string;
  type: "rect" | "ellipse";
  x: number;
  y: number;
  width: number;
  height: number;
  onClick?: () => void;
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
        label: "Rectangulo",
        type: "rect",
        x: 100,
        y: 100,
        width: 150,
        height: 100
      },
      {
        icon: MdOutlineCircle,
        label: "Círculo",
        type: "ellipse",
        x: 300,
        y: 200,
        width: 150,
        height: 100
      },
      {
        icon: IoTriangleOutline,
        label: "Triángulo",
        type: "ellipse",
        x: 300,
        y: 200,
        width: 150,
        height: 100
      }
    ]
  }
];