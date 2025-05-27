import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

import { 
  Select, SelectContent, SelectItem, SelectGroup,
  SelectLabel, SelectTrigger, SelectValue 
} from "@/components/select/Select";

import { LineOptions, options } from "./item";

interface StyleBorderPanelProps {
  isOpen: boolean;
  selected: LineOptions;
  ref: React.RefObject<null>;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleSelected: (option: LineOptions) => void;
};

function StyleBorderPanel(props: StyleBorderPanelProps) {
  const { isOpen, selected, ref, setIsOpen, handleSelected } = props;

  return (
    <div className="grid gap-3 w-full mt-2">
      <StyleLineColor />
      <StyleLine 
        isOpen={isOpen} 
        selected={selected} 
        ref={ref} 
        setIsOpen={setIsOpen} 
        handleSelected={handleSelected} 
      />
    </div>
  )
};

function StyleLineColor() {
  return (
    <div className="flex justify-between w-full">
      <div className="flex items-center space-x-2">
        <Checkbox 
          id="style-line"
          className="border-gray-300"
        />

        <label htmlFor="style-line" className="text-xs font-semibold">
          Linea
        </label>
      </div>

      <Input 
        type="color" 
        className="w-24 h-8 border-gray-300"
      />
    </div>
  )
};

type StyleLineProps = StyleBorderPanelProps;

function StyleLine(props: StyleLineProps) {
  const { isOpen, selected, ref, setIsOpen, handleSelected } = props;

  return (
    <div className="flex items-center justify-between gap-3 w-full">
      <div className="w-full" ref={ref}>
        <Select>
          <SelectTrigger isOpen={isOpen} onToggle={() => setIsOpen(!isOpen)}>
            <SelectValue className="flex-1">
              <div className={selected.className} />
            </SelectValue>
          </SelectTrigger>

          <SelectContent isOpen={isOpen}>
            <SelectGroup>
              <SelectLabel>Seleccione una linea</SelectLabel>

              {options.map((item) => (
                <SelectItem
                  key={item.id}
                  value={item.value}
                  selected={item.value === selected.value}
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
      />
    </div>
  )
};

export default StyleBorderPanel;