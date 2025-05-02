import { useState, createContext, useMemo, useCallback } from "react";
import { AnchorPoint, Connection } from "@/types";
import { useShape, useDiagram } from "@/hooks";

interface ConnectionsContextType {
  connections: Connection[];
  allAnchors: Record<string, AnchorPoint>;
  addConnection: (fromAnchor: Connection["fromAnchor"], toAnchor: Connection["toAnchor"]) => void;
  removeConnection: (connectionId: Connection["id"]) => void;
  getConnectionByShape: (shapeId: string) => Connection[];
};

interface ConnectionsProviderProps { children: React.ReactNode };

export const ConnectionsContext = createContext<ConnectionsContextType | null>(null);

export function ConnectionProvider({ children }: ConnectionsProviderProps) {
  const [connections, setConnections] = useState<Connection[]>([]);
  const { shapes } = useShape();
  const { deselectAll } = useDiagram();

  const allAnchors = useMemo(() => {
    const anchorsMap: Record<string, AnchorPoint> = {};

    shapes.forEach((shape) => (
      shape.anchors.forEach((anchor) => (
        anchorsMap[anchor.id] = anchor
      ))
    ));

    return anchorsMap;
  }, [shapes]);

  const addConnection = useCallback((fromAnchorId: Connection["fromAnchor"], toAnchorId: Connection["toAnchor"]) => {
    if (fromAnchorId === toAnchorId) return;

    const fromAnchor = allAnchors[fromAnchorId];
    const toAnchor = allAnchors[toAnchorId];

    if (!fromAnchor || !toAnchor) return;

    const existsConnection = connections.some((connection) => (
      (connection.fromAnchor === fromAnchorId && connection.toAnchor === toAnchorId) ||
      (connection.fromAnchor === toAnchorId && connection.toAnchor === fromAnchorId)
    ));

    if (!existsConnection && fromAnchor.shapeId !== toAnchor.shapeId) {
      const newConnection: Connection = {
        id: `conn-${Date.now()}`,
        fromAnchor: fromAnchorId,
        toAnchor: toAnchorId,
        stroke: "#4b5563",
        strokeWidth: 2
      };

      setConnections((prevConnections) => [...prevConnections, newConnection]);
      deselectAll();
    }
  }, [connections, allAnchors, deselectAll]);

  const removeConnection = useCallback((connectionId: Connection["id"]) => {
    setConnections((prevConnections) => prevConnections.filter((connection) => connection.id !== connectionId));
  }, []);

  const getConnectionByShape = useCallback((shapeId: string) => {
    return connections.filter((connection) => {
      const fromShape = allAnchors[connection.fromAnchor].shapeId;
      const toShape = allAnchors[connection.toAnchor].shapeId;
      
      return fromShape === shapeId || toShape === shapeId;
    });
  }, [connections, allAnchors]);

  const value = useMemo(() => ({
    connections, allAnchors, addConnection, removeConnection, getConnectionByShape
  }), [
    connections, allAnchors, addConnection, removeConnection, getConnectionByShape
  ]);

  return (
    <ConnectionsContext.Provider value={value}>
      {children}
    </ConnectionsContext.Provider>
  );;
}