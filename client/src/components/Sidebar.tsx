import { AiOutlineLine } from "react-icons/ai";
import { PiRectangleLight, PiCircleLight } from "react-icons/pi";

function Sidebar() {
  return (
    <aside className="w-64 bg-white flex flex-col border-r border-gray-400">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-blue-700">AnimDraw</h1>
      </div>

      <div className="flex-1 px-4 py-2">
        <span className="text-sm font-semibold text-gray-800">Herramientas</span>
        <div className="flex gap-4 p-2 border mb-4 rounded-md h-44 border-gray-400">
          <AiOutlineLine className="text-2xl cursor-pointer" />

          <PiRectangleLight className="text-2xl cursor-pointer" />

          <PiCircleLight className="text-2xl cursor-pointer" />
        </div>

        <span className="text-sm font-semibold text-gray-800">Graficos 3D</span>
        <div className="flex gap-4 p-2 border rounded-md h-44 border-gray-400">
        </div>
      </div>

      <div className="px-4 py-2">
        <span className="text-sm font-semibold text-gray-800">Configuración</span>
      </div>
    </aside>
  )
}

export default Sidebar;