import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

import { 
  Select, SelectContent, SelectItem, SelectGroup,
  SelectLabel, SelectTrigger, SelectValue 
} from "@/components/select";

import { LineOptions, options } from "./item";
import { ShapeData } from "@/types";

interface StyleBorderPanelProps {
  isOpen: boolean;
  ref: React.RefObject<null>;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  shape: ShapeData | null | undefined;
  handleNestedPropertyChange: <
    T extends keyof Pick<ShapeData, "line">,
    k extends keyof NonNullable<ShapeData[T]>
  >(
    property: T, 
    key: k, 
    value: NonNullable<ShapeData[T]>[k]
  ) => void;
};

function StyleBorderPanel(props: StyleBorderPanelProps) {
  const { isOpen, ref, shape, setIsOpen, handleNestedPropertyChange } = props;
  const lineIsActive = shape?.line?.isActive === false;

  const handleSelected = (option: LineOptions): void => {
    handleNestedPropertyChange("line", "dash", option.value);
    setIsOpen(false);
  };

  return (
    <div className="grid gap-3 w-full mt-2">
      <StyleLineColor 
        shape={shape}
        lineIsActive={lineIsActive}
        handleNestedPropertyChange={handleNestedPropertyChange} 
      />

      <StyleLine 
        isOpen={isOpen}
        lineIsActive={lineIsActive}
        ref={ref} 
        setIsOpen={setIsOpen} 
        handleSelected={handleSelected}
        shape={shape}
        handleNestedPropertyChange={handleNestedPropertyChange}
      />
    </div>
  )
};

type StyleLineColorProps = Pick<StyleBorderPanelProps, "shape" | "handleNestedPropertyChange"> & {
  lineIsActive: boolean;
};

function StyleLineColor({ shape, lineIsActive, handleNestedPropertyChange }: StyleLineColorProps) {
  return (
    <div className="flex justify-between w-full">
      <div className="flex items-center space-x-2">
        <Checkbox 
          id="style-line"
          className="border-gray-300"
          checked={shape?.line?.isActive ?? true}
          onCheckedChange={(checked) => handleNestedPropertyChange("line", "isActive", !!checked)}
        />

        <label htmlFor="style-line" className="text-xs font-semibold">
          Linea
        </label>
      </div>

      <Input 
        type="color" 
        className="w-24 h-8 border-gray-300"
        value={shape?.line?.stroke || "#000000"}
        disabled={lineIsActive}
        onChange={(e) => handleNestedPropertyChange("line", "stroke", e.target.value)}
      />
    </div>
  )
};

type StyleLineProps = StyleBorderPanelProps & Pick<StyleLineColorProps, "lineIsActive"> & {
  handleSelected: (option: LineOptions) => void;
};

function StyleLine(props: StyleLineProps) {
  const { 
    isOpen, ref, shape, lineIsActive, 
    setIsOpen, handleSelected, handleNestedPropertyChange 
  } = props;

  const selectedOption = options.find(option => option.value === shape?.line?.dash) ?? options[0];
 
  return (
    <div className="flex items-center justify-between gap-3 w-full">
      <div className="w-full" ref={ref}>
        <Select disabled={lineIsActive}>
          <SelectTrigger 
            disabled={lineIsActive} 
            isOpen={isOpen} 
            onToggle={() => setIsOpen(!isOpen)}
          >
            <SelectValue className="flex-1">
              <div className={selectedOption.className} />
            </SelectValue>
          </SelectTrigger>

          <SelectContent isOpen={isOpen}>
            <SelectGroup>
              <SelectLabel>Seleccione una linea</SelectLabel>

              {options.map((item) => (
                <SelectItem
                  key={item.id}
                  value={item.name}
                  selected={item.value === selectedOption.value}
                  onClick={() => handleSelected(item)}
                >
                  <div className={item.className} />
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <Input
        type="number"
        className="w-22 border-gray-300 h-8.5"
        min={1}
        value={shape?.line?.strokeWidth || 1}
        disabled={lineIsActive}
        onChange={(e) => handleNestedPropertyChange("line", "strokeWidth", parseInt(e.target.value))}
      />
    </div>
  )
};

export default StyleBorderPanel;