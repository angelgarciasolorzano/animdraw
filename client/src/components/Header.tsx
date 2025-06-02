import { Moon, Sun } from "lucide-react";

import { Button } from "./ui/button";
import { 
  DropdownMenu, DropdownMenuTrigger, 
  DropdownMenuContent, DropdownMenuItem 
} from "./ui/dropdown-menu";

import { useTheme } from "@/hooks";
import { cn } from "@/lib/utils";

function Header() {
  const { setTheme } = useTheme();

  return (
    <div className={cn(
      "flex justify-between items-center py-2 px-4 border-b border-gray-300",
      "dark:border-border"
    )}>
      <HeaderTitle />
      <HeaderTheme setTheme={setTheme} />
    </div>
  )
};

function HeaderTitle() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-blue-700 dark:text-gray-200">
        AnimDraw
      </h1>
    </div>
  )
};

interface HeaderThemeProps {
  setTheme: (theme: "light" | "dark" | "system") => void;
};

function HeaderTheme({ setTheme }: HeaderThemeProps) {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setTheme("light")}>
            Light
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => setTheme("dark")}>
            Dark
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => setTheme("system")}>
            System
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
};

export default Header;