import Content from "../components/Content";
import Header from "../components/Header";
import SidebarLeft from "../components/sidebar/sidebarleft/SidebarLeft";
import SidebarRight from "../components/sidebar/sidebarRight/SidebarRight";

import { ConnectionProvider, DiagramProvider, ShapesProvider } from "@/context";

function Dashboard() {
  return (
    <DiagramProvider>
      <ShapesProvider>
        <ConnectionProvider>
          <div className="flex flex-col h-screen">
            <Header />

            <div className="flex flex-1 bg-amber-200">
              <SidebarLeft />
              <Content  />
              <SidebarRight />
            </div>
          </div>
        </ConnectionProvider>
      </ShapesProvider>
    </DiagramProvider>
  )
}

export default Dashboard;