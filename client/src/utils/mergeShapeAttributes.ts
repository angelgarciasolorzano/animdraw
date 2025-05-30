import { ShapeData } from "@/types";

function mergeShapeAttributes(shape: ShapeData, attributes: Partial<ShapeData>): ShapeData {
  const updatedShape: ShapeData = { ...shape };

  (Object.keys(attributes) as Array<keyof ShapeData>).forEach((key) => {
    const currentValue = shape[key];
    const newValue = attributes[key];

    const isObject = (val: unknown) => val !== null && typeof val === "object" && !Array.isArray(val);

    if (isObject(newValue)) {
      if (isObject(currentValue)) {
        (updatedShape as Record<keyof ShapeData, unknown>)[key] = {
          ...(currentValue as Record<string, unknown>),
          ...(newValue as Record<string, unknown>),
        };
      } else {
        (updatedShape as Record<keyof ShapeData, unknown>)[key] = newValue;
      }
    } else {
      (updatedShape as Record<keyof ShapeData, unknown>)[key] = newValue;
    }
  });

  return updatedShape;
};

export default mergeShapeAttributes;