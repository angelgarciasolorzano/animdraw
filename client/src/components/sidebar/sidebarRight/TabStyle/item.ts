export interface ColorsItems {
  title: string;
  bgColor: string;
  borderColor: string;
  valueBgColor: string;
  valueBorderColor: string;
};

interface CarouselIetm {
  id: string;
  items: ColorsItems[];
};

export const carouselItems: CarouselIetm[] = [
  {
    id: "carousel-1",
    items: [
      { 
        title: "Rojo", bgColor: "bg-red-500", borderColor: "border-red-700", 
        valueBgColor: "#ef4444", valueBorderColor: "#b91c1c" },
      { 
        title: "Naranja", bgColor: "bg-orange-500", borderColor: "border-orange-700", 
        valueBgColor: "#f97316", valueBorderColor: "#c2410c" },
      { 
        title: "Amber", bgColor: "bg-amber-500", borderColor: "border-amber-700", 
        valueBgColor: "#f59e0b", valueBorderColor: "#b45309" },
      { 
        title: "Amarillo", bgColor: "bg-yellow-500", borderColor: "border-yellow-700", 
        valueBgColor: "#eab308", valueBorderColor: "#a16207" },
      { 
        title: "Lima", bgColor: "bg-lime-500", borderColor: "border-lime-700", 
        valueBgColor: "#84cc16", valueBorderColor: "#4d7c0f" },
      { 
        title: "Verde", bgColor: "bg-green-500", borderColor: "border-green-700", 
        valueBgColor: "#22c55e", valueBorderColor: "#15803d" },
      { 
        title: "Esmeralda", bgColor: "bg-emerald-500", borderColor: "border-emerald-700", 
        valueBgColor: "#10b981", valueBorderColor: "#047857" },
      { 
        title: "Cerceta", bgColor: "bg-teal-500", borderColor: "border-teal-700", 
        valueBgColor: "#14b8a6", valueBorderColor: "#0f766e" },
    ]
  },
  {
    id: "carousel-2",
    items: [
      { 
        title: "Cian", bgColor: "bg-cyan-500", borderColor: "border-cyan-700", 
        valueBgColor: "#06b6d4", valueBorderColor: "#0e7490" },
      { 
        title: "Cielo", bgColor: "bg-sky-500", borderColor: "border-sky-700", 
        valueBgColor: "#0ea5e9", valueBorderColor: "#0369a1" },
      { 
        title: "Azul", bgColor: "bg-blue-500", borderColor: "border-blue-700", 
        valueBgColor: "#3b82f6", valueBorderColor: "#1d4ed8" },
      { 
        title: "Añil", bgColor: "bg-indigo-500", borderColor: "border-indigo-700", 
        valueBgColor: "#6366f1", valueBorderColor: "#4338ca" },
      { 
        title: "Violeta", bgColor: "bg-violet-500", borderColor: "border-violet-700", 
        valueBgColor: "#8b5cf6", valueBorderColor: "#6d28d9" },
      { 
        title: "Morado", bgColor: "bg-purple-500", borderColor: "border-purple-700", 
        valueBgColor: "#a855f7", valueBorderColor: "#7e22ce" },
      { 
        title: "Fucsia", bgColor: "bg-fuchsia-500", borderColor: "border-fuchsia-700", 
        valueBgColor: "#d946ef", valueBorderColor: "#a21caf" },
      { 
        title: "Rosado", bgColor: "bg-pink-500", borderColor: "border-pink-700", 
        valueBgColor: "#ec4899", valueBorderColor: "#be185d" 
      },
    ]
  },
  {
    id: "carousel-3",
    items: [
      { 
        title: "Rosa", bgColor: "bg-rose-500", borderColor: "border-rose-700", 
        valueBgColor: "#f43f5e", valueBorderColor: "#be123c" },
      { 
        title: "Gris", bgColor: "bg-gray-500", borderColor: "border-gray-700", 
        valueBgColor: "#6b7280", valueBorderColor: "#374151" },
      { 
        title: "Zinc", bgColor: "bg-zinc-500", borderColor: "border-zinc-700", 
        valueBgColor: "#71717a", valueBorderColor: "#3f3f46" },
      { 
        title: "Neutral", bgColor: "bg-neutral-500", borderColor: "border-neutral-700", 
        valueBgColor: "#737373", valueBorderColor: "#404040" },
      { 
        title: "Stone", bgColor: "bg-stone-500", borderColor: "border-stone-700", 
        valueBgColor: "#78716c", valueBorderColor: "#44403c" },
      { 
        title: "Blanco", bgColor: "bg-white", borderColor: "border-black", 
        valueBgColor: "#ffffff", valueBorderColor: "#000000" },
      { 
        title: "Negro", bgColor: "bg-black", borderColor: "border-gray-700", 
        valueBgColor: "#000000", valueBorderColor: "#1f2937" },
      {
        title: "Pizarra", bgColor: "bg-slate-500", borderColor: "border-slate-700",
        valueBgColor: "#64748b", valueBorderColor: "#334155"
      }
    ]
  }
];

export type LineOptions = Pick<CarouselIetm, "id"> & {
  name: string;
  value: number[];
  className: string;
};

export const options: LineOptions[] = [
  { 
    id: "continuous",
    name: "Continua",
    value: [0, 0], 
    className: "w-full h-1 bg-black"
  },
  { 
    id: "dashed", 
    name: "Discontinua",
    value: [10, 25],
    className: "w-full h-1 border-2 border-dashed bg-black"
  },
  { 
    id: "dotted", 
    name: "Punteada",
    value: [10, 10],
    className: "w-full h-1 border-2 border-dotted bg-black"
  },
];