import { Main, Header } from "@/components";
import { SidebarLeft, SidebarRight } from "@/components/sidebar";
import { ConnectionProvider, DiagramProvider, ShapesProvider } from "@/context";

function Dashboard() {
  return (
    <DiagramProvider>
      <ShapesProvider>
        <ConnectionProvider>
          <div className="flex flex-col h-screen overflow-hidden">
            <Header />

            <div className="flex flex-1 overflow-hidden min-w-0">
              <SidebarLeft />
              <Main  />
              <SidebarRight />
            </div>
          </div>
        </ConnectionProvider>
      </ShapesProvider>
    </DiagramProvider>
  )
}

export default Dashboard;