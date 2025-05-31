import { Dashboard } from "@/layouts";
import { ThemeProvider } from "./context";

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <Dashboard />
    </ThemeProvider>
  )
}

export default App;