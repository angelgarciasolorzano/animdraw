import { Layer, Stage } from "react-konva";
import useSelectedShape from "../hooks/useSelectedShape";
import useConnections from "../hooks/useConnections";
import { ShapeData } from "../types/shapeData";
import ConnectionLine from "./ConnectionLine";
import ShapeWithAnchors from "./ShapeWithAnchors";

interface ContentProps {
  shapes: ShapeData[];
  updateShapeAttributes: (shapeId: string, newAttrs: Partial<ShapeData>) => void;
};

function Content({ shapes, updateShapeAttributes }: ContentProps) {
  const { 
    selectedShapeId, 
    onSelectShape, 
  } = useSelectedShape({ shapes });

  const { 
    connections, selectedAnchorId, allAnchors, 
    handleSelectAnchor, ofSelectAnchor, deselectAll
  } = useConnections({ shapes, onSelectShapeId: onSelectShape });

  return (
    <div className='flex-1 bg-gray-100'>
      <Stage 
        width={window.innerWidth - 500} 
        height={window.innerHeight}
        onClick={(e) => { if (e.target === e.target.getStage()) deselectAll(); }}
      >
        <Layer>
          {connections.length > 0 && connections.map(conn => {
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

          {shapes.length > 0 && shapes.map(shape => (
            <ShapeWithAnchors
              key={shape.id}
              shape={shape}
              isSelected={selectedShapeId === shape.id}
              selectedAnchorId={selectedAnchorId}
              onSelectAnchor={handleSelectAnchor}
              onDragEnd={(newAttrs) => updateShapeAttributes(shape.id, newAttrs)}
              onSelectShape={() => {
                onSelectShape(shape.id);
                ofSelectAnchor();
              }}
            />
          ))}
        </Layer>
      </Stage>
    </div>
  )
}

export default Content;