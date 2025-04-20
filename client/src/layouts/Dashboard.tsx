//import Sidebar from "../components/Sidebar";
//import Dibujo2D from "../pages/Dibujo2D";
import Content from "../components/Content";
import Header from "../components/Header";
import SidebarLeft from "../components/sidebar/sidebarleft/SidebarLeft";
import SidebarRight from "../components/sidebar/sidebarRight/SidebarRight";

function Dashboard() {
  return (
    <div className="flex flex-col h-screen">
      <Header />

      <div className="flex flex-1 bg-amber-200">
        <SidebarLeft />
        <Content />
        <SidebarRight />
      </div>
    </div>
  )
}

export default Dashboard;