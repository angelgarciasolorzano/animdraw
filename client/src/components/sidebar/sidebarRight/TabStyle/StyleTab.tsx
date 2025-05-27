import { useRef, useState } from "react";
import { useClickOutside } from "@react-hooks-library/core";
import { LineOptions, options } from "./item";

import StyleBasePanel from "./StyleBasePanel";
import StyleBorderPanel from "./StyleBorderPanel";
import StyleShadowPanel from "./StyleShadowPanel";

function StyleTab() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<LineOptions>(options[0]);
  const ref = useRef(null);

  useClickOutside(ref, () => setIsOpen(false));

  const handleSelected = (option: LineOptions) => {
    setSelected(option);
    setIsOpen(false);
  };

  return (
    <div className="flex flex-col gap-3 items-center mx-2.5 mt-2.5">
      <StyleBasePanel />
      <StyleBorderPanel 
        isOpen={isOpen} 
        selected={selected} 
        ref={ref} 
        setIsOpen={setIsOpen} 
        handleSelected={handleSelected} 
      />
      <StyleShadowPanel />
    </div>
  )
};

export default StyleTab;