import { Line } from 'react-konva';
import { useTheme } from '@/hooks';

interface GridProps {
  width: number;
  height: number;
  gridSize?: number;
  gridColor?: string;
  gridColorDark?: string;
};

function Grid(props: GridProps) {
  const { width, height, gridSize = 10, gridColor = "#e0e0e0", gridColorDark } = props;
  const { theme } = useTheme();

  const gridLines = [];
  const isDark = theme === "dark";
  const strokeColor = isDark ? gridColorDark : gridColor;

  for (let i = 0; i <= width; i += gridSize) {
    gridLines.push(
      <Line
        key={`grid-line-vertical-${i}`}
        points={[i, 0, i, height]}
        stroke={strokeColor}
        strokeWidth={0.5}
      />
    )
  };

  for (let i = 0; i <= height; i += gridSize) {
    gridLines.push(
      <Line
        key={`grid-line-horizontal-${i}`}
        points={[0, i, width, i]}
        stroke={strokeColor}
        strokeWidth={0.5}
      />
    )
  };

  return <>{gridLines}</>;
}

export default Grid;