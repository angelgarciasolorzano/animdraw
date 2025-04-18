import Lienzo from '../components/ShapeCanvas';
import { useDrawing } from '../hooks/useDrawing'

function Dibujo2D() {
  const { 
    canvasRef, startDrawing, draw, stopDrawing, setShape, setColor, color, 
    shape, setSides, sides 
  } = useDrawing();

  return (
    <div className=''>
      <canvas
        ref={canvasRef}
        width={500}
        height={500}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        style={{
          border: "1px solid black",
        }}
      />
      <div className='flex gap-4 mt-4'>
        <button className="border rounded-md p-2" onClick={() => setShape("line")}>Line</button>
        <button className="border rounded-md p-2" onClick={() => setShape("straight-line")}>Línea Recta</button>
        <button className="border rounded-md p-2" onClick={() => setShape("rectangle")}>Rectángulo</button>
        <button className="border rounded-md p-2" onClick={() => setShape("circle")}>Círculo</button>
        <button className="border rounded-md p-2"
          onClick={() => setShape("triangle")}>
          Triangle
        </button>
        <button className="border rounded-md p-2"
          onClick={() => setShape("ellipse")}>
          Ellipse
        </button>
        <button className="border rounded-md p-2"
          onClick={() => setShape("polygon")}>
          Polygon
        </button>

        {shape === "polygon" && (
          <div>
            <label>Number of sides: </label>
            <input 
              type="number" 
              value={sides} 
              onChange={(e) => setSides(Number(e.target.value))} 
              min={3}
            />
          </div>
        )}
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className='border rounded-md p-2'
          />

          <button
            className='border rounded-md p-2'
            onClick={() => {
              const canvas = canvasRef.current;
              if (!canvas) return;
              const ctx = canvas.getContext("2d", { willReadFrequently: true });
              if (!ctx) return;
              ctx.clearRect(0, 0, canvas.width, canvas.height);
            }}
          >
            Limpiar
          </button>
      </div>

      <Lienzo />
    </div>
  )
}

export default Dibujo2D;