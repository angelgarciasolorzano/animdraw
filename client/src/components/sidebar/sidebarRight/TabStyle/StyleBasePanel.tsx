import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

import { 
  Carousel, CarouselContent, CarouselItem, 
  CarouselNext, CarouselPrevious 
} from "@/components/ui/carousel";

import { cn } from "@/lib/utils";
import { ShapeData } from "@/types";
import { carouselItems, ColorsItems } from "./item";

interface StyleBasePanelProps {
  shape: ShapeData | null | undefined;
  handleSimplePropertyChange: <T extends keyof Omit<ShapeData, 'shadow' | 'textStyle'>>(
    property: T,
    value: ShapeData[T]
  ) => void;
  handleNestedPropertyChange: <
    T extends keyof Pick<ShapeData, "line">,
    k extends keyof NonNullable<ShapeData[T]>
  >(
    property: T, 
    key: k, 
    value: NonNullable<ShapeData[T]>[k]
  ) => void;
};

function StyleBasePanel(props: StyleBasePanelProps) {
  const { shape, handleSimplePropertyChange, handleNestedPropertyChange } = props;

  const updatePadding = (value: ColorsItems) => {
    handleSimplePropertyChange("fill", value.valueBgColor);
    handleNestedPropertyChange("line", "stroke", value.valueBorderColor);
  };

  return (
    <div className="grid gap-3 w-full">
      <StylePadding updatePadding={updatePadding}/>
      <StyleFill shape={shape} handleSimplePropertyChange={handleSimplePropertyChange} />
      <StyleOpacity shape={shape} handleSimplePropertyChange={handleSimplePropertyChange} />
      <StyleRounded shape={shape} handleSimplePropertyChange={handleSimplePropertyChange} />
    </div>
  )
};

interface StylePaddingProps {
  updatePadding: (value: ColorsItems) => void;
};

function StylePadding({ updatePadding }: StylePaddingProps) {
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
                    onClick={() => updatePadding(item)}
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

        <CarouselPrevious className="w-5 h-5 -left-8" />
        <CarouselNext className="w-5 h-5 -right-8" />
      </Carousel>
    </div>
  )
};

type StyleFillProps = Omit<StyleBasePanelProps, "handleNestedPropertyChange">;

function StyleFill({ shape, handleSimplePropertyChange }: StyleFillProps) {
  return (
    <div className="w-full flex justify-between mt-2 items-center">
      <label htmlFor="style-fill-color" className="text-xs font-medium dark:text-gray-200">
        Relleno
      </label>

      <Input 
        id="style-fill-color"
        type="color" 
        className="w-24 h-8"
        value={shape?.fill || "#000000"}
        onChange={(e) => handleSimplePropertyChange("fill", e.target.value)}
      />
    </div>
  )
};

type StyleOpacityProps = Omit<StyleBasePanelProps, "handleNestedPropertyChange">;

function StyleOpacity({ shape, handleSimplePropertyChange }: StyleOpacityProps) {
  return (
    <div className="flex items-center justify-between w-full">
      <label 
        htmlFor="style-opacity"
        className="text-xs font-semibold dark:text-gray-200"
      >
        Opacidad
      </label>

      <Input
        id="style-opacity"
        type="number"
        className="w-16 h-8"
        step={0.1}
        min={0}
        max={1}
        value={shape?.opacity ?? 1}
        onChange={(e) => handleSimplePropertyChange("opacity", parseFloat(e.target.value))}
      />
    </div>
  )
};

type StyleRoundedProps = Omit<StyleBasePanelProps, "handleNestedPropertyChange">;

function StyleRounded({ shape, handleSimplePropertyChange }: StyleRoundedProps) {
  if (shape?.type !== "rect") return null;

  return (
    <div className="w-full">
      <div className="flex items-center space-x-2">
        <Checkbox 
          id="style-rounded"
          checked={shape?.radius || false}
          onCheckedChange={(checked) => handleSimplePropertyChange("radius", !!checked)}
        />

        <label htmlFor="style-rounded" className="text-xs font-semibold dark:text-gray-200">
          Redondeado
        </label>
      </div>
    </div>
  )
};

export default StyleBasePanel;