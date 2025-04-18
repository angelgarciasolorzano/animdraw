import React from "react";
import { Group, Rect, Ellipse, Text, Transformer } from "react-konva";
import { ShapeData } from "../types/shapeData";

interface ShapeWithConnectorProps {
  shape: ShapeData;
  isSelected: boolean;
  onSelect: () => void;
  onChange: (newAttrs: ShapeData) => void;
}

export const ShapeWithConnector: React.FC<ShapeWithConnectorProps> = ({
  shape,
  isSelected,
  onSelect,
  onChange,
}) => {
  const shapeRef = React.useRef<any>();
  const trRef = React.useRef<any>();

  React.useEffect(() => {
    if (isSelected && trRef.current) {
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  const commonProps = {
    ...shape,
    ref: shapeRef,
    draggable: true,
    onClick: onSelect,
    onTap: onSelect,
    onDragEnd: (e: any) => {
      onChange({
        ...shape,
        x: e.target.x(),
        y: e.target.y(),
      });
    },
    onTransformEnd: () => {
      const node = shapeRef.current;
      const scaleX = node.scaleX();
      const scaleY = node.scaleY();

      node.scaleX(1);
      node.scaleY(1);
      onChange({
        ...shape,
        x: node.x(),
        y: node.y(),
        width: Math.max(5, node.width() * scaleX),
        height: Math.max(5, node.height() * scaleY),
      });
    },
  };

  return (
    <>
      <Group>
        {shape.type === "rect" && <Rect {...commonProps} />}
        {shape.type === "ellipse" && (
          <Ellipse
            {...commonProps}
            radiusX={shape.width / 2}
            radiusY={shape.height / 2}
            x={shape.x + shape.width / 2}
            y={shape.y + shape.height / 2}
          />
        )}
        <Text
          x={shape.x + 8}
          y={shape.y + shape.height / 2 - 10}
          width={shape.width}
          text={shape.text}
          fontSize={16}
          align="center"
        />
      </Group>
      {isSelected && (
        <Transformer
          ref={trRef}
          anchorSize={8}
          borderStroke="#3b82f6"
          borderStrokeWidth={2}
          anchorStroke="#3b82f6"
          anchorCornerRadius={3}
        />
      )}
    </>
  );
};