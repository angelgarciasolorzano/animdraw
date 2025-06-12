import React from "react";

import { ShapeData } from "@/types";
import { StyleTab } from "./TabStyle";
import { TextTab } from "./TabText";

interface SidebarTabsContentProps {
  shape: ShapeData | null | undefined;

  handleSimplePropertyChange: <T extends keyof Omit<ShapeData, "shadow" | "textStyle" | "line">>(
    property: T,
    value: ShapeData[T]
  ) => void;

  handleNestedPropertyChange: <
    T extends keyof Pick<ShapeData, "textStyle" | "shadow" | "line">,
    k extends keyof NonNullable<ShapeData[T]>
  >(
    property: T, 
    key: k, 
    value: NonNullable<ShapeData[T]>[k]
  ) => void;
};

type TabsValue = "estilo" | "texto";
type TabsContentItem = { value: TabsValue, component: React.ReactNode };

function getSidebarTabsContent(props: SidebarTabsContentProps): TabsContentItem[] {
  return [
    {
      value: "estilo",
      component: <StyleTab {...props} />
    },
    {
      value: "texto",
      component: <TextTab {...props} />
    }
  ]
};

export default getSidebarTabsContent;