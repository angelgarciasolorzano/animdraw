interface ColorsItems {
  title: string;
  bgColor: string;
  borderColor: string;
  value: string;
};

interface CarouselIetm {
  id: string;
  items: ColorsItems[];
};

export const carouselItems: CarouselIetm[] = [
  {
    id: "carousel-1",
    items: [
      { title: "Rojo", bgColor: "bg-red-500", borderColor: "border-red-700", value: "#ef4444" },
      { title: "Naranja", bgColor: "bg-orange-500", borderColor: "border-orange-700", value: "#f97316" },
      { title: "Amber", bgColor: "bg-amber-500", borderColor: "border-amber-700", value: "#f59e0b" },
      { title: "Amarillo", bgColor: "bg-yellow-500", borderColor: "border-yellow-700", value: "#eab308" },
      { title: "Lima", bgColor: "bg-lime-500", borderColor: "border-lime-700", value: "#84cc16" },
      { title: "Verde", bgColor: "bg-green-500", borderColor: "border-green-700", value: "#22c55e" },
      { title: "Esmeralda", bgColor: "bg-emerald-500", borderColor: "border-emerald-700", value: "#10b981" },
      { title: "Cerceta", bgColor: "bg-teal-500", borderColor: "border-teal-700", value: "#14b8a6" },
    ]
  },
  {
    id: "carousel-2",
    items: [
      { title: "Cian", bgColor: "bg-cyan-500", borderColor: "border-cyan-700", value: "#06b6d4" },
      { title: "Cielo", bgColor: "bg-sky-500", borderColor: "border-sky-700", value: "#0ea5e9" },
      { title: "Azul", bgColor: "bg-blue-500", borderColor: "border-blue-700", value: "#3b82f6" },
      { title: "Añil", bgColor: "bg-indigo-500", borderColor: "border-indigo-700", value: "#6366f1" },
      { title: "Violeta", bgColor: "bg-violet-500", borderColor: "border-violet-700", value: "#8b5cf6" },
      { title: "Morado", bgColor: "bg-purple-500", borderColor: "border-purple-700", value: "#a855f7" },
      { title: "Fucsia", bgColor: "bg-fuchsia-500", borderColor: "border-fuchsia-700", value: "#d946ef" },
      { title: "Rosado", bgColor: "bg-pink-500", borderColor: "border-pink-700", value: "#ec4899" },
    ]
  },
  {
    id: "carousel-3",
    items: [
      { title: "Rosa", bgColor: "bg-rose-500", borderColor: "border-rose-700", value: "#f43f5e" },
      { title: "Gris", bgColor: "bg-gray-500", borderColor: "border-gray-700", value: "#6b7280" },
      { title: "Zinc", bgColor: "bg-zinc-500", borderColor: "border-zinc-700", value: "#71717a" },
      { title: "Neutral", bgColor: "bg-neutral-500", borderColor: "border-neutral-700", value: "#737373" },
      { title: "Stone", bgColor: "bg-stone-500", borderColor: "border-stone-700", value: "#78716c" },
      { title: "Blanco", bgColor: "bg-white", borderColor: "border-black", value: "#ffffff" },
      { title: "Negro", bgColor: "bg-black", borderColor: "border-gray-700", value: "#000000" },
    ]
  }
];

export type LineOptions = Pick<CarouselIetm, "id"> & {
  value: string;
  className: string;
};

export const options: LineOptions[] = [
  { 
    id: "continuous", 
    value: "Continua", 
    className: "w-full h-1 bg-black"
  },
  { 
    id: "dashed", 
    value: "Discontinua",
    className: "w-full h-1 border-2 border-dashed bg-black"
  },
  { 
    id: "dotted", 
    value: "Punteada",
    className: "w-full h-1 border-2 border-dotted bg-black"
  },
];