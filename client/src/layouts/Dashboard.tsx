import useShapes from "@/hooks/useShapes";
import Content from "../components/Content";
import Header from "../components/Header";
import SidebarLeft from "../components/sidebar/sidebarleft/SidebarLeft";
import SidebarRight from "../components/sidebar/sidebarRight/SidebarRight";
import { useCallback } from "react";
import { ShapeData } from "@/types/shapeData";
import createAnchors from "@/utils/createAnchor";

function Dashboard() {
  const { shapes, addShape, updateShapeAttributes } = useShapes();

  const handleAddShape = useCallback((id: string, x: number, y: number, width: number, height: number, type: "rect" | "ellipse") => {
    const newShape: ShapeData = {
      id: id,
      type,
      x: x,
      y: y,
      width: width,
      height: height,
      fill: "#e5e7eb",
      stroke: "#6b7280",
      strokeWidth: 2,
      text: "Figura 1",
      anchors: createAnchors(id, x, y, width, height, type)
    };
    addShape(newShape);
  }, [addShape]);

  return (
    <div className="flex flex-col h-screen">
      <Header />

      <div className="flex flex-1 bg-amber-200">
        <SidebarLeft onAddShape={handleAddShape} />
        <Content shapes={shapes} updateShapeAttributes={updateShapeAttributes} />
        <SidebarRight />
      </div>
    </div>
  )
}

export default Dashboard;