import { IconType } from "react-icons";

import { 
  Bold, Italic, Underline, 
  AlignLeft, AlignCenter, AlignRight, 
  AlignStartHorizontal, AlignVerticalJustifyCenter, AlignEndHorizontal 
} from "lucide-react";

type FontLabel = "Arial" | "Verdana" | "Georgia" | "Times New Roman" | "Courier New";
type FontStyleKey = "fontWeight" | "fontStyle" | "textDecoration";
type FontStyle = "normal" | "italic" | "bold" | "underline" | "none";
type TextAlign = "left" | "center" | "right";
type TextVerticalAlign = "top" | "middle" | "bottom";

interface SidebarFont { value: FontLabel; label: FontLabel; };

export const sidebarFontOptions: SidebarFont[] = [
  { value: "Arial", label: "Arial" },
  { value: "Verdana", label: "Verdana" },
  { value: "Georgia", label: "Georgia" },
  { value: "Times New Roman", label: "Times New Roman" },
  { value: "Courier New", label: "Courier New" }
];

interface SidebarFontStyle {
  property: FontStyleKey;
  activeValue: FontStyle;
  inactiveValue: FontStyle;
  label: string;
  icon: IconType;
};

export const sidebarFontStyleOptions: SidebarFontStyle[] = [
  {
    property: "fontWeight",
    activeValue: "bold",
    inactiveValue: "normal",
    label: "Texto en negrita",
    icon: Bold
  },
  {
    property: "fontStyle",
    activeValue: "italic",
    inactiveValue: "normal",
    label: "Texto en cursiva",
    icon: Italic
  },
  {
    property: "textDecoration",
    activeValue: "underline",
    inactiveValue: "none",
    label: "Texto subrayado",
    icon: Underline
  },
];

type TextAlignOptions = Omit<SidebarFontStyle, "property" | "activeValue" | "inactiveValue"> & {
  value: TextAlign;
  inactiveValue: TextAlign;
};

export const sidebarTextAlignOptions: TextAlignOptions[] = [
  {
    value: "left",
    inactiveValue: "center",
    label: "Texto alineado a la izquierda",
    icon: AlignLeft
  },
  {
    value: "center",
    inactiveValue: "left",
    label: "Texto centrado",
    icon: AlignCenter
  },
  {
    value: "right",
    inactiveValue: "center",
    label: "Texto alineado a la derecha",
    icon: AlignRight
  }
];

type TextVerticalAlignOptions = Omit<SidebarFontStyle, "property" | "activeValue" | "inactiveValue"> & {
  value: TextVerticalAlign;
  inactiveValue: TextVerticalAlign;
};

export const sidebarTextVerticalAlignOptions: TextVerticalAlignOptions[] = [
  {
    value: "top",
    inactiveValue: "middle",
    label: "Texto alineado arriba",
    icon: AlignStartHorizontal
  },
  {
    value: "middle",
    inactiveValue: "top",
    label: "Texto centrado verticalmente",
    icon: AlignVerticalJustifyCenter
  },
  {
    value: "bottom",
    inactiveValue: "middle",
    label: "Texto alineado abajo",
    icon: AlignEndHorizontal
  }
];