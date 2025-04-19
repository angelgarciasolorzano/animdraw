import { useMemo, useState } from "react";
import { Connection, AnchorPoint, ShapeData } from "../types/shapeData";

interface useConnectionsProps {
  shapes: ShapeData[];
  onSelectShapeId: (shapeId: string | null) => void;
};

/**Hook para manejar los estados y operaciones relacionadas con las conexiones,
 * permite seleccionar anclajes y crear conexiones entre ellos
 * @param shapes - Figuras actuales
 * @param onSelectShapeId - Callback para actualizar la figura seleccionada
 * @returns - {
 *   connections: Array de todas las conexiones,
 *   selectedAnchorId: ID del anclaje seleccionado,
 *   pendingAnchorId: ID del anclaje pendiente para crear una conexión,
 *   allAnchors: Mapeo de todos los anclajes disponibles de las figuras,
 *   handleSelectAnchor: Función para seleccionar un anclaje,
 *   ofSelectAnchor: Función para deseleccionar un anclaje
 * }
*/
function useConnections({ shapes, onSelectShapeId }: useConnectionsProps) {
  const [connections, setConnections] = useState<Connection[]>([]);
  const [selectedAnchorId, setSelectedAnchorId] = useState<string | null>(null);
  const [pendingAnchorId, setPendingAnchorId] = useState<string | null>(null);

  /**Mapa de todos los anclajes de las figuras,
   * Se recalcula solo cuando cambia la lista de figuras
   * @returns Objeto con los anclajes de las figuras
  */
  const allAnchors = useMemo(() => {
    const anchors: Record<string, AnchorPoint> = {};

    shapes.forEach((shape) => {
      shape.anchors.forEach((anchor) => {
        anchors[anchor.id] = anchor;
      })
    });

    return anchors;
  }, [shapes]);

  /**Maneja la seleccion de un punto de anclaje y crea una conexion si hay uno pendiente 
   * @param anchorId - ID del punto de anclaje seleccionado
  */
  function handleSelectAnchor(anchorId: string) {
    const anchor = allAnchors[anchorId];
    if (!anchor) return;

    if (pendingAnchorId) {
      const newConnection: Connection = {
        id: `conn-${pendingAnchorId}-${anchorId}-${Date.now()}`,
        fromAnchor: pendingAnchorId,
        toAnchor: anchorId,
        stroke: "#4b5563",
        strokeWidth: 2,
      };

      setConnections(prev => [...prev, newConnection]);
      setPendingAnchorId(null);
      setSelectedAnchorId(null);
      onSelectShapeId(null);
    } else {
      setPendingAnchorId(anchorId);
      setSelectedAnchorId(anchorId);
      onSelectShapeId(anchor.shapeId);
    }
  };

  /**Desactiva el anclaje seleccionado */
  const ofSelectAnchor = () => setSelectedAnchorId(null);

  return { 
    connections, 
    selectedAnchorId, 
    pendingAnchorId, 
    allAnchors,
    handleSelectAnchor, 
    ofSelectAnchor
  };
};

export default useConnections;