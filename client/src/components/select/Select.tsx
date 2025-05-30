import React from "react";

import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "motion/react";
import { IoCheckmark } from "react-icons/io5";
import { ChevronDownIcon } from "lucide-react";

type SelectProps = React.ComponentProps<"div"> & {
  disabled?: boolean;
};

function Select({ children, className, disabled, ...props }: SelectProps) {
  return (
    <div 
      className={cn(
        "w-full relative",
        className
      )}
      data-disabled={disabled}
      {...props}
    >
      {children}
    </div>
  )
};

type SelectTriggerProps = React.ComponentProps<"button"> & Pick<SelectProps, "disabled"> & {
  isOpen: boolean;
  onToggle: () => void;
};

function SelectTrigger({ isOpen, onToggle, className, disabled, children, ...props }: SelectTriggerProps) {
  return (
    <button
      className={cn(
        "w-full flex items-center justify-between gap-3 px-3 border rounded-md py-2 cursor-pointer",
        "shadow-xs border-gray-300",
        disabled && "cursor-default pointer-events-none opacity-50",
        className
      )}
      aria-expanded={isOpen}
      onClick={onToggle}
      disabled={disabled}
      {...props}
    >
      {children}
      <ChevronDownIcon className="w-4 h-4 text-gray-500" />
    </button>
  )
};

type SelectValueProps = React.ComponentProps<"div">;

function SelectValue({ children, className, ...props }: SelectValueProps) {
  return (
    <div 
      className={cn(
        "text-sm",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
};

type SelectContentProps = Pick<SelectTriggerProps, "isOpen"> & React.PropsWithChildren & {
  className?: string;
};

function SelectContent({ isOpen, children, className }: SelectContentProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.1 }}
          className={cn(
            "w-full absolute z-10 mt-1 bg-white border rounded-md shadow-md pb-1.5",
            "border-gray-300",
            className
          )}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
};

type SelectGroupProps = React.ComponentProps<"ul">;

function SelectGroup({ children, className, ...props }: SelectGroupProps) {
  return (
    <ul
      className={cn(
        "py-1 px-1", 
        className
      )}
      {...props}
    >
      {children}
    </ul>
  )
};

type SelectLabelProps = React.ComponentProps<"span">;

function SelectLabel({ children, className, ...props }: SelectLabelProps) {
  return (
    <span
      className={cn(
        "block px-3 py-1 pb-1 text-xs text-gray-500", 
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
};

type SelectItemProps = React.ComponentProps<"div"> & {
  value: string;
  selected: boolean;
};

function SelectItem({ value, selected, children, className, ...props }: SelectItemProps) {
  return (
    <div
      className={cn(
        "relative py-2 px-2 pr-9 cursor-pointer rounded-md hover:bg-gray-100 mx-1",
        className
      )}
      data-value={value}
      {...props}
    >
      <div className="flex items-center">
        <div className="flex-1 text-sm" title={value}>
          {children}
        </div>

        {selected && (
          <span className="flex items-center absolute inset-y-0 right-2">
            <IoCheckmark className="w-4 h-4 text-gray-500" />
          </span>
        )}
      </div>
    </div>
  )
};

export {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
};