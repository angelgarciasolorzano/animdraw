import { Content, Header } from "@/components";
import { SidebarLeft, SidebarRight } from "@/components/sidebar";
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