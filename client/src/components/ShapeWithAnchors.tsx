import { Group, Rect, Ellipse, Text } from "react-konva";
import { AnchorPoint as AnchorPointType, ShapeData } from "../types/shapeData";
import useShapeInteraction from "../hooks/useShapeInteraction";
import React, { useMemo } from "react";
import AnchorPoint from "./AnchorPoint";

interface ShapeWithAnchorsProps {
  shape: ShapeData;
  isSelected: boolean;
  selectedAnchorId: string | null;
  onSelectShape: () => void;
  onSelectAnchor: (anchorId: string) => void;
  onDragEnd: (newAttrs: Partial<ShapeData>) => void;
};

function ShapeWithAnchors(props: ShapeWithAnchorsProps) {
  const { 
    shape, isSelected, selectedAnchorId, 
    onSelectShape, onSelectAnchor, onDragEnd 
  } = props;
  
  const {
    isHovered, shapeGroupRef, 
    updateHovered, handleDragEnd, handleDragMove
  } = useShapeInteraction({ shape, isSelected, onDragEnd });

  const shapeRendererProps = useMemo(() => ({
    shape, isSelected
  }), [shape, isSelected]);

  const anchorPointRendererPorps = useMemo(() => ({
    anchors: shape.anchors,
    shapeX: shape.x,
    shapeY: shape.y,
    selectedAnchorId,
    onSelectAnchor
  }), [shape.anchors, shape.x, shape.y, selectedAnchorId, onSelectAnchor]);

  return (
    <Group>
      <Group
        ref={shapeGroupRef}
        x={shape.x}
        y={shape.y}
        width={shape.width}
        height={shape.height}
        draggable
        onClick={onSelectShape}
        onTap={onSelectShape}
        onDragEnd={handleDragEnd}
        onDragMove={handleDragMove}
        onMouseEnter={() => updateHovered(true)}
        onMouseLeave={() => updateHovered(false)}
      >
        <ShapeRenderer {...shapeRendererProps} />
        <ShapeText shape={shape} />

        {(isSelected || isHovered) && (
          <AnchorPointRenderer {...anchorPointRendererPorps} />
        )}
      </Group>
    </Group>
  )
};

type ShapeRendererProps = Pick<ShapeWithAnchorsProps, "shape" | "isSelected">;

const ShapeRenderer = React.memo(({ shape, isSelected }: ShapeRendererProps) => {
  const commonProps = {
    fill: shape.fill,
    stroke: isSelected ? "#3b82f6" : shape.stroke,
    strokeWidth: isSelected ? 3 : shape.strokeWidth,
  };

  switch (shape.type) {
    case "rect":
      return <Rect {...commonProps} width={shape.width} height={shape.height} />;
    case "ellipse":
      return (
        <Ellipse
          {...commonProps}
          radiusX={shape.width / 2}
          radiusY={shape.height / 2}
          x={shape.width / 2}
          y={shape.height / 2}
        />
      )
    default: return null;
  }
});

type ShapeTextProps = Pick<ShapeWithAnchorsProps, "shape">;

const ShapeText = React.memo(({ shape }: ShapeTextProps) => {
  return (
    <Text 
      x={8}
      y={shape.height / 2 - 10}
      width={shape.width - 16}
      text={shape.text}
      fontSize={16}
      align="center"
      fill="#1f2937"
    />
  )
});

type AnchorPointRendererProps = Pick<ShapeWithAnchorsProps, 
  "selectedAnchorId" | "onSelectAnchor"> & {
  anchors: AnchorPointType[];
  shapeX: number;
  shapeY: number;
};

const AnchorPointRenderer = React.memo((props: AnchorPointRendererProps) => {
  const { anchors, shapeX, shapeY, selectedAnchorId, onSelectAnchor } = props;

  return (
    <>
      {anchors.map((anchor) => {
        return (
          <AnchorPoint
          key={anchor.id}
          isSelected={selectedAnchorId === anchor.id}
          onSelect={() => onSelectAnchor(anchor.id)}
          anchor={{
            ...anchor,
            x: anchor.x - shapeX,
            y: anchor.y - shapeY,
          }}
        />
        )
      })}
    </>
  )
});

const propsAreEquial = (prev: ShapeWithAnchorsProps, next: ShapeWithAnchorsProps): boolean => {
  return (
    prev.shape.id === next.shape.id &&
    prev.isSelected === next.isSelected &&
    prev.selectedAnchorId === next.selectedAnchorId &&
    prev.shape.x === next.shape.x &&
    prev.shape.y === next.shape.y &&
    prev.shape.width === next.shape.width &&
    prev.shape.height === next.shape.height &&
    prev.shape.fill === next.shape.fill &&
    prev.shape.stroke === next.shape.stroke &&
    prev.shape.strokeWidth === next.shape.strokeWidth &&
    prev.shape.text === next.shape.text
  );
};

export default React.memo(ShapeWithAnchors, propsAreEquial);