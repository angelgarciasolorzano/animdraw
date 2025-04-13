import { AiOutlineLine } from "react-icons/ai";
import { IoTriangleOutline, IoEllipseSharp } from "react-icons/io5";
import { MdOutlineCircle, MdOutlineRectangle } from "react-icons/md";
import { BiPolygon, BiPencil } from "react-icons/bi";

function Sidebar() {
  return (
    <aside className="w-64 bg-white flex flex-col border-r border-gray-400">
      <div className="text-center">
        <h1 className="font-bold text-blue-700">AnimDraw</h1>
      </div>

      <div className="flex-1 px-4 py-2">
        <span className="text-sm font-semibold text-gray-600">Herramientas</span>
        <div className="grid grid-cols-4 text-2xl gap-2 py-2 px-2 mb-4">
          <BiPencil className="cursor-pointer" />

          <AiOutlineLine className="cursor-pointer" />

          <MdOutlineRectangle className="cursor-pointer" />

          <MdOutlineCircle className="cursor-pointer" />

          <IoTriangleOutline className="cursor-pointer" />

          <IoEllipseSharp className="cursor-pointer" />

          <BiPolygon className="cursor-pointer" />
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