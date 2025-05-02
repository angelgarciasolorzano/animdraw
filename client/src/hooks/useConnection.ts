import { useContext } from "react"
import { ConnectionsContext } from "@/context";

const useConnection = () => {
  const context = useContext(ConnectionsContext);
  if (!context) throw new Error("Debe usar este hook dentro de un ConnectionsProvider");
  return context;
};

export default useConnection;