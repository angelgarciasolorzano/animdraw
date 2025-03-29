import Sidebar from "../components/Sidebar";
import Dibujo2D from "../pages/Dibujo2D";

function Dashboard() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 bg-white flex justify-center items-center">
        <Dibujo2D />
      </div>
    </div>
  )
}

export default Dashboard;