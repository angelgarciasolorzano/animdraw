import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

import { 
  Carousel, CarouselContent, CarouselItem, 
  CarouselNext, CarouselPrevious 
} from "@/components/ui/carousel";

import { cn } from "@/lib/utils";
import { carouselItems } from "./item";

function StyleBasePanel() {
  return (
    <div className="grid gap-3 w-full">
      <StylePadding />
      <StyleFill />
      <StyleOpacity />
      <StyleRounded />
    </div>
  )
};

function StylePadding() {
  return (
    <div className="w-full flex justify-center">
      <Carousel className="w-[70%]">
        <CarouselContent>
          {carouselItems.map((carousel) => (
            <CarouselItem key={carousel.id}>
              <div className="grid grid-cols-4 gap-4 place-items-center px-1.5">
                {carousel.items.map((item, index) => (
                  <button 
                    title={item.title}
                    key={`${carousel.id}-${index}`}
                    className={cn(
                      "w-8 h-5 cursor-pointer border",
                      item.bgColor, item.borderColor
                    )}
                  />
                ))}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="w-5 h-5 -left-8 border-gray-300" />
        <CarouselNext className="w-5 h-5 -right-8 border-gray-300" />
      </Carousel>
    </div>
  )
};

function StyleFill() {
  return (
    <div className="w-full flex justify-between mt-2 items-center">
      <label htmlFor="style-fill-color" className="text-xs font-medium">
        Relleno
      </label>

      <Input 
        id="style-fill-color"
        type="color" 
        className="w-24 h-8 border-gray-300"
      />
    </div>
  )
};

function StyleOpacity() {
  return (
    <div className="flex items-center justify-between w-full">
      <label 
        htmlFor="style-opacity"
        className="text-xs font-semibold"
      >
        Opacidad
      </label>

      <Input
        id="style-opacity"
        type="number"
        className="w-16 border-gray-300 h-8"
        step={0.1}
        min={0}
        max={1}
      />
    </div>
  )
};

function StyleRounded() {
  return (
    <div className="w-full">
      <div className="flex items-center space-x-2">
        <Checkbox 
          id="style-rounded"
          className="border-gray-300"
        />

        <label htmlFor="style-rounded" className="text-xs font-semibold">
          Redondeado
        </label>
      </div>
    </div>
  )
};

export default StyleBasePanel;