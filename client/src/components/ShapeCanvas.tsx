import { useState, useMemo, useEffect } from "react";
import { Stage, Layer } from "react-konva";
import ShapeWithAnchors from "./ShapeWithAnchors";
import ConnectionLine from "./ConnectionLine";
import { ShapeData, Connection, AnchorPoint } from "../types/shapeData";

const createAnchors = (shapeId: string, x: number, y: number, width: number, height: number): AnchorPoint[] => [
  { id: `${shapeId}-top`, x: x + width / 2, y: y, shapeId },
  { id: `${shapeId}-right`, x: x + width, y: y + height / 2, shapeId },
  { id: `${shapeId}-bottom`, x: x + width / 2, y: y + height, shapeId },
  { id: `${shapeId}-left`, x: x, y: y + height / 2, shapeId },
];

const INITIAL_SHAPES: ShapeData[] = [
  {
    id: "rect1",
    type: "rect",
    x: 100,
    y: 100,
    width: 150,
    height: 100,
    fill: "#e5e7eb",
    stroke: "#6b7280",
    strokeWidth: 2,
    text: "Figura 1",
    anchors: createAnchors("rect1", 100, 100, 150, 100),
  },
  {
    id: "rect2",
    type: "rect",
    x: 300,
    y: 200,
    width: 150,
    height: 100,
    fill: "#fecaca",
    stroke: "#6b7280",
    strokeWidth: 2,
    text: "Figura 2",
    anchors: createAnchors("rect2", 300, 200, 150, 100),
  },
];

export const ShapesCanvas = () => {
  const [shapes, setShapes] = useState<ShapeData[]>(INITIAL_SHAPES);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [selectedShapeId, setSelectedShapeId] = useState<string | null>(null);
  const [selectedAnchorId, setSelectedAnchorId] = useState<string | null>(null);
  const [pendingAnchorId, setPendingAnchorId] = useState<string | null>(null);
  const [shapeTextInput, setShapeTextInput] = useState<string | null>(null);

  console.log(selectedAnchorId);

  // Mapa de anclajes para fácil acceso por ID
  const allAnchors = useMemo(() => {
    const anchors: Record<string, AnchorPoint> = {};
    shapes.forEach(shape => {
      shape.anchors.forEach(anchor => {
        anchors[anchor.id] = anchor;
      });
    });
    return anchors;
  }, [shapes]);

  // Sincroniza el texto al seleccionar una figura
  useEffect(() => {
    if (selectedShapeId) {
      const shape = shapes.find(s => s.id === selectedShapeId);
      setShapeTextInput(shape?.text || "");
    }
  }, [selectedShapeId, shapes]);

  //* Maneja la selección de anclajes y creación de conexiones
  const handleSelectAnchor = (anchorId: string) => {
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
      setSelectedShapeId(null);
    } else {
      setSelectedShapeId(anchor.shapeId);
      setPendingAnchorId(anchorId);
      setSelectedAnchorId(anchorId);
    }
  };
  
  // Aplica el texto editado a la figura seleccionada
  const updateShapeText = () => {
    if (!selectedShapeId || shapeTextInput === null) return;
    
    setShapes(prev =>
      prev.map(shape =>
        shape.id === selectedShapeId ? { ...shape, text: shapeTextInput } : shape
      )
    );
  };

  // Actualiza la posición y tamaño de una figura
  const handleShapeDrag = (shapeId: string, newAttrs: Partial<ShapeData>) => {
    setShapes(prev => prev.map(shape => 
      shape.id === shapeId ? { ...shape, ...newAttrs } : shape
    ));
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Barra lateral */}
      <div className="w-64 bg-white p-4 border-r border-gray-200 shadow-sm">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">Propiedades</h2>
        
        {selectedShapeId ? (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Texto de la figura
              </label>
              <textarea
                className="w-full p-2 border border-gray-300 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                value={shapeTextInput ?? ""}
                onChange={(e) => {
                  setShapeTextInput(e.target.value);
                }}
                rows={4}
                autoFocus
              />
            </div>
            <div className="flex space-x-2">
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                onClick={updateShapeText}
              >
                Aplicar
              </button>
              <button
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition-colors"
                onClick={() => {
                  setSelectedShapeId(null);
                  setSelectedAnchorId(null);
                }}
              >
                Cancelar
              </button>
            </div>
          </>
        ) : (
          <div className="p-4 bg-gray-100 rounded text-gray-500">
            Selecciona una figura para editar
          </div>
        )}
      </div>

      {/* Área de dibujo */}
      <div className="flex-1 relative overflow-hidden">
        <Stage
          width={window.innerWidth - 256}
          height={window.innerHeight}
          onClick={(e) => {
            if (e.target === e.target.getStage()) {
              setSelectedShapeId(null);
              setSelectedAnchorId(null);
            }
          }}
        >
          <Layer>
            {/* Conexiones entre anclajes */}
            {connections.map(conn => {
              const fromAnchor = allAnchors[conn.fromAnchor];
              const toAnchor = allAnchors[conn.toAnchor];
              if (!fromAnchor || !toAnchor) return null;
              
              return (
                <ConnectionLine
                  key={conn.id}
                  startAnchor={fromAnchor}
                  endAnchor={toAnchor}
                  strokeColor={conn.stroke}
                  lineWidth={conn.strokeWidth}
                />
              );
            })}

            {/* Figuras con anclajes */}
            {shapes.map(shape => (
              <ShapeWithAnchors
                key={shape.id}
                shape={shape}
                isSelected={selectedShapeId === shape.id}
                selectedAnchorId={selectedAnchorId}
                onSelectAnchor={handleSelectAnchor}
                onDragEnd={(newAttrs) => handleShapeDrag(shape.id, newAttrs)}
                onSelectShape={() => {
                  setSelectedShapeId(shape.id);
                  setSelectedAnchorId(null);
                }}
              />
            ))}
          </Layer>
        </Stage>
      </div>
    </div>
  );
};

export default ShapesCanvas;