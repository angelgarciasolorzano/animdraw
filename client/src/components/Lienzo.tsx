import { useState, useEffect } from "react";
import { Stage, Layer } from "react-konva";
import { ShapeWithText } from "./ShapeWithText";
import ShapeData from "../types/shapeData";

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
    text: "Haz clic para editar",
  },
  {
    id: "ellipse1",
    type: "ellipse",
    x: 300,
    y: 200,
    width: 150,
    height: 100,
    fill: "#fecaca",
    stroke: "#6b7280",
    strokeWidth: 2,
    text: "Texto en elipse",
  },
];

const ShapesCanvas = () => {
  const [shapes, setShapes] = useState<ShapeData[]>(INITIAL_SHAPES);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [textInput, setTextInput] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  // Actualizar el texto de la figura seleccionada
  const updateShapeText = () => {
    if (!selectedId) return;
    
    setShapes(prev =>
      prev.map(shape =>
        shape.id === selectedId ? { ...shape, text: textInput } : shape
      )
    );
    setIsEditing(false);
  };

  // Manejar selección de figura
  const handleSelectShape = (id: string) => {
    setSelectedId(id);
    const shape = shapes.find(s => s.id === id);
    setTextInput(shape?.text || "");
    setIsEditing(true);
  };

  // Resetear selección al hacer clic en el área vacía
  const handleStageClick = (e: any) => {
    if (e.target === e.target.getStage()) {
      setSelectedId(null);
      setIsEditing(false);
    }
  };

  // Efecto para actualizar el texto cuando cambia la selección
  useEffect(() => {
    if (selectedId) {
      const shape = shapes.find(s => s.id === selectedId);
      setTextInput(shape?.text || "");
    }
  }, [selectedId, shapes]);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Barra lateral de edición */}
      <div className="w-64 bg-white p-4 border-r border-gray-200 shadow-sm">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">Propiedades</h2>
        
        {selectedId ? (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Texto de la figura
              </label>
              <textarea
                className="w-full p-2 border border-gray-300 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
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
                  setSelectedId(null);
                  setIsEditing(false);
                }}
              >
                Cancelar
              </button>
            </div>
          </>
        ) : (
          <div className="p-4 bg-gray-100 rounded text-gray-500">
            Selecciona una figura para editar su texto
          </div>
        )}
      </div>

      {/* Área de dibujo */}
      <div className="flex-1 relative overflow-hidden">
        <Stage
          width={window.innerWidth - 256} // Restamos el ancho de la barra lateral
          height={window.innerHeight}
          onClick={handleStageClick}
          className="bg-white"
        >
          <Layer>
            {shapes.map((shape) => (
              <ShapeWithText
                key={shape.id}
                shape={shape}
                isSelected={selectedId === shape.id}
                onClick={() => handleSelectShape(shape.id)}
              />
            ))}
          </Layer>
        </Stage>
      </div>
    </div>
  );
};

export default ShapesCanvas;