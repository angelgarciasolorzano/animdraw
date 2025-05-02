import { useContext } from "react"
import { ShapesContext } from "@/context";

const useShape = () => {
  const context = useContext(ShapesContext);
  if (!context) throw new Error("Debe usar este hook dentro de un ShapesProvider");
  return context;
};

export default useShape;