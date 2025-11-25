import { useMemo, useRef, useEffect, useState } from 'react';
import BarVisualization from './BarVisualization';
import type { SortingFrame } from '../types/sorting';

interface ArrayVisualizerProps {
  array: number[];
  highlightedIndices: number[];
  currentFrame: SortingFrame | null;
}

export default function ArrayVisualizer({
  array,
  highlightedIndices,
  currentFrame,
}: ArrayVisualizerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        setContainerWidth(width);
      }
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);
    
    // Use ResizeObserver for more accurate container width tracking
    const resizeObserver = new ResizeObserver(updateWidth);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      window.removeEventListener('resize', updateWidth);
      resizeObserver.disconnect();
    };
  }, []);

  const maxValue = useMemo(() => {
    return array.length > 0 ? Math.max(...array) : 1;
  }, [array]);

  const isFullySorted = useMemo(() => {
    if (!currentFrame) return false;
    return currentFrame.description === 'Sorting complete!';
  }, [currentFrame]);

  // Determine which bars are sorted (all bars when fully sorted)
  const sortedIndices = useMemo(() => {
    if (isFullySorted) {
      return array.map((_, i) => i);
    }
    return [];
  }, [isFullySorted, array.length]);

  // Calculate dynamic bar width based on container width, gaps, and padding
  const barWidth = useMemo(() => {
    if (array.length === 0 || containerWidth === 0) {
      return undefined;
    }

    // Horizontal padding: px-4 = 16px each side = 32px total
    const horizontalPadding = 32;
    
    // Gap sizes: gap-1 = 4px (mobile < 640px), gap-2 = 8px (desktop >= 640px)
    // Tailwind sm breakpoint is 640px, so use container width to determine gap
    // Note: containerWidth might be slightly less than viewport due to parent constraints
    const gapSize = containerWidth >= 640 ? 8 : 4;
    
    // Total gap space = (number of bars - 1) * gap size
    const totalGapSpace = (array.length - 1) * gapSize;
    
    // Available width for bars = container width - padding - gaps
    const availableWidth = containerWidth - horizontalPadding - totalGapSpace;
    
    // Width per bar
    const calculatedWidth = availableWidth / array.length;
    
    // Set minimum width of 2px to keep bars visible
    const minWidth = 2;
    
    return Math.max(calculatedWidth, minWidth);
  }, [containerWidth, array.length]);

  return (
    <div 
      ref={containerRef}
      className="flex-1 min-h-[500px] w-full flex items-end justify-center gap-1 sm:gap-2 px-4" 
      style={{ paddingBottom: '64px' }}
    >
      {array.map((value, index) => {
        const isHighlighted = highlightedIndices.includes(index);
        const isCompared =
          currentFrame?.comparedIndices?.includes(index) ?? false;
        const isSwapped =
          currentFrame?.swapped &&
          currentFrame?.comparedIndices?.includes(index);
        const isSorted = sortedIndices.includes(index) && !isCompared && !isSwapped;

        return (
          <BarVisualization
            key={`${index}-${value}`}
            value={value}
            maxValue={maxValue}
            isHighlighted={isHighlighted}
            isCompared={isCompared}
            isSwapped={isSwapped}
            isSorted={isSorted}
            barWidth={barWidth}
          />
        );
      })}
    </div>
  );
}

