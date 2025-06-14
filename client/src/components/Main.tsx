import { Layer, Stage } from "react-konva";
import { useShape, useDiagram, useConnection } from "@/hooks";
import { ConnectionLine, WithAnchors } from "./shape";
import { cn } from "@/lib/utils";
import Grid from "./Grid";

function Main() {
  const { shapes } = useShape();
  const { connections, allAnchors } = useConnection();
  const { deselectAll, containerRef, canvasSize } = useDiagram();

  return (
    <div 
      ref={containerRef} 
      className={cn(
        "flex-1 overflow-auto bg-gray-100 px-28 py-28 scrollbar-thin",
        "scrollbar-track-transparent scrollbar-thumb-black/40",
        "dark:scrollbar-thumb-gray-500/50",
        "dark:bg-background"
      )}
    >
      <div style={{ width: canvasSize.width, height: canvasSize.height }}>
        <Stage
          width={canvasSize.width}
          height={canvasSize.height}
          className={cn("bg-white shadow-md dark:bg-[#161616]/40")}
          onClick={(e) => {
            if (e.target === e.target.getStage()) {
              deselectAll();
            }
          }}
        >
          <Layer>
            <Grid 
              width={canvasSize.width} 
              height={canvasSize.height}
              gridSize={40}
              gridColor="#d1d5db"
              gridColorDark="#ffffff1a"
            />
          </Layer>
          
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
              <WithAnchors
                key={shape.id}
                shape={shape}
              />
            ))}
          </Layer>
        </Stage>
      </div>
    </div>
  );
}

export default Main;