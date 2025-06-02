import React from "react";

import { ShapeData } from "@/types";
import { StyleTab } from "./TabStyle";
import { TextTab } from "./TabText";

interface SidebarTabsContentProps {
  shape: ShapeData | null | undefined;
  handleTextStyleChange: (key: keyof ShapeData["textStyle"], value: string | number | boolean) => void;
  updateShapeAttributes: (shapeId: ShapeData["id"], attributes: Partial<ShapeData>) => void;
};

export type TabsValue = "estilo" | "texto";

type TabsContentItem = { value: TabsValue, component: React.ReactNode };

export function getSidebarTabsContent(props: SidebarTabsContentProps): TabsContentItem[] {
  return [
    {
      value: "estilo",
      component: <StyleTab />
    },
    {
      value: "texto",
      component: <TextTab {...props} />
    }
  ]
};