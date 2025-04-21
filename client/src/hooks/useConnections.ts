import { useCallback, useMemo, useState } from "react";
import { Connection, AnchorPoint, ShapeData } from "../types/shapeData";

interface useConnectionsProps {
  shapes: ShapeData[];
  onSelectShapeId: (shapeId: string | null) => void;
};

const DEFAULT_CONNECTIONS_STYLE = {
  stroke: "#4b5563",
  strokeWidth: 2,
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

  /**Desactiva todas las anclajes y figuras seleccionadas */
  const deselectAll = useCallback(() => {
    setSelectedAnchorId(null);
    setPendingAnchorId(null);
    onSelectShapeId(null);
  }, [onSelectShapeId]);

  /**Verifica si una conexion entre dos anclajes es valida 
   * @param fromId - ID del anclaje de origen
   * @param toId - ID del anclaje de destino
   * @returns Booleano que indica si la conexion es valida
  */
  const isValidConnection = useCallback((fromId: string, toId: string) => {
    if (fromId === toId) return false;

    const fromAnchor = allAnchors[fromId];
    const toAnchor = allAnchors[toId];

    return fromAnchor?.shapeId !== toAnchor?.shapeId;
  }, [allAnchors]);

  /**Maneja la seleccion de un punto de anclaje y crea una conexion si hay uno pendiente 
   * @param anchorId - ID del punto de anclaje seleccionado
  */
  const handleSelectAnchor = useCallback((anchorId: string) => {
    const anchor = allAnchors[anchorId];
    if (!anchor) return;

    /**Si se hace click en el mismo anclaje, deselecciona el anclaje */
    if (selectedAnchorId === anchorId || pendingAnchorId === anchorId) {
      deselectAll();
      return;
    };

    /**Si es un anclaje de la misma figura, se reemplza la seleccion */
    if (pendingAnchorId && allAnchors[pendingAnchorId]?.shapeId === anchor.shapeId) {
      setPendingAnchorId(anchorId);
      setSelectedAnchorId(anchorId);
      return;
    };

    if (pendingAnchorId) {
      if (!isValidConnection(pendingAnchorId, anchorId)) {
        deselectAll();
        return;
      };

      setConnections(prev => [...prev, {
        id: `conn-${pendingAnchorId}-${anchorId}-${Date.now()}`,
        fromAnchor: pendingAnchorId,
        toAnchor: anchorId,
        ...DEFAULT_CONNECTIONS_STYLE
      }]);

      deselectAll();
    } else {
      setPendingAnchorId(anchorId);
      setSelectedAnchorId(anchorId);
      onSelectShapeId(anchor.shapeId);
    };
  }, [
    allAnchors, pendingAnchorId, selectedAnchorId, 
    isValidConnection, onSelectShapeId, deselectAll
  ]);

  /**Desactiva el anclaje seleccionado */
  const ofSelectAnchor = useCallback(() => {
    setSelectedAnchorId(null);
  }, []);

  return useMemo(() => ({
    connections, 
    selectedAnchorId, 
    pendingAnchorId, 
    allAnchors,
    handleSelectAnchor,
    ofSelectAnchor,
    deselectAll
  }), [
    connections, 
    selectedAnchorId, 
    pendingAnchorId, 
    allAnchors,
    handleSelectAnchor, 
    ofSelectAnchor,
    deselectAll
  ]);
};

export default useConnections;