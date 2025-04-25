import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Toggle } from "@/components/ui/toggle";
import { cn } from "@/lib/utils";
import { Bold, Italic, Underline } from "lucide-react";

const sidebarRightOptions = [
  {
    value: "estilo",
    name: "Estilo",
    className: "border-l-transparent data-[state=active]:border-r-transparent"
  },
  {
    value: "texto",
    name: "Texto",
    className: "border-r-transparent data-[state=active]:border-l-transparent"
  }
];

function SidebarRight() {
  return (
    <div className="w-64 bg-white border-l border-gray-300">
      <div className="">
      <Tabs defaultValue="estilo">
        <TabsList className="grid grid-cols-2 w-full rounded-none p-0">
          {sidebarRightOptions.map((option, index) => (
            <TabsTrigger
              key={index}
              value={option.value}
              className={cn(
                "rounded-none h-full border-gray-300",
                "data-[state=active]:shadow-none data-[state=active]:border-b-transparent",
                option.className
              )}
            >
              {option.name}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value="estilo">
          Herramientas para el estilo de la figura
        </TabsContent>
        <TabsContent value="texto">
          <SectionText />
        </TabsContent>
      </Tabs>
      </div>
    </div>
  )
};

function SectionText() {
  return (
    <div className="mx-2.5 flex flex-col gap-4">
      <div className="grid gap-1.5">
        <div>
          <span className="text-sm font-semibold">Fuente</span>
          <Select>
            <SelectTrigger className="w-full mt-1.5 border-gray-300">
              <SelectValue placeholder="Arial" />
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                <SelectLabel>Seleccione una fuente</SelectLabel>
                <SelectItem value="Arial">Arial</SelectItem>
                <SelectItem value="Verdana">Verdana</SelectItem>
                <SelectItem value="Georgia">Georgia</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-3 justify-between">
          <div className="flex gap-1">
            <Toggle aria-label="Texto en negrita">
              <Bold />
            </Toggle>

            <Toggle aria-label="Texto en cursiva">
              <Italic />
            </Toggle>

            <Toggle aria-label="Texto subrayado">
              <Underline />
            </Toggle>
          </div>

          <Input className="w-16 border-gray-300" type="number" defaultValue={10} />
        </div>

        <div className="flex justify-between mt-2 items-center">
          <span className="text-xs font-medium">Color de la fuente</span>

          <Input type="color" className="w-24 h-8 border-gray-300" />
        </div>
      </div>

      <div className="grid gap-1.5">
        <span className="text-xs font-semibold">Contenido</span>
        <Textarea className="resize-none h-24 border-gray-300" />
        <p className="text-xs text-gray-500">Actualizar el contenido de la figura</p>
      </div>
    </div>
  )
};

export default SidebarRight;