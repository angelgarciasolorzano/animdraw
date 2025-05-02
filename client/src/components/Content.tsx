import { Layer, Stage } from "react-konva";
import { useShape, useDiagram, useConnection } from "@/hooks";
import { ConnectionLine, ShapeWithAnchors } from "./Shape";

function Content() {
  const { shapes } = useShape();
  const { connections, allAnchors } = useConnection();
  const { deselectAll } = useDiagram();

  return (
    <div className='flex-1 bg-gray-100'>
      <Stage
        width={window.innerWidth - 500}
        height={window.innerHeight}
        onClick={(e) => {
          if (e.target === e.target.getStage()) {
            deselectAll();
          }
        }}
      >
        <Layer>
          {/* Renderizar todas las conexiones primero (debajo de las figuras) */}
          {connections.map(conn => {
            const from = allAnchors[conn.fromAnchor];
            const to = allAnchors[conn.toAnchor];
            if (!from || !to) return null;
            
            return (
              <ConnectionLine
                key={conn.id}
                startAnchor={from}
                endAnchor={to}
                strokeColor={conn.stroke}
                lineWidth={conn.strokeWidth}
              />
            );
          })}

          {/* Renderizar todas las figuras */}
          {shapes.map(shape => (
            <ShapeWithAnchors
              key={shape.id}
              shape={shape}
            />
          ))}
        </Layer>
      </Stage>
    </div>
  );
}

export default Content;