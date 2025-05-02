import { useContext } from "react"
import { DiagramContext } from "@/context";

const useDiagram = () => {
  const context = useContext(DiagramContext);
  if (!context) throw new Error("Debe usar este hook dentro de un DiagramProvider");
  return context;
};

export default useDiagram;